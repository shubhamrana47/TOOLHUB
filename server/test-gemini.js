import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

console.log("Key exists:", !!apiKey);
console.log("Key prefix:", apiKey?.substring(0, 4));

const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
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
              text: "Say hello in one sentence",
            },
          ],
        },
      ],
    }),
  }
);

const data = await response.json();

console.log("Status:", response.status);
console.log(JSON.stringify(data, null, 2));