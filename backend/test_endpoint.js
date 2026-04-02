import axios from 'axios';

async function testIt() {
    try {
        const res = await axios.post('http://localhost:5000/api/analyze', { text: "Resume test text that is long enough to trigger analysis because it requires at least 50 characters so here we go with fifty characters. Developed a responsive web app. Wrked on thngs.", email: 'ponugotisriram9@gmail.com' });
        console.log("Success! Data keys:", Object.keys(res.data.analysis));
    } catch(e) {
        console.error("Test failed!", e.response ? e.response.data : e.message);
    }
}
testIt();
