// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Import CORS middleware
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); // Enable CORS for all routes
app.use(express.json());

require('dotenv').config();
const APIKey = process.env.OPENAI_API_KEY;


app.post('/ask', async (req, res) => {
    const { question } = req.body;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${APIKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: question }],
            }),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
