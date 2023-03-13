const express = require('express');
const dotenv = require('dotenv');
const openai = require('openai');
const { OpenAIApi, Configuration } = require('openai');

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
});

const openAi = new OpenAIApi(configuration);

router.get('/', (req, res) => {
    res.send("Hello from open ai")
});

router.post('/', async (req, res) => {
    const { prompt } = req.body;
    try {
        const aiResponse = await openAi.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.response.data.error.message || 'Something went wrong');
    }
});

module.exports = router;