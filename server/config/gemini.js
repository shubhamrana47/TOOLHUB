import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();


// ============================================================
// GEMINI CONFIGURATION
// ============================================================

const apiKey = process.env.GEMINI_API_KEY;

const model =
  process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

console.log("=================================");
console.log("GEMINI CONFIG CHECK");
console.log("Key exists:", !!apiKey);
console.log("Key length:", apiKey?.length);
console.log("Key prefix:", apiKey?.substring(0, 4));
console.log("Model:", model);
console.log("=================================");


// ============================================================
// CHECK API KEY
// ============================================================

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}


// ============================================================
// GOOGLE GENAI CLIENT
// ============================================================

const ai = new GoogleGenAI({
  apiKey,
});


// ============================================================
// WAIT HELPER
// ============================================================

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};


// ============================================================
// CHECK IF ERROR IS TEMPORARY 503
// ============================================================

const isTemporaryGeminiError = (error) => {
  return (
    error?.status === 503 ||
    error?.response?.status === 503 ||
    error?.message?.includes('"code":503') ||
    error?.message?.includes("UNAVAILABLE") ||
    error?.message?.includes("high demand")
  );
};


// ============================================================
// GENERATE GEMINI CONTENT
// ============================================================

export const generateGeminiContent = async (
  prompt,
  options = {}
) => {

  // ----------------------------------------------------------
  // SETTINGS
  // ----------------------------------------------------------

  const selectedModel =
    options.model || model;

  const maxRetries = 2;

  let lastError = null;


  // ----------------------------------------------------------
  // TRY REQUEST
  // ----------------------------------------------------------

  for (
    let attempt = 0;
    attempt <= maxRetries;
    attempt++
  ) {

    try {

      console.log(
        `Gemini request attempt ${attempt + 1}/${maxRetries + 1}`
      );

      console.log(
        "Gemini model:",
        selectedModel
      );


      // ------------------------------------------------------
      // GEMINI REQUEST
      // ------------------------------------------------------

      const response =
        await ai.models.generateContent({

          model: selectedModel,

          contents: prompt,

          config: {

            // -----------------------------------------------
            // THINKING CONFIGURATION
            // -----------------------------------------------

            ...(options.thinkingLevel
              ? {
                  thinkingConfig: {
                    thinkingLevel:
                      options.thinkingLevel,
                  },
                }
              : {}),

            // -----------------------------------------------
            // RESPONSE MIME TYPE
            // -----------------------------------------------

            ...(options.responseMimeType
              ? {
                  responseMimeType:
                    options.responseMimeType,
                }
              : {}),
          },
        });


      // ------------------------------------------------------
      // SUCCESS
      // ------------------------------------------------------

      const text =
        response?.text || "";

      console.log(
        "Gemini response received successfully"
      );

      return text;


    } catch (error) {

      lastError = error;


      // ------------------------------------------------------
      // LOG ERROR
      // ------------------------------------------------------

      console.error(
        "================================="
      );

      console.error(
        "GEMINI API ERROR"
      );

      console.error(
        "Attempt:",
        attempt + 1
      );

      console.error(
        "Status:",
        error?.status
      );

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "=================================");


      // ------------------------------------------------------
      // RETRY ONLY FOR TEMPORARY 503 ERRORS
      // ------------------------------------------------------

      if (
        isTemporaryGeminiError(error) &&
        attempt < maxRetries
      ) {

        console.log(
          "Gemini temporarily unavailable."
        );

        console.log(
          "Retrying in 2 seconds..."
        );

        await wait(2000);

        continue;
      }


      // ------------------------------------------------------
      // STOP FOR OTHER ERRORS
      // ------------------------------------------------------

      break;
    }
  }


  // ==========================================================
  // ALL ATTEMPTS FAILED
  // ==========================================================

  console.error(
    "================================="
  );

  console.error(
    "GEMINI REQUEST FAILED"
  );

  console.error(
    "All retry attempts failed."
  );

  console.error(
    "================================="
  );


  // IMPORTANT:
  // Preserve the ORIGINAL Gemini error.
  //
  // This allows geminiController.js to detect:
  //
  // error.status === 503
  //
  // and return HTTP 503 to the frontend.

  throw lastError;
};
