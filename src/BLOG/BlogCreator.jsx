
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useGenerateBlog from "../hooks/useGenerateBlog";

const BlogCreator = () => {
  const location = useLocation();

  const question = location.state?.question || "";
  const keywords = location.state?.keywords || [];

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [customKeywords, setCustomKeywords] = useState([]);
  const [wordLimit, setWordLimit] = useState("");

  const {
    blog,
    loading,
    generateBlog,
  } = useGenerateBlog();


  const handleKeywordSelect = (keyword) => {
    setSelectedKeywords((prev) => {
      if (prev.includes(keyword)) {
        return prev.filter((item) => item !== keyword);
      }

      return [...prev, keyword];
    });
  };



  const handleAddCustomKeyword = () => {
    const keyword = customKeyword.trim();

    if (!keyword) return;

    if (
      selectedKeywords.includes(keyword) ||
      customKeywords.includes(keyword)
    ) {
      setCustomKeyword("");
      return;
    }

    setCustomKeywords((prev) => [
      ...prev,
      keyword,
    ]);

    setCustomKeyword("");
  };


  const handleRemoveCustomKeyword = (keyword) => {
    setCustomKeywords((prev) =>
      prev.filter((item) => item !== keyword)
    );
  };


  const handleGenerateBlog = async () => {
    const allKeywords = [
      ...selectedKeywords,
      ...customKeywords,
    ];

    console.log("Topic:", question);
    console.log(
      "Keywords sent to blog API:",
      allKeywords
    );

    if (!question) {
      alert("Topic is missing.");
      return;
    }

    if (allKeywords.length === 0) {
      alert(
        "Please select or add at least one keyword."
      );
      return;
    }

    if (!wordLimit || wordLimit < 100) {
      alert("Please enter a valid word limit.");
      return;
    }

    await generateBlog(
      question,
      allKeywords,
      wordLimit
    );
  };


  return (
    <div className="min-h-screen bg-white">

      <div className="mx-auto flex items-start gap-7 p-7">
   

        <div className="w-[30%] rounded-2xl border border-gray-200 p-3">

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-900">
              Select Keywords
            </h2>

            <p className="mt-2 text-gray-500">
              Select the keywords you want to include
              in your blog.
            </p>


            <div className="mt-5 space-y-3">

              {keywords.length === 0 ? (

                <p className="text-gray-500">
                  No keywords found.
                </p>

              ) : (

                keywords.map((item, index) => {

                  const keyword =
                    typeof item === "string"
                      ? item
                      : item.keyword;

                  const selected =
                    selectedKeywords.includes(
                      keyword
                    );

                  return (
                    <label
                      key={index}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl transition ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >

                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          handleKeywordSelect(
                            keyword
                          )
                        }
                        className="h-5 w-5 accent-blue-600"
                      />

                      <span className="font-medium text-gray-800">
                        {keyword}
                      </span>

                    </label>
                  );
                })

              )}

            </div>

          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-900">
              Add Custom Keyword
            </h2>

            <div className="mt-4 flex gap-3">

              <input
                type="text"
                value={customKeyword}
                onChange={(e) =>
                  setCustomKeyword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCustomKeyword();
                  }
                }}
                placeholder="Enter your custom keyword..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={handleAddCustomKeyword}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Add
              </button>

            </div>


            {/* Custom Keywords */}

            {customKeywords.length > 0 && (

              <div className="mt-4 flex flex-wrap gap-2">

                {customKeywords.map(
                  (keyword, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700"
                    >

                      <span>
                        {keyword}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveCustomKeyword(
                            keyword
                          )
                        }
                        className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-red-500 hover:bg-blue-100"
                      >
                        ×
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* ==========================================
              WORD LIMIT
          ========================================== */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-900">
              Blog Word Limit
            </h2>

            <p className="mt-2 text-gray-500">
              Set the maximum number of words for your blog.
            </p>


            <input
              type="number"
              min="100"
              max="10000"
              value={wordLimit}
              onChange={(e) =>
                setWordLimit(Number(e.target.value))
              }
              className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              placeholder="Enter word limit"
            />

          </div>


          {/* ==========================================
              GENERATE BLOG BUTTON
          ========================================== */}

          <button
            type="button"
            onClick={handleGenerateBlog}
            disabled={loading}
            className={`mt-8 w-full rounded-xl py-4 font-bold text-white transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Generating Blog..."
              : "Generate Blog →"}
          </button>

        </div>


        {/* ==========================================
            RIGHT SIDE - GENERATED BLOG
        ========================================== */}

        <div className="w-[70%]">

          <div className="sticky top-6 h-[calc(100vh-3rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Blog Header */}

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

              <h2 className="text-2xl font-bold text-gray-900">
                Generated Blog
              </h2>


              {blog && (

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(blog);
                    alert("Blog copied!");
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Copy Blog
                </button>

              )}

            </div>


            {/* Scrollable Blog Content */}

            <div className="h-[calc(100%-73px)] overflow-y-auto p-8">

              {blog ? (

                <div className="whitespace-pre-wrap leading-8 text-gray-700">
                  {blog}
                </div>

              ) : (

                <div className="flex h-full items-center justify-center text-gray-400">

                  <p>
                    Your generated blog will appear here.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BlogCreator;
