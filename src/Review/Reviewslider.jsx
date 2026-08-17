import axios from "axios";
import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

const Reviewslider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

 
  const getReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reviews/getReview"
      );

      console.log("Reviews:", response.data);

      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log("Error in review slider:", error);

      toast.error(
        error.response?.data?.message ||
          "Error in fetching reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH REVIEWS ON PAGE LOAD
  // =========================
  useEffect(() => {
    getReviews();
  }, []);

  // =========================
  // AUTOMATIC SLIDER
  // =========================
  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // =========================
  // NEXT REVIEW
  // =========================
  const nextReview = () => {
    setCurrentIndex((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  // =========================
  // PREVIOUS REVIEW
  // =========================
  const previousReview = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">
          Loading reviews...
        </p>
      </div>
    );
  }

  // =========================
  // NO REVIEWS
  // =========================
  if (reviews.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">
          No reviews available yet.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-2xl">

        {/* =========================
            HEADING
        ========================= */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Testimonials
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Users Say
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            See what our users think about our platform.
          </p>
        </div>

        {/* =========================
            SLIDER
        ========================= */}
        <div className="relative">

          {/* Viewport */}
          <div className="overflow-hidden rounded-3xl">

            {/* Sliding Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >

              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="min-w-full"
                >

                  {/* Review Card */}
                  <div className="border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-8 py-8 shadow-lg md:px-16">

                    {/* User */}
                    <div className="flex flex-col items-center">

                      {/* Avatar */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                        {review.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      {/* Name */}
                      <h3 className="mt-3 font-semibold text-gray-900">
                        {review.name}
                      </h3>

                      {/* Date */}
                      <p className="mt-1 text-sm text-gray-400">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    {/* Stars */}
                    <div className="mt-5 flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={22}
                          className={
                            star <= review.rating
                              ? "fill-blue-500 text-blue-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600">
                      "{review.review}"
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* =========================
              PREVIOUS BUTTON
          ========================= */}
          {reviews.length > 1 && (
            <button
              onClick={previousReview}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-600 shadow-md transition duration-300 hover:bg-blue-600 hover:text-white md:-left-5"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* =========================
              NEXT BUTTON
          ========================= */}
          {reviews.length > 1 && (
            <button
              onClick={nextReview}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-600 shadow-md transition duration-300 hover:bg-blue-600 hover:text-white md:-right-5"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {/* =========================
            DOTS
        ========================= */}
        {reviews.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-7 bg-blue-600"
                    : "w-2.5 bg-blue-200"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Reviewslider;

