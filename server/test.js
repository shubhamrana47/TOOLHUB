import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  
});

try {
  const models = await ai.models.list();
console.log("api key ",process.env.GEMINI_API_KEY);
  console.log(models);
} catch (err) {
  console.error(err);
}