
import { useState } from "react";
import axios from "axios";

const useGenerateBlog = () => {
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBlog = async (topic, keywords,wordLimit) => {
    if (!topic || !keywords?.length) {
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gemini/generate-blog`,
        {
          topic,
          keywords,
          wordLimit,
        }
      );

      console.log("Generated Blog:", data);

      setBlog(data.blog);

      return data.blog;
    } catch (error) {
      console.error("Blog generation error:", error);
      alert("Failed to generate blog.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    blog,
    loading,
    generateBlog,
  };
};

export default useGenerateBlog;

