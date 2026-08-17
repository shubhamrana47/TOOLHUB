import express from "express";
import { chatWithGemini,generateBlog } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/chat", chatWithGemini);
router.post("/generate-blog", generateBlog);

export default router;