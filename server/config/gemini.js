import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import process from "node:process";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
   
});

export default ai;