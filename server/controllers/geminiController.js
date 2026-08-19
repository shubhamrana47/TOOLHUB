import { generateGeminiContent } from "../config/gemini.js";


// ============================================================
// GENERATE SEO KEYWORDS
// ============================================================

export const chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    console.log("=================================");
    console.log("Generating SEO keywords...");
    console.log("Search query:", prompt);
    console.log("=================================");

    const finalPrompt = `
You are an expert SEO keyword researcher.

For the search query:

"${prompt.trim()}"

Generate EXACTLY 6 relevant SEO keywords.

Return ONLY valid JSON.

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

- Return exactly 6 keyword objects.
- Every keyword must be relevant to the search query.
- searchVolume must be an estimated monthly search volume.
- seoDifficulty must be a number between 1 and 100.
- competition must be a number between 0 and 1.
- cpc must be an estimated CPC in INR.
- Return ONLY JSON.
- Do not use Markdown.
- Do not use code fences.
- Do not add explanations.
- Do not add text before or after the JSON.
`;

    const text = await generateGeminiContent(finalPrompt);

    let cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Gemini JSON parse error:", parseError);
      console.error("Gemini returned:", cleanedText);

      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON",
      });
    }

    if (
      !data.keywords ||
      !Array.isArray(data.keywords)
    ) {
      return res.status(500).json({
        success: false,
        message: "Invalid Gemini response format",
      });
    }

    // Make sure exactly 6 are returned
    const keywords = data.keywords.slice(0, 6);

    console.log("Keywords generated:", keywords.length);

    return res.status(200).json({
      success: true,
      keywords,
    });

  } catch (error) {
    console.error("Gemini keyword generation error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Gemini API failed",
    });
  }
};


// ============================================================
// GENERATE BLOG
// ============================================================

export const generateBlog = async (req, res) => {
  try {
    const {
      topic,
      keywords,
      wordLimit,
    } = req.body;

    // --------------------------------------------------------
    // Validate topic
    // --------------------------------------------------------

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    // --------------------------------------------------------
    // Validate keywords
    // --------------------------------------------------------

    if (
      !keywords ||
      !Array.isArray(keywords) ||
      keywords.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one keyword is required",
      });
    }

    // --------------------------------------------------------
    // Validate word limit
    // --------------------------------------------------------

    if (
      !wordLimit ||
      Number(wordLimit) < 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Word limit must be at least 100",
      });
    }

    console.log("=================================");
    console.log("Generating blog...");
    console.log("Topic:", topic);
    console.log("Keywords:", keywords);
    console.log("Word limit:", wordLimit);
    console.log("=================================");

    // --------------------------------------------------------
    // Blog prompt
    // --------------------------------------------------------

    const finalPrompt = `
You are an expert SEO content writer and SEO strategist.

Create a complete SEO-optimized blog based on the information below.

TOPIC:
"${topic.trim()}"

TARGET KEYWORDS:
${keywords
  .map((keyword) => `- ${keyword}`)
  .join("\n")}

TARGET WORD LIMIT:
${wordLimit} words


IMPORTANT SEO REQUIREMENTS:

- Naturally use the target keywords throughout the blog.
- Do not keyword stuff.
- Make the content useful, informative, engaging, and easy to read.
- Use semantic keywords related to the topic.
- Write an SEO-friendly meta title.
- Write an SEO-friendly meta description.
- Create a short SEO-friendly URL slug.
- Use proper headings and subheadings.
- Keep paragraphs short and readable.
- Include examples where useful.
- Do not mention AI or Gemini.
- Do not include unnecessary explanations.
- The blog should be approximately ${wordLimit} words.
- Do not exceed ${wordLimit} words for the BLOG section.


BLOG FORMATTING RULES:

- Do NOT use hashtags (#).
- Do NOT use Markdown heading syntax.
- Do NOT use asterisks.
- Do NOT use Markdown formatting.
- Write headings as plain text.
- Keep every heading on its own line.
- Keep paragraphs separated by blank lines.
- Use clean plain text.
- Do not use code fences.


RETURN EXACTLY THIS FORMAT:

META TITLE:
[SEO-friendly meta title under 60 characters]

META DESCRIPTION:
[SEO-friendly meta description between 150-160 characters]

IMAGE PROMPT:
[SEO-friendly image prompt based on the blog title]

URL SLUG:
[short lowercase SEO-friendly slug using hyphens]

BLOG:

[Blog Title]

[Introduction]

First Main Heading

[Content]

Second Main Heading

[Content]

Third Main Heading

[Content]

Additional Heading

[Content]

Conclusion

[Conclusion]


IMPORTANT:

- Return ONLY:
  META TITLE
  META DESCRIPTION
  IMAGE PROMPT
  URL SLUG
  BLOG

- Do not return JSON.
- Do not use Markdown code fences.
- Do not add explanations before META TITLE.
- Do not add explanations after BLOG.
- Do not use #, ##, ###, *, or other Markdown symbols.
- BLOG must contain the complete article.
`;

    // --------------------------------------------------------
    // Generate blog
    // --------------------------------------------------------

    const blog = await generateGeminiContent(finalPrompt);

    console.log("Blog generated successfully");

    return res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error("Blog generation error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Blog generation failed",
    });
  }
};