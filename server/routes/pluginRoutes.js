import express from "express";

import {
  analyzePlugin,
  generatePlugin,
} from "../controllers/pluginController.js";

const router = express.Router();

// =========================================================
// ANALYZE PLUGIN
// =========================================================

router.post(
  "/analyze",
  analyzePlugin
);

// =========================================================
// GENERATE PLUGIN
// =========================================================

router.post(
  "/generate",
  generatePlugin
);

export default router;