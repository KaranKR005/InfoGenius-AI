import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
// import { MongoClient } from 'mongodb'; // Import MongoClient from mongodb package
import pkg from 'mongodb';
const { MongoClient } = pkg;

const conversationHistory = [];

import { generateCustomResponse } from './custom_msg.js';
generateCustomResponse;

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true, // Deprecated option
    useUnifiedTopology: true, // Deprecated option
});

// Connect to MongoDB
client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from InfoGeniusAI'
    });
});

app.post('/', async (req, res) => {
    try {
        const userMessage = req.body.prompt;

        // Add user message to conversation history
        conversationHistory.push({ role: 'user', message: userMessage });

        // Generate custom response based on conversation history
        const customResponse = generateCustomResponse(userMessage);

        // Store chat data in MongoDB
        const chatData = {
            user: userMessage,
            bot: customResponse || "", // If customResponse is null, set bot response to an empty string
            timestamp: new Date(),
        };

        const database = client.db('ChatDB'); // Replace 'ChatDB' with your actual database name
        const collection = database.collection('ChatHistory');

        await collection.insertOne(chatData);

        if (customResponse !== null) {
            // If there's a custom response, send it directly
            res.status(200).send({
                bot: customResponse,
            });
        } else {
            // Otherwise, continue the conversation with the AI (using gpt-3.5-turbo)
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: conversationHistory.map(entry => entry.message).join(' '), // Join conversation history for context
                temperature: 0.2,
                max_tokens: 3000,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0,
            });
    
            // Extract bot response from OpenAI API response
            const botResponse = response.data.choices[0].text;
    
            // Store the OpenAI generated response in the chatData object
            chatData.bot = botResponse;
    
            // Update the conversation history with bot response
            conversationHistory.push({ role: 'bot', message: botResponse });
    
            // Update the MongoDB record with the OpenAI generated response
            await collection.updateOne({ _id: chatData._id }, { $set: { bot: botResponse } });

            res.status(200).send({
                bot: botResponse,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong: ' + error.message);
    }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));