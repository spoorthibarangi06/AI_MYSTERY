import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let genAI = null;

export const getGeminiModel = (customModel) => {
  const currentKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!currentKey) {
    throw new Error('GEMINI_API_KEY is missing. Please configure it in .env');
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(currentKey);
  }

  return genAI.getGenerativeModel({ model: customModel || modelName });
};

export { genAI };
