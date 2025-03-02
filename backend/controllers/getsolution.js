import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv'; // Load .env variables
dotenv.config();  // Ensure .env is loaded
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const getsolutionash=async(req,res)=>{
    try {
        const imageData = req.body.image.split(',')[1];
        const imageBuffer = Buffer.from(imageData, 'base64');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze this math problem. Provide a step-by-step solution and final answer. 
                       If you detect a student's solution, compare it with the correct approach, 
                       marking steps as correct or incorrect with feedback.`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: imageBuffer.toString('base64')
                }
            }
        ]);
        const response =  processGeminiResponse(result.response.text());
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'This image doesn\'t contain a valid mathematical problem or we couldn\'t process it. Please try again with a clear image of a math problem.' 
        });
    }
}

function processGeminiResponse(text) {
    // Parse the Gemini response and structure it
    const steps = text.split('\n')
        .filter(line => line.trim())
        .map((line, index) => {
            const isCorrect = !line.toLowerCase().includes('incorrect');
            return {
                description: line,
                isCorrect,
                feedback: isCorrect ? '' : 'Please review this step'
            };
        });

    return {
        steps,
        finalAnswer: steps[steps.length - 1].description
    };
}
