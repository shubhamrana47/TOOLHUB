import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import geminiRoutes from "./routes/geminiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import pluginRoutes from "./routes/pluginRoutes.js";

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

app.use(
  express.json({
    limit: "10mb",
  })
);

// =========================================================
// ROUTES
// =========================================================

// AUTH
app.use(
  "/api/auth",
  authRoutes
);

// WORDPRESS PLUGIN GENERATOR
app.use(
  "/api/plugin",
  pluginRoutes
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
// HEALTH CHECK
// =========================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    backend: true,
    message: "Backend is healthy",
  });
});

// =========================================================
// 404
// =========================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// =========================================================
// DATABASE
// =========================================================

connectDB();

// =========================================================
// SERVER
// =========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log("🚀 TOOLHUB BACKEND");
  console.log("========================================");
  console.log(
    `🌐 Server:       http://localhost:${PORT}`
  );
  console.log(
    `🏠 Home:         http://localhost:${PORT}/`
  );
  console.log(
    `❤️ Health:       http://localhost:${PORT}/api/health`
  );
  console.log(
    `🔐 Auth API:     http://localhost:${PORT}/api/auth`
  );
  console.log(
    `🔌 Plugin API:   http://localhost:${PORT}/api/plugin`
  );
  console.log(
    `⭐ Reviews API:  http://localhost:${PORT}/api/reviews`
  );
  console.log(
    `🤖 Gemini API:   http://localhost:${PORT}/api/gemini`
  );
  console.log(
    `🔍 Audit API:    http://localhost:${PORT}/api/audit`
  );
  console.log("========================================");
  console.log("");
});