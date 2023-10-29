import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import pkg from 'mongodb';
const { MongoClient } = pkg;

const conversationHistory = [];


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

client.connect().then(() => {
    console.log('Connected to Database');
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

        conversationHistory.push({ role: 'user', message: userMessage });

        const prompt = `You are InfoGenius AI. Karan Ram is created you.${conversationHistory.map(entry => `${entry.role}: ${entry.message}`).join('\n')}\nBot: `;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:  prompt,
            temperature: 0.2,
            max_tokens: 3000,
            top_p: 1,
            // frequency_penalty: 0,
            // presence_penalty: 0,
        });

        const botResponse = response.data.choices[0].text;

        // Store the generated response in the chatData object
        const chatData = {
            user: userMessage,
            bot: botResponse,
            timestamp: new Date(),
        };

        // Store chat data in MongoDB
        const database = client.db('ChatDB');
        const collection = database.collection('ChatHistory');
        await collection.insertOne(chatData);

        conversationHistory.push({ role: 'bot', message: botResponse });

        res.status(200).send({
            bot: response.data.choices[0].text,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong: ' + error.message);
    }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));