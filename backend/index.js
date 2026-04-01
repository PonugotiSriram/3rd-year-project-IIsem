import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import { jsonrepair } from 'jsonrepair';

dotenv.config();

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});

const app = express();

app.use((req, res, next) => {
    console.log("GLOBAL HIT:", req.method, req.url);
    next();
});

app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



const analyzeResumeWithAI = async (text, jobDescription = '') => {
    let jobMatchSchema = '';
    let jobMatchInstruction = '';
    
    if (jobDescription) {
        jobMatchSchema = `,
          "jobMatch": {
             "score": 72,
             "missingSkills": ["React", "Node.js"],
             "keywordSuggestions": ["Frontend Architecture"],
             "fitSummary": "Short explanation of how resume matches or lacks fit to the job."
          }`;
        jobMatchInstruction = `
        A Target Job Description has been provided below! You MUST analyze the resume against the job description and return the precise match insights populated directly into the "jobMatch" JSON object.
        Target Job Description:
        """${jobDescription}"""
        `;
    }

    const prompt = `
        Analyze the following resume text and provide a highly structured JSON response.
        Your output MUST be ONLY a valid JSON object matching exactly this schema:
        {
          "atsScore": 45${jobMatchSchema},
          "issues": ["list", "of", "general", "strings"],
          "suggestions": ["list", "of", "strings"],
          "skillsFound": ["skill1"],
          "missingSkills": ["desired_skill"],
          "corrections": {
            "spelling": [ { "wrong": "exact typo found in text", "correct": "correction" } ],
            "contact": [ { "missingField": "e.g., LinkedIn", "suggestion": "e.g., Add linkedin.com/in/username" } ],
            "content": [ { "before": "exact weak phrase from text", "after": "enhanced phrase with metrics", "reason": "why this is better" } ],
            "summary": [ { "before": "current generic summary", "after": "tailored summary", "reason": "why" } ],
            "skills": [ { "current": "academic or generic term", "optimized": "industry standard term" } ]
          },
          "learningRoadmap": [ { "skill": "Missing or weak skill name", "resources": ["Resource 1 to learn", "Resource 2", "Resource 3"] } ],
          "interviewQuestions": {
            "behavioral": ["Question 1 based on resume", "Question 2", "Question 3", "Question 4", "Question 5"],
            "technical": ["Question 1 based on tech stack in resume", "Question 2", "Question 3", "Question 4", "Question 5"]
          }
        }

        ${jobMatchInstruction}
        Ensure the feedback is strictly tailored to the specific text provided. You must analyze the entire resume thoroughly and generate improvements for ALL possible lines. 
        You must provide a comprehensive list of suggestions inside the "content" array, targeting up to 10 of the most critical improvements across the resume. Each improvement must target a different sentence or bullet point.
        For "spelling", strictly return actual typos if present, otherwise an empty array.
        If a section like 'summary' does not exist, use "before": "(None)" and write an impressive missing summary.
        For learningRoadmap, provide concrete specific resource names (e.g. "FreeCodeCamp Node.js Crash Course") for 2 or 3 missing skills if there is a job description.
        For interviewQuestions, predict exactly 5 behavioral and 5 technical questions the user is exceedingly likely to face based on their specific listed projects and skills.
        
        CRITICAL INSTRUCTIONS FOR JSON VALIDITY:
        1. DO NOT include literal newlines in strings. Replace them with spaces or escaped \\n.
        2. DO NOT output any text outside the JSON object.
        3. DO NOT include trailing commas.

        Resume Text:
        """${text}"""
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                maxOutputTokens: 8192,
            }
        });

        let jsonStr = response.text;
        try {
            if (jsonStr) {
                // Remove markdown blocks if still present
                jsonStr = jsonStr.replace(/```json/gi, '').replace(/```/g, '').trim();
                
                // Extract only the JSON object
                const firstBrace = jsonStr.indexOf('{');
                const lastBrace = jsonStr.lastIndexOf('}');
                
                if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
                    jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
                }
                
                // Repair the JSON structure using jsonrepair
                jsonStr = jsonrepair(jsonStr);
            }
            return JSON.parse(jsonStr);
        } catch (parseError) {
            console.error("RAW JSON OUTPUT FROM AI:", response.text);
            fs.writeFileSync('bad_json.txt', response.text);
            throw new Error(`AI returned invalid JSON structure: ${parseError.message}`);
        }
    } catch (error) {
        console.error("AI Analysis Error:", error);
        throw new Error(error.message || "Failed to analyze resume with AI.");
    }
};

app.get('/', (req, res) => {
    res.send("Backend is working");
});

app.post('/api/analyze', async (req, res) => {
    try {
        console.log("API HIT");

        await new Promise((resolve, reject) => {
            upload.single('resume')(req, res, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        if (!req.file && !req.body.text) {
            return res.status(400).json({ success: false, error: 'File or text not received' });
        }

        let text = '';

        if (req.file) {
            console.log("File received");
            const dataBuffer = req.file.buffer;

            console.log("Before PDF parse");
            try {
                const parsed = await pdfParse(dataBuffer);
                text = parsed.text ? parsed.text.trim() : '';
            } catch (pdfError) {
                console.error(pdfError);
                return res.status(400).json({ success: false, error: "PDF parsing failed" });
            }
            console.log("PDF parsed");
        } else {
            console.log("Raw text received for re-analysis");
            text = req.body.text.trim();
        }

        if (!text || text.length < 50) {
            return res.status(400).json({ success: false, error: 'Extracted text is too short or empty. Please ensure the PDF contains readable text.' });
        }
        console.log("Resume length", text.length);

        // Basic Heuristic Analysis
        const basics = {
            length: text.length,
            hasEmail: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text),
            hasLink: /https?:\/\/[^\s]+/.test(text) || /linkedin\.com/.test(text) || /github\.com/.test(text)
        };

        const jobDescription = req.body.jobDescription ? req.body.jobDescription.trim() : '';

        console.log("Before AI call");
        let aiAnalysis;
        try {
            aiAnalysis = await analyzeResumeWithAI(text, jobDescription);
        } catch (aiError) {
            console.error(aiError);
            return res.status(500).json({ success: false, error: aiError.message || "AI Analysis failed" });
        }
        console.log("AI response received");

        // Count spelling/grammar errors dynamically
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordCounts = {};
        let repetitiveIssues = 0;
        words.forEach(w => {
            if (w.length > 4) {
                wordCounts[w] = (wordCounts[w] || 0) + 1;
                if (wordCounts[w] > 10) repetitiveIssues++;
            }
        });

        if (repetitiveIssues > 5) {
            aiAnalysis.issues.push("High level of repetitive vocabulary detected.");
        }

        const responsePayload = {
            extractedText: text,
            analysis: aiAnalysis,
            basics
        };

        return res.json({
            success: true,
            extractedText: text,
            analysis: aiAnalysis,
            data: responsePayload
        });

    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});

app.post('/api/boost-impact', async (req, res) => {
    try {
        const { sentence, metric } = req.body;
        if (!sentence) return res.status(400).json({ error: "Missing sentence" });

        let prompt = "";
        if (!metric) {
            prompt = `The user wants to improve this boring resume sentence by adding a metric/number: "${sentence}". Ask a single, direct question to extract a specific numerical metric (e.g. "How many users?", "What percentage faster?", "How large was the team?"). Keep the question under 15 words. ONLY RETURN THE QUESTION. NO INTROS.`;
        } else {
            prompt = `Rewrite this resume sentence to seamlessly include this metric/result: "${metric}". Sentence: "${sentence}". Make it sound highly professional, action-oriented, and ATS-friendly. ONLY RETURN THE REWRITTEN SENTENCE. NO INTROS.`;
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { maxOutputTokens: 256 }
        });

        return res.json({ result: response.text.trim() });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Failed to boost impact." });
    }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
