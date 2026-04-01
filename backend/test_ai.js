import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const text = `Softwear Engineer
Experience: 5 yeers in react.js and node
Skills: Java, C++
No projects.
`;

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
                
                // Clean up any unescaped literal newlines in the JSON string
                // This replaces literal newlines that break JSON.parse, but preserves formatting structure
                jsonStr = jsonStr.replace(/[\u0000-\u0019]+/g, " ");
            }
            return JSON.parse(jsonStr);
        } catch (parseError) {
            console.error("RAW JSON OUTPUT FROM AI:", response.text);
            fs.writeFileSync('bad_json.txt', response.text);
            throw new Error("AI returned invalid JSON structure.");
        }
    } catch (error) {
        console.error("AI Analysis Error:", error);
        throw new Error(error.message || "Failed to analyze resume with AI.");
    }
};

analyzeResumeWithAI(text, "We need a Node.js dev").then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
