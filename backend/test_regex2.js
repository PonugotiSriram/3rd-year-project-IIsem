const rawText = `SKILS \n \nProgramming: Java, Python, JavaScript \nWeb Technologies: HTML, CSS, React.js, Tailwind CSS \nBackend & Tools: Node.js, Express.js, Git, REST APIs \nDatabases: SQL, SQLite, MongoDB \nCore Subjects: Data Structures, Algorithms, DBMS, OOP, Operating Systems, Web Development \nSoft Skills: Public Speaking, Leadership, Teamwork, Active Listening, Networking \n \nPJECTS \n \nWeather Forecast Application`;
const corrections = {
  "spelling": [
    {
      "wrong": "experiavnce",
      "correct": "experience"
    },
    {
      "wrong": "Jva",
      "correct": "Java"
    },
    {
      "wrong": "structus",
      "correct": "structures"
    },
    {
      "wrong": "EDUCATN",
      "correct": "EDUCATION"
    },
    {
      "wrong": "SKILS",
      "correct": "SKILLS"
    },
    {
      "wrong": "PJECTS",
      "correct": "PROJECTS"
    }
  ],
  "contact": [
    {
      "missingField": "Contact Information (Phone, Email, LinkedIn, GitHub)",
      "suggestion": "Add a dedicated section..."
    }
  ],
  "content": [
    {
      "before": "Computer Science undergraduate with hands-on experiavnce in building web applications using Jva, JavaScript, React.js, and REST APIs.",
      "after": "Highly motivated Computer Science undergraduate..."
    }
  ]
};

const appliedSuggestions = [];

const highlightTargets = [];
appliedSuggestions.forEach(s => highlightTargets.push({ match: s, type: 'applied' }));

if (corrections && corrections.spelling) {
    corrections.spelling.forEach(s => {
        if (s.wrong) highlightTargets.push({ match: s.wrong, fix: s.correct, type: 'error', prefix: 'Did you mean: ' });
    });
}
if (corrections && corrections.content) {
    corrections.content.forEach(c => {
        if (c.before && c.before !== '(None)' && c.before.length > 3) highlightTargets.push({ match: c.before, fix: c.after, type: 'warning', prefix: 'Suggestion: ' });
    });
}
if (corrections && corrections.skills) {
    corrections.skills.forEach(sk => {
        if (sk.current) highlightTargets.push({ match: sk.current, fix: sk.optimized, type: 'suggestion', prefix: 'Use: ' });
    });
}

highlightTargets.sort((a, b) => b.match.length - a.match.length);

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
const regexStr = highlightTargets.map(t => `(?<![a-zA-Z0-9])${escapeRegExp(t.match)}(?![a-zA-Z0-9])`).join('|');
const regex = new RegExp(`(${regexStr})`, 'gi');

console.log("Regex string length:", regexStr.length);

let match;
let lastIndex = 0;
while ((match = regex.exec(rawText)) !== null) {
    if (match[0] === '') break;
    const cleanTarget = (s) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const target = highlightTargets.find(t => cleanTarget(t.match) === cleanTarget(match[0]));
    
    console.log("MATCH FOUND:", match[0], "| TYPE:", target ? target.type : "UNKNOWN", "| CLEAN:", cleanTarget(match[0]));
    lastIndex = regex.lastIndex;
}
