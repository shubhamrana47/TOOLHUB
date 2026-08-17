import Review from "../model/reviewModel.js"
export const createReview = async (req, res) => {
  try {
    const { name, email, rating, review } = req.body;

    // Validation
    if (!name || !email || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create review
    const newReview = await Review.create({
      name,
      email,
      rating,
      review,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL REVIEWS
// ===============================
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};