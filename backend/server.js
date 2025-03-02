import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import findsolutionRoute from './routes/findsolution.js';
dotenv.config();
const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('../frontend'));
app.use('/api', findsolutionRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
