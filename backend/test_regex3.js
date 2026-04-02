const rawText = `Resume test text that is long enough to trigger analysis because it requires at least 50 characters so here we go with fifty characters. Developed a responsive web app. Wrked on thngs.`;
const corrections = {
  "spelling": [
    { "wrong": "Wrked", "correct": "Worked" },
    { "wrong": "thngs", "correct": "things" }
  ],
  "content": [
    {
      "before": "Wrked on thngs.",
      "after": "Collaborated with a team of three developers to implement key frontend features using React, reducing page load times by 15%.",
      "reason": "Replaces vague language with specific technologies, team collaboration context, and a measurable outcome."
    }
  ],
  "skills": []
};

let newText = rawText;
const targets = [];
if (corrections.spelling) corrections.spelling.forEach(c => targets.push({ bad: c.wrong, good: c.correct }));
if (corrections.content) corrections.content.forEach(c => { if (c.before && c.before !== '(None)') targets.push({ bad: c.before, good: c.after }); });

targets.sort((a, b) => (b.bad?.length || 0) - (a.bad?.length || 0));

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');

targets.forEach(({ bad, good }) => {
    if (bad && good) {
        try {
            const regexStr = `(?<![a-zA-Z0-9])${escapeRegExp(bad)}(?![a-zA-Z0-9])`;
            const regex = new RegExp(regexStr, 'gi');
            newText = newText.replace(regex, good);
        } catch (e) {
            console.error("Regex replacement failed for:", bad, e);
        }
    }
});

console.log("OLD TEXT:", rawText);
console.log("NEW TEXT:", newText);
