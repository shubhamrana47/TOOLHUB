import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const model =
  process.env.GEMINI_MODEL || "gemini-3.7-flash";

console.log("=================================");
console.log("GEMINI CONFIG CHECK");
console.log("Key exists:", !!apiKey);
console.log("Key length:", apiKey?.length);
console.log("Key prefix:", apiKey?.substring(0, 4));
console.log("Model:", model);
console.log("=================================");

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

export const generateGeminiContent = async (
  prompt,
  options = {}
) => {
  try {
    const response = await ai.models.generateContent({
      model: options.model || model,
      contents: prompt,

      config: {
        ...(options.thinkingLevel
          ? {
              thinkingConfig: {
                thinkingLevel: options.thinkingLevel,
              },
            }
          : {}),

        ...(options.responseMimeType
          ? {
              responseMimeType: options.responseMimeType,
            }
          : {}),
      },
    });

    return response.text || "";
  } catch (error) {
    console.error("=================================");
    console.error("GEMINI API ERROR");
    console.error(error);
    console.error("=================================");

    throw new Error(
      error?.message || "Gemini API request failed"
    );
  }
};