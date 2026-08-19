import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

console.log("=================================");
console.log("GEMINI CONFIG CHECK");
console.log("Key exists:", !!apiKey);
console.log("Key length:", apiKey?.length);
console.log("Key prefix:", apiKey?.substring(0, 4));
console.log("=================================");

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

export const generateGeminiContent = async (prompt) => {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);

    throw new Error(
      data?.error?.message || "Gemini API request failed"
    );
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};