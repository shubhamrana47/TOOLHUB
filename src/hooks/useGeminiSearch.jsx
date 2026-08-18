import { useState } from "react";
import axios from "axios";

export default function useGeminiSearch() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return null;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gemini/chat`,
        {
          prompt: `
You are an SEO expert.

For the search query: "${question}"

Generate exactly 6 SEO keywords.

Return ONLY valid JSON:

{
  "keywords": [
    {
      "keyword": "",
      "searchVolume": 0,
      "seoDifficulty": 0,
      "competition": 0,
      "cpc": 0
    }
  ]
}

Rules:
- searchVolume = estimated monthly search volume
- seoDifficulty = number between 1 and 100
- competition = number between 0.00 and 1.00
- cpc = estimated CPC in INR
- Generate exactly 6 keywords
- Return only JSON
`,
        }
      );

      console.log("Keywords:", data.keywords);

      return data.keywords;
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("Something went wrong.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    loading,
    handleSubmit,
  };
}