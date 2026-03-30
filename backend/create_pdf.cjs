const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('../tests/real_resume.pdf'));
doc.fontSize(25).text('John Doe', 100, 100);
doc.fontSize(16).text('Software Engineer', 100, 140);
doc.fontSize(12).text('Experience: 5 years in React, Node.js, Express, MongoDB. Developed multiple web applications and scalable APIs. Projects include an AI Resume Analyzer with Google Gemini. Skills: JavaScript, Python, C++, HTML, CSS, React, AWS. Contact: john.doe@email.com, linkedin.com/in/johndoe', 100, 180);
doc.end();
console.log("PDF created");
