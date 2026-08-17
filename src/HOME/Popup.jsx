
import img from "../assets/popup.jpg";

import {
  Search,
  FileText,
  Briefcase,
  ShoppingBag,
  BookOpen,
  MoreHorizontal,
  Lightbulb,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import useGeminiSearch from "../hooks/useGeminiSearch";

const items = [
  {
    icon: FileText,
    title: "Blog Posts",
    desc: "Helpful articles and guides",
  },
  {
    icon: Briefcase,
    title: "Services",
    desc: "Explore our services",
  },
  {
    icon: ShoppingBag,
    title: "Products",
    desc: "Browse our products",
  },
  {
    icon: BookOpen,
    title: "Resources",
    desc: "Useful resources and tools",
  },
  {
    icon: MoreHorizontal,
    title: "And More",
    desc: "Find more content easily",
  },
];

export default function Popup() {
  const {
    question,
    setQuestion,
    loading,
    handleSubmit: searchKeywords,
  } = useGeminiSearch();

  const navigate = useNavigate();

  // Handle search
  const handlePopupSubmit = async () => {
    const keywords = await searchKeywords();

    if (!keywords) return;

    navigate("/geminiResponse", {
      state: {
        question,
        answer: keywords,
      },
    });
  };

  return (
    <div className="w-full p-20">

      {/* Main Section */}
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Left Section */}
        <div>
          <h1 className="text-5xl font-bold text-gray-900">
            Search Any{" "}
            <span className="text-blue-600">Keyword</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Find the information you're looking for quickly.
          </p>

          <p className="mt-4 text-gray-500">
            Search our website for services, blogs, products or resources.
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row">

            <div className="flex flex-1 items-center rounded-xl border border-gray-300 px-4">

              <Search
                className="text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePopupSubmit();
                  }
                }}
                placeholder="Enter Keywords..."
                className="w-full px-3 py-4 outline-none"
              />

            </div>

            <button
              onClick={handlePopupSubmit}
              disabled={loading}
              className={`rounded-xl px-8 py-4 font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Searching..." : "Search Now →"}
            </button>

          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">

          <div className="relative flex h-72 w-72 items-center justify-center">

            {/* Glow */}
            <div className="absolute h-64 w-64 rounded-full bg-blue-100 blur-3xl"></div>

            {/* Image */}
            <div className="relative w-[95%] border-blue-600 bg-white shadow-lg">
              <img
                src={img}
                alt="Search illustration"
                className="h-auto w-[500px] object-contain"
              />
            </div>

            {/* Blue Decoration */}
            <div className="absolute bottom-16 right-10 h-28 w-5 rotate-45 rounded-full bg-blue-600"></div>

          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="my-10 flex items-center">

        <div className="h-px flex-1 bg-gray-200"></div>

        <span className="mx-5 font-semibold text-gray-700">
          What you can find
        </span>

        <div className="h-px flex-1 bg-gray-200"></div>

      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center border-r border-gray-200 text-center last:border-none"
            >
              <div className="mb-4 rounded-full bg-blue-50 p-4">
                <Icon
                  className="text-blue-600"
                  size={24}
                />
              </div>

              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {item.desc}
              </p>
            </div>
          );
        })}

      </div>

      {/* Tip */}
      <div className="mt-10 flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-6 py-4 text-blue-700">

        <Lightbulb size={18} />

        <p>
          <strong>Tip:</strong> Use specific keywords to get more accurate
          results.
        </p>

      </div>

    </div>
  );
}





