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

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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
        const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type! Only PDF, TXT, and Images are allowed.'), false);
        }
    }
});

import mongoose from 'mongoose';

// Connect to MongoDB
let isDBConnected = false;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resume_analyzer";

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 }).then(() => {
    console.log("Connected to MongoDB successfully!");
    isDBConnected = true;
}).catch(err => {
    console.warn("⚠️ MongoDB not running locally! Falling back to local JSON file database mode.");
    isDBConnected = false;
    if (!fs.existsSync('local_db.json')) fs.writeFileSync('local_db.json', JSON.stringify({ users: [] }));
});

// JSON DB Fallback Functions
const getDB = () => JSON.parse(fs.readFileSync('local_db.json'));
const saveDB = (data) => fs.writeFileSync('local_db.json', JSON.stringify(data, null, 2));

// User Schema (Only used if MongoDB connects)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    profile: {
        name: { type: String, default: '' },
        altEmail: { type: String, default: '' },
        mobile: { type: String, default: '' },
        gender: { type: String, default: '' },
        designation: { type: String, default: '' },
        basicDetails: { type: String, default: '' }
    },
    resumeHistory: { type: Array, default: [] }
});
const User = mongoose.model('User', userSchema);

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
        
        if (isDBConnected) {
            const exists = await User.findOne({ email });
            if (exists) return res.status(400).json({ error: "Email already registered." });
            
            const user = new User({ email, password, profile: {} });
            await user.save();
            return res.json({ success: true, email: user.email, profile: user.profile });
        } else {
            const db = getDB();
            if (db.users.find(u => u.email === email)) return res.status(400).json({ error: "Email already registered." });
            
            const newUser = { email, password, profile: {} };
            db.users.push(newUser);
            saveDB(db);
            return res.json({ success: true, email: newUser.email, profile: newUser.profile });
        }
    } catch (e) {
        return res.status(500).json({ error: "Signup failed: " + e.message });
    }
});

app.post('/api/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (isDBConnected) {
            const user = await User.findOne({ email });
            if (!user || user.password !== password) return res.status(401).json({ error: "Invalid email or password." });
            return res.json({ success: true, email: user.email, profile: user.profile });
        } else {
            const db = getDB();
            const user = db.users.find(u => u.email === email);
            if (!user || user.password !== password) return res.status(401).json({ error: "Invalid email or password." });
            return res.json({ success: true, email: user.email, profile: user.profile });
        }
    } catch (e) {
        return res.status(500).json({ error: "Signin failed: " + e.message });
    }
});

app.post('/api/profile', async (req, res) => {
    try {
        const { email, profile } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required to update profile." });
        
        if (isDBConnected) {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: "User not found." });
            user.profile = { ...user.profile.toObject(), ...profile };
            await user.save();
            return res.json({ success: true, profile: user.profile });
        } else {
            const db = getDB();
            const userIndex = db.users.findIndex(u => u.email === email);
            if (userIndex === -1) return res.status(404).json({ error: "User not found." });
            db.users[userIndex].profile = { ...db.users[userIndex].profile, ...profile };
            saveDB(db);
            return res.json({ success: true, profile: db.users[userIndex].profile });
        }
    } catch (e) {
        return res.status(500).json({ error: "Profile update failed: " + e.message });
    }
});

app.get('/api/history', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: "Email is required" });

        if (isDBConnected) {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: "User not found" });
            return res.json({ success: true, history: user.resumeHistory || [] });
        } else {
            const db = getDB();
            const user = db.users.find(u => u.email === email);
            if (!user) return res.status(404).json({ error: "User not found" });
            return res.json({ success: true, history: user.resumeHistory || [] });
        }
    } catch (e) {
        return res.status(500).json({ error: "Failed to fetch history" });
    }
});


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateContentWithFallback = async (options) => {
    // Only use models available on the free tier to prevent 404 or 429 Limit 0 errors.
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
    let lastError = null;
    let delay = 3000; // Increased base delay to handle 503s better
    
    for (let attempt = 1; attempt <= 4; attempt++) {
        for (const currentModel of modelsToTry) {
            try {
                const currentOptions = { ...options, model: currentModel };
                const response = await ai.models.generateContent(currentOptions);
                return response;
            } catch (error) {
                console.warn(`[Attempt ${attempt}] Model ${currentModel} failed: ${error.message}`);
                lastError = error;
            }
        }
        if (attempt < 4) {
            console.log(`[Attempt ${attempt}] Models failed handling high demand. Waiting ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; 
        }
    }
    throw lastError; 
};
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
        const response = await generateContentWithFallback({
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

            console.log("Before standard parse");
            try {
                if (req.file.mimetype === 'application/pdf') {
                    const parsed = await pdfParse(dataBuffer);
                    text = parsed.text ? parsed.text.trim() : '';
                } else if (req.file.mimetype === 'text/plain') {
                    text = dataBuffer.toString('utf-8').trim();
                } else if (req.file.mimetype.startsWith('image/')) {
                    const response = await generateContentWithFallback({
                        model: 'gemini-2.5-flash',
                        contents: [
                            { role: 'user', parts: [
                                { inlineData: { data: dataBuffer.toString('base64'), mimeType: req.file.mimetype } },
                                { text: "Extract and return ALL text from this resume image perfectly. Do not summarize, just transcribe the raw text exactly as seen." }
                            ]}
                        ]
                    });
                    text = response.text ? response.text.trim() : '';
                }
            } catch (parseError) {
                console.error(parseError);
                return res.status(400).json({ success: false, error: "File parsing failed or corrupted format" });
            }
            console.log("File dynamically parsed");
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

        const email = req.body.email;
        if (email) {
            const historyEntry = {
                id: Date.now().toString(),
                fileName: req.file ? req.file.originalname : "Optimized_Resume.txt",
                atsScore: aiAnalysis.atsScore,
                impact: Math.min(100, aiAnalysis.atsScore + 12),
                keywords: Math.min(100, aiAnalysis.atsScore - 5),
                brevity: Math.min(100, aiAnalysis.atsScore + 5),
                date: new Date().toISOString().split('T')[0],
                analysis: aiAnalysis,
                extractedText: text
            };
            if (isDBConnected) {
                const user = await User.findOne({ email });
                if (user) {
                    if (!user.resumeHistory) user.resumeHistory = [];
                    user.resumeHistory = [historyEntry, ...user.resumeHistory].slice(0, 50);
                    await user.save();
                }
            } else {
                const db = getDB();
                const userIndex = db.users.findIndex(u => u.email === email);
                if (userIndex !== -1) {
                    if (!db.users[userIndex].resumeHistory) db.users[userIndex].resumeHistory = [];
                    db.users[userIndex].resumeHistory = [historyEntry, ...db.users[userIndex].resumeHistory].slice(0, 50);
                    saveDB(db);
                }
            }
        }

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


const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
