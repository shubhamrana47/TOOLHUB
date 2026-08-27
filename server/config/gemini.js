import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();


// ============================================================
// GEMINI CONFIGURATION
// ============================================================

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});


// ============================================================
// MODEL CONFIGURATION
// ============================================================
//
// First model = fastest
// Second model = fallback
// Third model = stronger fallback
//
// IMPORTANT:
// Your Google API key must have access to these models.
//

const DEFAULT_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash",
];


// ============================================================
// TIMEOUT CONFIGURATION
// ============================================================
//
// Keywords:
// Each model gets 10 seconds.
//
// Blog:
// Each model gets 30 seconds.
//

const KEYWORD_TIMEOUT = 10000;

const BLOG_TIMEOUT = 30000;


// ============================================================
// GET MODELS
// ============================================================

const getModels = (options = {}) => {

  // If a specific model is supplied,
  // use only that model.

  if (options.model) {
    return [options.model];
  }

  // Otherwise use fallback chain.

  return DEFAULT_MODELS;
};


// ============================================================
// TIMEOUT HELPER
// ============================================================

const withTimeout = async (
  promise,
  timeout,
  model
) => {

  let timeoutId;

  const timeoutPromise = new Promise(
    (_, reject) => {

      timeoutId = setTimeout(() => {

        const error = new Error(
          `Gemini model ${model} timed out after ${timeout}ms`
        );

        error.code = "GEMINI_TIMEOUT";
        error.status = 408;
        error.model = model;

        reject(error);

      }, timeout);
    }
  );

  try {

    return await Promise.race([
      promise,
      timeoutPromise,
    ]);

  } finally {

    clearTimeout(timeoutId);
  }
};


// ============================================================
// CHECK TEMPORARY GEMINI ERROR
// ============================================================

const isTemporaryGeminiError = (
  error
) => {

  return (
    error?.status === 408 ||
    error?.status === 429 ||
    error?.status === 500 ||
    error?.status === 502 ||
    error?.status === 503 ||
    error?.status === 504 ||

    error?.response?.status === 408 ||
    error?.response?.status === 429 ||
    error?.response?.status === 500 ||
    error?.response?.status === 502 ||
    error?.response?.status === 503 ||
    error?.response?.status === 504 ||

    error?.code === "GEMINI_TIMEOUT" ||

    error?.message?.includes(
      '"code":503'
    ) ||

    error?.message?.includes(
      "UNAVAILABLE"
    ) ||

    error?.message?.includes(
      "high demand"
    ) ||

    error?.message?.includes(
      "timed out"
    )
  );
};


// ============================================================
// GENERATE CONTENT WITH MODEL FALLBACK
// ============================================================

export const generateGeminiContent = async (
  prompt,
  options = {}
) => {

  const models = getModels(options);

  const timeout =
    options.timeout ||
    BLOG_TIMEOUT;


  console.log(
    "================================="
  );

  console.log(
    "GEMINI REQUEST"
  );

  console.log(
    "Models:",
    models
  );

  console.log(
    "Timeout:",
    timeout,
    "ms"
  );

  console.log(
    "================================="
  );


  let lastError = null;


  // ==========================================================
  // TRY EACH MODEL
  // ==========================================================

  for (
    let i = 0;
    i < models.length;
    i++
  ) {

    const currentModel =
      models[i];


    console.log(
      `Trying Gemini model ${i + 1}/${models.length}:`,
      currentModel
    );


    try {

      // ------------------------------------------------------
      // START GEMINI REQUEST
      // ------------------------------------------------------

      const request =
        ai.models.generateContent({

          model: currentModel,

          contents: prompt,

          config: {

            // -----------------------------------------------
            // THINKING CONFIG
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
            // JSON RESPONSE
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
      // APPLY TIMEOUT
      // ------------------------------------------------------

      const response =
        await withTimeout(
          request,
          timeout,
          currentModel
        );


      // ------------------------------------------------------
      // GET TEXT
      // ------------------------------------------------------

      const text =
        response?.text || "";


      // ------------------------------------------------------
      // EMPTY RESPONSE
      // ------------------------------------------------------

      if (!text.trim()) {

        throw new Error(
          `Gemini model ${currentModel} returned an empty response`
        );
      }


      // ------------------------------------------------------
      // SUCCESS
      // ------------------------------------------------------

      console.log(
        "================================="
      );

      console.log(
        "GEMINI SUCCESS"
      );

      console.log(
        "Model used:",
        currentModel
      );

      console.log(
        "================================="
      );


      return text;


    } catch (error) {

      lastError = error;


      console.error(
        "================================="
      );

      console.error(
        "GEMINI MODEL FAILED"
      );

      console.error(
        "Model:",
        currentModel
      );

      console.error(
        "Status:",
        error?.status
      );

      console.error(
        "Code:",
        error?.code
      );

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "================================="
      );


      // ------------------------------------------------------
      // CHECK IF ANOTHER MODEL SHOULD BE TRIED
      // ------------------------------------------------------

      const hasNextModel =
        i < models.length - 1;


      if (
        hasNextModel &&
        (
          isTemporaryGeminiError(error) ||
          error?.status === 404
        )
      ) {

        console.log(
          "Switching to next Gemini model..."
        );

        continue;
      }


      // ------------------------------------------------------
      // IF NO FALLBACK
      // ------------------------------------------------------

      if (!hasNextModel) {

        break;
      }


      // ------------------------------------------------------
      // OTHER ERROR
      // ------------------------------------------------------

      console.log(
        "Gemini request failed."
      );

      console.log(
        "Trying next model..."
      );
    }
  }


  // ==========================================================
  // ALL MODELS FAILED
  // ==========================================================

  console.error(
    "================================="
  );

  console.error(
    "ALL GEMINI MODELS FAILED"
  );

  console.error(
    "================================="
  );


  // IMPORTANT:
  // Preserve the final/original Gemini error.
  //
  // Your controller can inspect:
  //
  // error.status
  //
  // and return HTTP 503 to frontend.

  throw lastError;
};


// ============================================================
// OPTIONAL EXPORT
// ============================================================
//
// Useful for debugging.
//

export const getGeminiModels = () => {
  return [...DEFAULT_MODELS];
};