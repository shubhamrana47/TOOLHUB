import { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD REVIEW
  // =========================
  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.review.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reviews/createReview`,
        {
          name: formData.name,
          email: formData.email,
          rating: rating,
          review: formData.review,
        }
      );

      if (response.data.success) {
        toast.success("Review added successfully!");

        // Clear form
        setFormData({
          name: "",
          email: "",
          review: "",
        });

        setRating(0);
        setHoverRating(0);
      }
    } catch (error) {
      console.error("ADD REVIEW ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add review"
      );
    } finally {
      setLoading(false);
    }
  };

  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      review:
        "This tool is very easy to use and helped me generate useful SEO keywords quickly.",
      date: "2 days ago",
    },
    {
      name: "Priya Singh",
      rating: 4,
      review:
        "Really good experience. The interface is clean and the results are helpful.",
      date: "1 week ago",
    },
    {
      name: "Aman Verma",
      rating: 5,
      review:
        "I really liked the simplicity of the website. Everything works smoothly.",
      date: "2 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Customer Reviews
          </p>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            What Our Users Say
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Your feedback helps us improve our tools and provide a
            better experience for everyone.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Review Form */}
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg lg:col-span-2 md:p-8">

            <h2 className="text-2xl font-bold text-gray-900">
              Share Your Experience
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tell us what you think about our website.
            </p>

            {/* Rating */}
            <div className="mt-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Your Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-blue-500 text-blue-500"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Review */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Your Review
              </label>

              <textarea
                rows="5"
                name="review"
                value={formData.review}
                onChange={handleChange}
                placeholder="Write your review here..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleAddReview}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {loading ? "Adding Review..." : "Add Review"}
            </button>
          </div>

          {/* Rating Summary */}
          <div className="rounded-3xl bg-blue-600 p-7 text-white shadow-lg">
            <p className="text-sm font-medium text-blue-100">
              Overall Rating
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-5xl font-bold">
                4.8
              </span>

              <div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className="fill-white text-white"
                    />
                  ))}
                </div>

                <p className="mt-1 text-sm text-blue-100">
                  Based on 250+ reviews
                </p>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="mt-8 space-y-4">
              {[5, 4, 3, 2, 1].map((number, index) => (
                <div
                  key={number}
                  className="flex items-center gap-3"
                >
                  <span className="w-3 text-sm">
                    {number}
                  </span>

                  <Star
                    size={15}
                    className="fill-white text-white"
                  />

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-blue-400">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{
                        width: `${[90, 65, 30, 10, 5][index]}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-blue-500/50 p-5">
              <p className="text-sm leading-6 text-blue-50">
                "We appreciate every review. Your feedback helps
                us make our tools better."
              </p>
            </div>
          </div>
        </div>

       

        

      </div>
    </div>
  );
};

export default ReviewForm;