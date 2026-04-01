# AI Resume Analyzer Platform

An advanced, AI-powered resume analysis and optimization platform. This application leverages Google's Gemini AI to analyze resumes (PDFs), compare them against target job descriptions, and provide highly structured, tailored feedback including ATS scores, skill gaps, and quantifiable impact improvements.

## 🚀 Features

*   **Intelligent PDF Extraction:** Reliably extracts text from uploaded PDF resumes.
*   **Gemini AI Integration:** Utilizes `gemini-2.5-flash` for deep semantic parsing and structured JSON analysis.
*   **ATS Scoring & Feedback:** Provides an immediate ATS score along with keyword matching and brevity ratings.
*   **Interactive "Live Edit" Dashboard:** A split-screen UI (built with React) that highlights spelling errors, weak phrases, and skill gaps dynamically. Click on any AI suggestion to automatically merge it into your resume.
*   **Impact Booster:** Transform weak, generic bullet points into strong, metrics-driven achievements.
*   **Predictive Interview Questions:** Automatically generates 5 custom technical and 5 behavioral interview questions based exclusively on the skills and projects found in the resume.
*   **Dynamic Learning Roadmap:** Identifies missing skills compared to the job description and recommends concrete courses and resources.
*   **Resume Version History:** Saves iterations and ATS score progression over time.

## 🛠️ Technology Stack

**Frontend:**
*   React (Vite)
*   Tailwind CSS (for responsive, modern UI design)
*   Axios for API communication

**Backend:**
*   Node.js & Express.js
*   Multer (Memory storage for file uploads)
*   `pdf-parse` (for PDF text extraction)
*   `@google/genai` (Google's official generative AI SDK)
*   `jsonrepair` (Ensures robust AI payload JSON parsing)
*   `dotenv` (Environment variable management)

## 📂 Project Structure

```text
├── backend/
│   ├── .env                 # Backend environment variables
│   ├── index.js             # Express Server, API routes, and AI logic
│   ├── package.json         # Backend dependencies
│   └── test_api.js          # API testing utility
│
├── frontend/
│   ├── src/                 # React source code (components, UI, etc.)
│   ├── index.html           # Vite HTML entry point
│   ├── tailwind.config.js   # Tailwind rules & theming
│   ├── vite.config.js       # Vite configuration
│   └── package.json         # Frontend dependencies
│
└── README.md                # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
*   Node.js (v18+ recommended)
*   A Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   * Open the `.env` file in the backend directory.
   * Add your Gemini API Key:
     ```env
     GEMINI_API_KEY=your_google_gemini_api_key_here
     ```
4. Start the backend development server:
   ```bash
   node index.js
   ```
   *(The server will run on http://localhost:5000)*

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The application will be accessible at http://localhost:5173)*

## 💡 How It Works

1. **Upload:** User uploads a PDF resume and (optionally) pastes a target job description.
2. **Parsing:** The node server uses `pdf-parse` to accurately pull plaintext from the document.
3. **AI Analysis:** The text is passed into a highly prescriptive prompt using `@google/genai`. 
4. **Resilience:** The AI's response is passed through a robust `jsonrepair` algorithm to guarantee structurally sound JSON mapping, ensuring UI stability.
5. **Dashboard Rendering:** The frontend intelligently categorizes the returned JSON payload into visual modules (Scores, Highlighters, Tooltips) mapping back to specific phrases in the original resume.
