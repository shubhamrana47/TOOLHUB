import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useGeminiSearch() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast.error("Please enter a search query.");
      return null;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gemini/chat`,
        {
          // Send only the user's search query.
          // Your backend creates the SEO prompt.
          prompt: question,
        },
        {
          // Stop waiting after 30 seconds
          timeout: 30000,
        }
      );

      console.log("Keywords:", data.keywords);

      return data.keywords;

    } catch (error) {
      console.error("Gemini Error:", error);

      // ==========================================
      // GEMINI TEMPORARILY UNAVAILABLE
      // ==========================================

      if (error.response?.status === 503) {
        toast.error(
          "TOOLHUB is temporarily under maintenance. Please try again later."
        );

        return null;
      }

      // ==========================================
      // REQUEST TIMEOUT
      // ==========================================

      if (
        error.code === "ECONNABORTED" ||
        error.code === "ETIMEDOUT"
      ) {
        toast.error(
          "TOOLHUB is taking longer than expected. Please try again."
        );

        return null;
      }

      // ==========================================
      // OTHER ERRORS
      // ==========================================

      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );

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