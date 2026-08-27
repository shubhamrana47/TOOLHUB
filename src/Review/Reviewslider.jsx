import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

const Reviewslider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] =
    useState(true);

  // =========================================================
  // FETCH REVIEWS
  // =========================================================

  const getReviews = async () => {
    try {
           console.log(
      "VITE_API_URL =",
      import.meta.env.VITE_API_URL
    );
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/getReview`
      );

      console.log("Reviews:", response.data);

      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(
        "Error in review slider:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Error in fetching reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH REVIEWS ON PAGE LOAD
  // =========================================================

  useEffect(() => {
    getReviews();
  }, []);

  // =========================================================
  // INFINITE REVIEWS
  // =========================================================

  const infiniteReviews = [
    ...reviews,
    ...reviews,
  ];

  // =========================================================
  // AUTOMATIC SLIDER
  // =========================================================

  useEffect(() => {
    if (reviews.length <= 2) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => prev + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [reviews.length]);

  // =========================================================
  // RESET INFINITE LOOP
  // =========================================================

  useEffect(() => {
    if (
      currentIndex === reviews.length
    ) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 1200);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [
    currentIndex,
    reviews.length,
  ]);

  // =========================================================
  // NEXT
  // =========================================================

  const nextReview = () => {
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      if (
        prev >= reviews.length
      ) {
        return 0;
      }

      return prev + 1;
    });
  };

  // =========================================================
  // PREVIOUS
  // =========================================================

  const previousReview = () => {
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      if (prev === 0) {
        return reviews.length - 1;
      }

      return prev - 1;
    });
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="py-16 text-center">
          <p className="text-base text-gray-500 sm:text-lg">
            Loading reviews...
          </p>
        </div>
      </section>
    );
  }

  // =========================================================
  // NO REVIEWS
  // =========================================================

  if (reviews.length === 0) {
    return (
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="py-16 text-center">
          <p className="text-base text-gray-500 sm:text-lg">
            No reviews available yet.
          </p>
        </div>
      </section>
    );
  }

  // =========================================================
  // ONLY ONE REVIEW
  // =========================================================

  if (reviews.length === 1) {
    return (
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto w-full max-w-3xl">

          <ReviewHeading />

          <ReviewCard
            review={reviews[0]}
          />

        </div>

      </section>
    );
  }

  // =========================================================
  // MAIN COMPONENT
  // =========================================================

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

      <div className="mx-auto w-full max-w-6xl">

        {/* =================================================
            HEADING
        ================================================= */}

        <ReviewHeading />

        {/* =================================================
            SLIDER
        ================================================= */}

        <div className="relative px-0 sm:px-6 md:px-8 lg:px-10">

          {/* VIEWPORT */}

          <div className="overflow-hidden">

            {/* TRACK */}

            <div
              className={`flex ${
                isTransitioning
                  ? "transition-transform duration-[1200ms] ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(-${
                  currentIndex * 50
                }%)`,
              }}
            >

              {infiniteReviews.map(
                (review, index) => (
                  <div
                    key={`${review._id}-${index}`}
                    className="
                      w-1/2
                      shrink-0
                      px-2
                      sm:px-3
                    "
                  >

                    <ReviewCard
                      review={review}
                    />

                  </div>
                )
              )}

            </div>

          </div>

          {/* =================================================
              PREVIOUS BUTTON
          ================================================= */}

          <button
            onClick={previousReview}
            aria-label="Previous reviews"
            className="
              absolute
              left-0
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-blue-100
              bg-white
              text-blue-600
              shadow-lg
              transition-all
              duration-300
              hover:bg-blue-600
              hover:text-white
              sm:h-10
              sm:w-10
              md:left-1
              lg:left-0
            "
          >
            <ChevronLeft
              size={20}
            />
          </button>

          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          <button
            onClick={nextReview}
            aria-label="Next reviews"
            className="
              absolute
              right-0
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-blue-100
              bg-white
              text-blue-600
              shadow-lg
              transition-all
              duration-300
              hover:bg-blue-600
              hover:text-white
              sm:h-10
              sm:w-10
              md:right-1
              lg:right-0
            "
          >
            <ChevronRight
              size={20}
            />
          </button>

        </div>

        {/* =================================================
            DOTS
        ================================================= */}

        <div className="mt-8 flex justify-center gap-2 sm:mt-10">

          {reviews.map(
            (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(
                    true
                  );

                  setCurrentIndex(
                    index
                  );
                }}
                aria-label={`Go to review ${
                  index + 1
                }`}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    currentIndex %
                      reviews.length ===
                    index
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-blue-200"
                  }
                `}
              />
            )
          )}

        </div>

      </div>

    </section>
  );
};

