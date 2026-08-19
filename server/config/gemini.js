import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.GEMINI_API_KEY;

console.log("=================================");
console.log("GEMINI CONFIG CHECK");
console.log("Key exists:", !!key);
console.log("Key length:", key?.length);
console.log("Key prefix:", key?.slice(0, 4));
console.log("Key suffix:", key?.slice(-4));
console.log("=================================");

const ai = new GoogleGenAI({
  apiKey: key,
});

export default ai;