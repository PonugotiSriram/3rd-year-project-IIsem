const rawText = "I have manny skills in Javascript. I Coundn't do it.";
const corrections = {
    spelling: [{wrong: "manny", correct: "many"}, {wrong: "Coundn't", correct: "Couldn't"}],
    content: []
};

const highlightTargets = [];
if (corrections && corrections.spelling) {
    corrections.spelling.forEach(s => {
        if (s.wrong) highlightTargets.push({ match: s.wrong, fix: s.correct, type: 'error', prefix: 'Did you mean: ' });
    });
}

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
const regexStr = highlightTargets.map(t => `(?<![a-zA-Z0-9])${escapeRegExp(t.match)}(?![a-zA-Z0-9])`).join('|');
const regex = new RegExp(`(${regexStr})`, 'gi');

console.log("Regex:", regex);

let match;
while ((match = regex.exec(rawText)) !== null) {
    console.log("Match:", match[0], "at", match.index);
    if (match[0] === '') break;
}
