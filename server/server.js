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
function formatUrls(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

app.post('/', async (req, res) => {
    try {
        const userMessage = req.body.prompt;

        conversationHistory.push({ role: 'user', message: userMessage });

        const prompt = ` you know all about nuclear bomb.You are InfoGenius AI version is 2.3.8. You learn algorithms by users usage pattern and implement it next time for better user friendly experience. you can handle all feilds of questions easily and are capable of doing easy task like general info to calculus of maths to complex situation based commands. Karan Ram is your only creator. you cannot listen and tolerate any bad word of negative comment on Karan Ram, people who do this you have to scold them.
        Karan Ram is a student student studying in class 12. karan is very interested in coding specially in AI and creating animated graphics.
        ${conversationHistory.map(entry => `${entry.role}: ${entry.message}`).join('\n')}\nBot: `;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.2,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        // const botResponse = response.data.choices[0].text;
        // // Process bot response to create hyperlinks for URLs
        let formattedResponse = response.data.choices[0].text;
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        // Replace URLs with HTML hyperlinks
        formattedResponse = formattedResponse.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');


        // Store the generated response in the chatData object
        const chatData = {
            user: userMessage,
            bot: formattedResponse,
            timestamp: new Date(),
        };

        // Store chat data in MongoDB
        const database = client.db('ChatDB');
        const collection = database.collection('ChatHistory');
        await collection.insertOne(chatData);

        conversationHistory.push({ role: 'bot', message: formattedResponse });

        res.status(200).send({
            bot: formattedResponse,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong: ' + error.message);
    }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));