// =========================================================
// HEADING
// =========================================================

const ReviewHeading = () => {
  return (
    <div className="mb-10 px-2 text-center sm:mb-12 md:mb-14">

      {/* BADGE */}

      <div className="mx-auto inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2">

        <p className="
          text-xs
          font-bold
          uppercase
          tracking-[0.2em]
          text-blue-600
          sm:text-sm
          sm:tracking-[0.25em]
        ">
          Testimonials
        </p>

      </div>

      {/* TITLE */}

      <h2
        className="
          mt-4
          text-3xl
          font-extrabold
          leading-tight
          tracking-[-1px]
          text-gray-900
          sm:text-3xl
          sm:tracking-[-1.5px]
          md:text-4xl
          lg:text-5xl
          lg:tracking-[-2px]
        "
      >
        What Our  <span className="text-blue-600"> Users Say</span> 
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mx-auto
          mt-4
          max-w-2xl
          text-base
          leading-7
          text-gray-500
          sm:mt-5
          sm:text-lg
          sm:leading-8
          md:text-xl
        "
      >
        See what our users think about
        our platform.
      </p>

    </div>
  );
};

// =========================================================
// REVIEW CARD
// =========================================================

const ReviewCard = ({
  review,
}) => {
  return (
    <div
      className="
        flex
        min-h-[300px]
        flex-col
        rounded-3xl
        border
        border-blue-100
        bg-gradient-to-br
        from-blue-50
        via-white
        to-white
        p-5
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
        sm:min-h-[320px]
        sm:p-6
        md:min-h-[330px]
        md:p-7
      "
    >

      {/* =================================================
          USER
      ================================================= */}

      <div className="flex items-center gap-3">

        {/* AVATAR */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-100
            text-base
            font-bold
            text-blue-600
            sm:h-12
            sm:w-12
            sm:text-lg
          "
        >
          {review.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        {/* USER INFO */}

        <div className="min-w-0">

          <h3
            className="
              truncate
              text-sm
              font-bold
              text-gray-900
              sm:text-base
            "
          >
            {review.name}
          </h3>

          <p className="mt-0.5 text-xs text-gray-400">
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

      {/* =================================================
          STARS
      ================================================= */}

      <div className="mt-5 flex gap-1">

        {[1, 2, 3, 4, 5].map(
          (star) => (
            <Star
              key={star}
              size={18}
              className={
                star <=
                review.rating
                  ? "fill-blue-500 text-blue-500"
                  : "text-gray-300"
              }
            />
          )
        )}

      </div>

      {/* =================================================
          REVIEW
      ================================================= */}

      <div className="mt-5 flex flex-1 items-center">

        <p
          className="
            text-sm
            leading-7
            text-gray-600
            sm:text-base
            sm:leading-8
            md:text-[17px]
          "
        >
          "{review.review}"
        </p>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="mt-5 border-t border-blue-100 pt-4">

        <span
          className="
            text-xs
            font-semibold
            text-blue-600
            sm:text-sm
          "
        >
          Verified User
        </span>

      </div>

    </div>
  );
};

export default Reviewslider;
