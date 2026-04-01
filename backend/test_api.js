import fs from 'fs';

const testApi = async () => {
    try {
        const text = `Softwear Engineer
Experience: 5 yeers in react.js and node
Skills: Java, C++
No projects.
        `;

        const response = await fetch('http://localhost:5000/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, jobDescription: "Looking for node dev" })
        });
        
        const data = await response.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("Test error:", e);
    }
};

testApi();
