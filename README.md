# AI Resume Analyzer Platform

An advanced, AI-powered resume analysis and optimization platform. This application leverages Google's Gemini AI to analyze resumes (PDF, DOCX, Images), compare them against target job descriptions, and provide highly structured, tailored feedback including ATS scores, skill gaps, and quantifiable impact improvements.

## 🚀 Features

*   **Intelligent Text Extraction:** Reliably extracts text from uploaded PDF resumes.
*   **Gemini AI Integration:** Utilizes `gemini-2.5-flash` for deep semantic parsing and structured JSON analysis.
*   **Authentication & Profiles:** Secure user login utilizing MongoDB, with a seamless fallback to local JSON storage if a database isn't connected. Tracks your analysis history.
*   **ATS Scoring & Dashboard:** Provides an immediate ATS score along with dynamic sub-metrics (Impact Parsing, Keyword Density, and Brevity Ratings) presented in a modern, animated glass-morphism UI.
*   **Interactive "Live Edit" Workspace:** A powerful UI that highlights spelling errors, weak phrases, and skill gaps directly on your resume text. Features an advanced regex-powered string matching algorithm so you can click any AI suggestion to seamlessly merge it into your document.
*   **Version Control:** Save your edits, compare versions side-by-side using "Split View," and download your finalized, optimized resume.
*   **Impact Booster:** Transform weak, generic bullet points into strong, metrics-driven achievements through contextual AI follow-up questions.
*   **Predictive Interview Engine:** Automatically generates 5 custom technical and 5 behavioral interview questions based exclusively on the skills and projects found in the resume.
*   **Dynamic Learning Roadmap:** Identifies missing skills compared to the job description and recommends concrete courses and resources.

## 🛠️ Technology Stack

**Frontend:**
*   React (Vite)
*   Tailwind CSS (for responsive, modern UI design, custom keyframe animations, and glowing gradients)
*   Lucide React (Icons)
*   Axios for API communication

**Backend:**
*   Node.js & Express.js
*   MongoDB (Mongoose for user schema and authentication)
*   Multer (Memory storage for file uploads)
*   `pdf-parse` (for PDF text extraction)
*   `@google/genai` (Google's official generative AI SDK)
*   `jsonrepair` (Ensures robust AI payload JSON parsing)
*   `dotenv` (Environment variable management)

## 📂 Project Structure

```text
├── backend/
│   ├── .env                 # Backend environment variables (MongoDB URI, Gemini Key)
│   ├── index.js             # Express Server, API routes, Auth, and AI logic
│   ├── package.json         # Backend dependencies
│   ├── local_db.json        # Fallback local storage for users (if no MongoDB)
│   └── test_api.js          # API testing utility
│
├── frontend/
│   ├── src/                 # React source code (components, UI, etc.)
│   │   ├── App.jsx          # Main application logic & dashboard UI
│   │   ├── index.css        # Tailwind directives and custom animations
│   │   └── main.jsx         # React root
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
*   (Optional) MongoDB Connection String

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
   * Add your Gemini API Key and optional MongoDB URI:
     ```env
     GEMINI_API_KEY=your_google_gemini_api_key_here
     MONGODB_URI=your_mongodb_connection_string
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

1. **Upload & Auth:** Users log in (creating a secure profile) and upload a PDF resume, optionally pasting a target job description.
2. **Parsing:** The Node.js server extracts plaintext from the document.
3. **AI Generation:** The text is passed into a highly prescriptive, multi-stage prompt using `@google/genai`.
4. **Resilience & Parsing:** The AI's response is passed through a robust `jsonrepair` algorithm to guarantee structurally sound JSON mapping, ensuring UI stability.
5. **Interactive Feedback:** The frontend parses the JSON array to render interactive highlighters on the document. Our custom alphanumeric lookbehind algorithms ensure AI suggestions uniquely target correct phrasing without corrupting standard text.
6. **Iterate & Improve:** Users accept AI suggestions directly into their editor, click "Reanalyze" to pass the new text back to the AI, and watch their ATS iteration score climb in real time!
