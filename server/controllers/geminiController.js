import ai from "../config/gemini.js";

export const chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const finalPrompt = `
You are an SEO Expert.

For the search query:

"${prompt}"

Generate EXACTLY 6 SEO keywords.

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
- Return exactly 6 objects.
- searchVolume should be an estimated monthly search volume.
- seoDifficulty between 1 and 100.
- competition between 0 and 1.
- cpc in INR.
- Return ONLY JSON.
- Do not use markdown.
- Do not write explanations.
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: finalPrompt,
    });

    let text = response.text;

    
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(text);

    res.status(200).json({
      success: true,
      keywords: data.keywords,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateBlog = async (req, res) => {
  try {
    const {
      topic,
      keywords,
      wordLimit,
    } = req.body;

    // Validate topic
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    // Validate keywords
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one keyword is required",
      });
    }

    // Validate word limit
    if (!wordLimit || Number(wordLimit) < 100) {
      return res.status(400).json({
        success: false,
        message: "Word limit must be at least 100",
      });
    }

const finalPrompt = `
You are an expert SEO content writer and SEO strategist.

Create a complete SEO-optimized blog based on the information below.

TOPIC:
"${topic}"

TARGET KEYWORDS:
${keywords.map((keyword) => `- ${keyword}`).join("\n")}

TARGET WORD LIMIT:
${wordLimit} words


IMPORTANT SEO REQUIREMENTS:

- Naturally use the target keywords throughout the blog.
- Do not keyword stuff.
- Make the content useful, informative, engaging, and easy to read.
- Use semantic keywords related to the topic.
- Write an SEO-friendly meta title.
- Write an SEO-friendly meta description.
- Create a short, SEO-friendly URL slug.
- Use proper headings and subheadings.
- Keep paragraphs short and readable.
- Include examples where useful.
- Do not mention AI or Gemini.
- Do not include unnecessary explanations.
- The blog should be approximately ${wordLimit} words.
- Do not exceed ${wordLimit} words for the blog content.


VERY IMPORTANT BLOG FORMATTING RULES:

- Do NOT use hashtags (#) anywhere in the blog.
- Do NOT use Markdown heading syntax such as #, ##, or ###.
- Do NOT use asterisks for bold or italic text.
- Do NOT use Markdown formatting.
- Write headings as plain text.
- Keep each heading on its own line.
- Keep paragraphs separated by blank lines.
- The blog must contain clean plain text only.
-Headings must be in bold characters .
RETURN THE RESPONSE IN EXACTLY THIS FORMAT:

META TITLE:
[Write an SEO-friendly meta title, preferably under 60 characters]

META DESCRIPTION:
[Write an SEO-friendly meta description, preferably between 150-160 characters]

IMAGE PROMPT:
[Write an seo friendly image prompt ,that must be according to blog title ]

URL SLUG:
[Write a short SEO-friendly URL slug using lowercase words separated by hyphens]

BLOG:

[Blog Title]

[Introduction paragraph]

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

- Return ONLY these four sections:
  META TITLE
  META DESCRIPTION
  URL SLUG
  BLOG
- Do not add JSON.
- Do not add Markdown code fences.
- Do not add explanations before META TITLE.
- Do not add explanations after the BLOG.
- Do not use #, ##, ###, *, or other Markdown symbols inside the BLOG.
- The BLOG section must contain the complete article.
`;



    console.log("Generating blog...");
    console.log("Topic:", topic);
    console.log("Keywords:", keywords);
    console.log("Word limit:", wordLimit);

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: finalPrompt,
    });

    const blog = response.text;

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error("Blog generation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};