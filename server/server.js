import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import geminiRoutes from "./routes/geminiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

console.log(
  "Mongo URI exists:",
  !!process.env.MONGO_URI
);

const app = express();

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
       "http://localhost:5174",
      "https://toolhub-mauve-two.vercel.app",
      "https://toolhubsite.vercel.app",
        "https://www.pgiendocrinology.com",
        "https://pgiendocrinology.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

// =========================================================
// ROUTES
// =========================================================

// AUTH
app.use(
  "/api/auth",
  authRoutes
);

// REVIEWS
app.use(
  "/api/reviews",
  reviewRoutes
);

// GEMINI
app.use(
  "/api/gemini",
  geminiRoutes
);

// WEBSITE AUDIT
app.use(
  "/api/audit",
  auditRoutes
);

// =========================================================
// HOME
// =========================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ToolHub Backend is running",
  });
});

// =========================================================
// DATABASE
// =========================================================

connectDB();

// =========================================================
// SERVER
// =========================================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
     console.log(`Server running on port ${PORT}`);
  console.log(`Audit API mounted at /api/audit`);
    

    console.log(
      `Audit API: /api/audit`
    );
  }
);