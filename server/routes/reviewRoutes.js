import express from "express";

import {
  createReview,
  getReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// POST review
router.post("/createReview", createReview);

// GET reviews
router.get("/getReview", getReviews);

export default router;