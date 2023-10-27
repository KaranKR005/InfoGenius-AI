import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import { MongoClient } from 'mongodb';

import { generateCustomResponse } from './custom_msg.js';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

// Store user-specific conversation history
const conversationHistory = {};

app.post('/start-chat', async (req, res) => {
    try {
        const userName = req.body.name;
        const userMessage = req.body.message;

        // Generate a collection name based on the user's name
        const collectionName = userName.replace(/\s+/g, '_'); // Replace spaces with underscores

        // Retrieve or create user's conversation history
        if (!conversationHistory[collectionName]) {
            conversationHistory[collectionName] = [];
        }

        // Store user's message in conversation history
        conversationHistory[collectionName].push({ role: 'user', message: userMessage });

        // Continue the conversation with the AI (using gpt-3.5-turbo)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: conversationHistory[collectionName].map(entry => entry.message).join(' '), // Join conversation history for context
            temperature: 0.2,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        // Extract bot response from OpenAI API response
        const botResponse = response.data.choices[0].text;

        // Store the AI generated response in the conversation history
        conversationHistory[collectionName].push({ role: 'bot', message: botResponse });

        // Send the bot response back to the client
        res.status(200).send({
            bot: botResponse,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong: ' + error.message);
    }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));