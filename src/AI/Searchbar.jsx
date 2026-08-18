import { useState } from "react";
import axios from "axios";
import { Search, Sparkles } from "lucide-react";

const Searchbar = ({ onSearchResults }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gemini/chat`,
        {
          prompt: `${question} seo keywords`,
        }
      );

      console.log("API RESPONSE:", response.data);

      onSearchResults(
        question,
        response.data.keywords
      );
    } catch (error) {
      console.error(
        "Gemini API Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        border-b
        border-blue-100
        bg-white
        bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.10),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(79,70,229,0.08),transparent_35%),linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_45%,#EEF4FF_75%,#FFFFFF_100%)]
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-blue-300/10
          blur-3xl
          sm:h-80
          sm:w-80
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-10
          h-72
          w-72
          rounded-full
          bg-indigo-300/10
          blur-3xl
          sm:h-80
          sm:w-80
        "
      />

      {/* Main Content */}
      <div
        className="
          relative
          mx-auto
          w-full
          px-4
          py-10
          sm:px-6
          sm:py-12
          md:px-10
          md:py-16
        "
      >

        {/* Badge */}
        <div className="mb-5 flex justify-center sm:mb-6">
          <span
            className="
              inline-flex
              max-w-[90%]
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-white/80
              px-3
              py-1.5
              text-xs
              font-medium
              text-blue-700
              shadow-sm
              backdrop-blur-sm
              sm:px-4
              sm:py-2
              sm:text-sm
            "
          >
            <Sparkles
              size={14}
              className="shrink-0 text-orange-400 sm:h-4 sm:w-4"
            />

            AI SEO Keyword Research
          </span>
        </div>

        {/* Heading */}
        <h1
          className="
            mx-auto
            w-full
            px-1
            text-center
            text-[clamp(34px,9vw,64px)]
            font-normal
            leading-[1.08]
            tracking-[-1.5px]
            text-[#101828]
            sm:px-2
            sm:tracking-[-2px]
          "
        >
          Discover the Right{" "}
          <span className="text-blue-600">
            SEO Keywords
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            px-2
            text-center
            text-sm
            leading-6
            text-gray-500
            sm:mt-5
            sm:px-4
            sm:text-base
            md:text-lg
            md:leading-7
          "
        >
          Enter a keyword and discover valuable SEO keywords,
          search volume, competition, difficulty, and CPC.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="
            mx-auto
            mt-7
            w-full
            max-w-4xl
            px-0
            sm:mt-8
            sm:px-2
          "
        >
          <div
            className="
              flex
              w-full
              items-center
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-1.5
              shadow-[0_8px_30px_rgba(31,67,125,0.10)]
              transition-all
              duration-200
              focus-within:border-blue-300
              focus-within:ring-4
              focus-within:ring-blue-100
            "
          >
            {/* Search Icon */}
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                sm:h-11
                sm:w-11
              "
            >
              <Search
                size={19}
                strokeWidth={2}
                className="text-blue-600 sm:h-[21px] sm:w-[21px]"
              />
            </div>

            {/* Input */}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a keyword, topic, or phrase..."
              className="
                min-w-0
                flex-1
                bg-transparent
                px-3
                py-2.5
                text-sm
                text-gray-800
                outline-none
                placeholder:text-gray-400
                sm:px-4
                sm:py-3
                sm:text-[15px]
              "
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-10
                shrink-0
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-blue-600
                px-3
                text-xs
                font-semibold
                text-white
                shadow-sm
                shadow-blue-600/20
                transition-all
                duration-200
                hover:bg-blue-700
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:h-11
                sm:gap-2
                sm:px-5
                sm:text-sm
                md:h-12
                md:px-6
              "
            >
              <Search
                size={16}
                className="sm:h-[17px] sm:w-[17px]"
              />

              <span>
                {loading ? "Searching..." : "Search"}
              </span>

              <span className="hidden md:inline">
                →
              </span>
            </button>
          </div>
        </form>

        {/* Features */}
        <div
          className="
            mx-auto
            mt-5
            flex
            max-w-4xl
            flex-wrap
            items-center
            justify-center
            gap-x-4
            gap-y-2
            px-2
            text-xs
            text-gray-500
            sm:mt-6
            sm:gap-x-6
            sm:text-sm
          "
        >
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-gray-400">✓</span>
            SEO Analysis
          </span>

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-gray-400">✓</span>
            Search Volume
          </span>

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-gray-400">✓</span>
            SEO Difficulty
          </span>

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-gray-400">✓</span>
            Competition
          </span>

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-gray-400">✓</span>
            CPC
          </span>
        </div>

      </div>
    </section>
  );
};

export default Searchbar;