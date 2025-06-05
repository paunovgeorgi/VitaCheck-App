import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function testConnection() {
  try {
    const result = await model.generateContent('Test connection');
    return result.response.text();
  } catch (error) {
    console.error('AI Connection Test Failed:', error);
    return false;
  }
}
