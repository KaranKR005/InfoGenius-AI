import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import { MongoClient } from 'mongodb';

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

app.get('/chat', (req, res) => {
    const username = req.query.username;
    if (!username) {
        res.status(400).send("Username is required.");
        return;
    }

    res.status(200).sendFile(__dirname + '/chat.html');
});

app.post('/start-chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        // Continue the conversation with the AI (using gpt-3.5-turbo)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userMessage,
            temperature: 0.2,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        // Extract bot response from OpenAI API response
        const botResponse = response.data.choices[0].text;

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