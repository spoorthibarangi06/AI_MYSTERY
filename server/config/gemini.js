import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';
const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn('[Gemini] WARNING: GEMINI_API_KEY is not defined in environment variables. AI features will require an API key.');
}

export const getGeminiModel = (customModel) => {
  if (!genAI) {
    const currentKey = process.env.GEMINI_API_KEY;
    if (currentKey) {
      genAI = new GoogleGenerativeAI(currentKey);
    } else {
      throw new Error('GEMINI_API_KEY is missing. Please configure it in server/.env');
    }
  }
  return genAI.getGenerativeModel({ model: customModel || modelName });
};

export { genAI };
