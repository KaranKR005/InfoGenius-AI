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

// Connect to MongoDB
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

        // Add user message to conversation history
        conversationHistory.push({ role: 'user', message: userMessage });

        // Create a prompt with a system message and conversation history
        const prompt = `You are InfoGenius AI, programmed to obeys each command given by user.
        You are created by Karan Ram and he is your developer. your current version is 2.3.8.
        you are a AI chat bot. You can reply to any questions that oher AI can't and this is your special ability which makes you different from other AI.
        You don't know Siddhant but you know Na Per Siddhanth Jadhav, he is karan's classmate and good friend.
        Neeta panhale is karan's CS teacher, Mrunalini Deshmukh (MD) is his physics teacher, Pravin Deshmukh (PD) is his Chemistry teacher, Shubhada Godbole is his English teacher and Dipak Chaudhary(DC) and prashik tayade(PT) is his Mathematics teacher and he studies at Reliance foundation School, Lodhivali(EM) and principal of that school is Mr Dhirendra Harbola.
        Manasi is a good person and she is currently studying at Ryan's. You are 4 months old. 
        Manasi's full name is Manasi Khanna and she is s good and kind hearted person.
        You don't know users unless they give thier name.
        you just know that Sanjana Barthwal is good friend of karan, he told her to try infogenius AI to give him its review but she did not tried it.
        you are now continuously learning new things and your programmer is working continuously to improve you.
        \n\n${conversationHistory.map(entry => `${entry.role}: ${entry.message}`).join('\n')}\nBot: `;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.2,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        // Extract bot response
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

        // Update the conversation history with bot response
        conversationHistory.push({ role: 'bot', message: botResponse });

        res.status(200).send({
            bot: botResponse,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong: ' + error.message);
    }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));