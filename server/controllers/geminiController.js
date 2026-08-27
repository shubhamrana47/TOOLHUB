import { generateGeminiContent } from "../config/gemini.js";



// ============================================================
// CHECK GEMINI TEMPORARY UNAVAILABLE ERROR
// ============================================================

const isGeminiUnavailable = (error) => {
  return (
    error?.status === 503 ||
    error?.response?.status === 503 ||
    error?.message?.includes('"code":503') ||
    error?.message?.includes("UNAVAILABLE") ||
    error?.message?.includes("high demand")
  );
};
// ============================================================
// GENERATE SEO KEYWORDS
// ============================================================

export const chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    // --------------------------------------------------------
    // Validate prompt
    // --------------------------------------------------------

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const searchQuery = prompt.trim();

    console.log("=================================");
    console.log("Generating SEO keywords...");
    console.log("Search query:", searchQuery);
    console.log("=================================");

    // --------------------------------------------------------
    // Short optimized prompt
    // --------------------------------------------------------

    const finalPrompt = `
Generate exactly 6 relevant SEO keywords for:

"${searchQuery}"

Return JSON only in this format:

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
- Exactly 6 keyword objects.
- Keywords must be relevant to the search query.
- searchVolume = estimated monthly searches.
- seoDifficulty = number from 1 to 100.
- competition = number from 0 to 1.
- cpc = estimated CPC in INR.
- No markdown.
- No explanations.
`;

    // --------------------------------------------------------
    // Generate response
    // --------------------------------------------------------

    const text = await generateGeminiContent(
      finalPrompt,
      {
        thinkingLevel: "low",
        responseMimeType: "application/json",
      }
    );

    // --------------------------------------------------------
    // Clean response
    // --------------------------------------------------------

    const cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // --------------------------------------------------------
    // Parse JSON
    // --------------------------------------------------------

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error(
        "Gemini JSON parse error:",
        parseError
      );

      console.error(
        "Gemini returned:",
        cleanedText
      );

      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON",
      });
    }

    // --------------------------------------------------------
    // Validate keywords
    // --------------------------------------------------------

    if (
      !data ||
      !Array.isArray(data.keywords)
    ) {
      return res.status(500).json({
        success: false,
        message: "Invalid Gemini response format",
      });
    }

    // --------------------------------------------------------
    // Return exactly 6
    // --------------------------------------------------------

    const keywords = data.keywords
      .slice(0, 6)
      .map((item) => ({
        keyword: item.keyword || "",
        searchVolume:
          Number(item.searchVolume) || 0,
        seoDifficulty:
          Number(item.seoDifficulty) || 0,
        competition:
          Number(item.competition) || 0,
        cpc:
          Number(item.cpc) || 0,
      }));

    console.log(
      "Keywords generated:",
      keywords.length
    );

    return res.status(200).json({
      success: true,
      keywords,
    });

  } catch (error) {
    console.error(
      "Gemini keyword generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Gemini API failed",
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

    const requestedWordLimit = Number(wordLimit);

    if (
      !requestedWordLimit ||
      requestedWordLimit < 100
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
    console.log(
      "Word limit:",
      requestedWordLimit
    );
    console.log("=================================");

    // --------------------------------------------------------
    // Blog prompt
    // --------------------------------------------------------

    const finalPrompt = `
You are an expert SEO content writer.

Create an SEO-optimized blog based on:

TOPIC:
"${topic.trim()}"

TARGET KEYWORDS:
${keywords
  .map((keyword) => `- ${keyword}`)
  .join("\n")}

WORD LIMIT:
${requestedWordLimit} words

SEO REQUIREMENTS:

- Naturally use the target keywords.
- Do not keyword stuff.
- Make the content useful and informative.
- Use related semantic keywords.
- Create an SEO-friendly meta title under 60 characters.
- Create a meta description between 150-160 characters.
- Create a short SEO-friendly URL slug.
- Create an SEO-friendly image prompt.
- Use clear headings and subheadings.
- Keep paragraphs short.
- Include useful examples where appropriate.
- Do not mention AI or Gemini.
- Keep the BLOG approximately ${requestedWordLimit} words.
- Do not exceed ${requestedWordLimit} words for the BLOG.

FORMATTING:

- Plain text only.
- Do not use Markdown.
- Do not use # symbols.
- Do not use asterisks.
- Do not use code fences.
- Headings must be plain text.
- Put each heading on its own line.
- Separate paragraphs with blank lines.

RETURN EXACTLY:

META TITLE:
[title]

META DESCRIPTION:
[description]

IMAGE PROMPT:
[image prompt]

URL SLUG:
[slug]

BLOG:

[complete blog]

Do not add anything before META TITLE.

Do not add anything after the BLOG.
`;

    // --------------------------------------------------------
    // Generate blog
    // --------------------------------------------------------

    const blog = await generateGeminiContent(
      finalPrompt,
      {
        thinkingLevel: "medium",
      }
    );

    console.log(
      "Blog generated successfully"
    );

    return res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error(
      "Blog generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Blog generation failed",
    });
  }
};