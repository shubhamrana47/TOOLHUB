import { useState } from "react";
import NAVBAR from "../HOME/NAVBAR";
import Footer from "../HOME/Footer";
import Searchbar from "./Searchbar";

import {
  Search,
  FileText,
  Briefcase,
  ShoppingBag,
  BookOpen,
  Lightbulb,
} from "lucide-react";

// Features
const items = [
  {
    title: "SEO Keywords",
    desc: "Find relevant keywords for your content",
    icon: Search,
  },
  {
    title: "Content Ideas",
    desc: "Discover ideas for your next content",
    icon: FileText,
  },
  {
    title: "Business",
    desc: "Research keywords for your business",
    icon: Briefcase,
  },
  {
    title: "Shopping",
    desc: "Find keywords for products",
    icon: ShoppingBag,
  },
  {
    title: "Learning",
    desc: "Explore educational search terms",
    icon: BookOpen,
  },
];

const GEMINIRESPONSE = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);

  // Receive results from Searchbar
  const handleSearchResults = (searchedQuestion, keywords) => {
    setQuestion(searchedQuestion);

    // Make sure keywords is always an array
    setAnswer(Array.isArray(keywords) ? keywords : []);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= NAVBAR ================= */}
      <NAVBAR />

      {/* ================= SEARCHBAR ================= */}
      <Searchbar onSearchResults={handleSearchResults} />


       {answer.length > 0 && (
        <section className="w-full bg-gray-50 py-8 md:py-12">
          <div className="w-[95%] md:w-[90%] max-w-7xl mx-auto">
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-blue-100
                bg-white
                shadow-lg
              "
            >
              {/* ================= TABLE HEADER ================= */}
              <div
                className="
                  flex
                  flex-col
                  gap-2
                  border-b
                  border-gray-100
                  px-5
                  py-5
                  md:px-7
                "
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  SEO Keywords
                </h2>

                <p className="text-sm text-gray-500">
                  Search results for{" "}
                  <span className="font-semibold text-blue-600">
                    {question}
                  </span>
                </p>
              </div>

              {/* ================= TABLE ================= */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-sm">
                  {/* Table Head */}
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="w-16 px-4 py-4 text-center">
                        #
                      </th>

                      <th className="px-6 py-4 text-left">
                        Keyword
                      </th>

                      <th className="px-6 py-4 text-center">
                        Search Volume
                      </th>

                      <th className="px-6 py-4 text-center">
                        SEO Difficulty
                      </th>

                      <th className="px-6 py-4 text-center">
                        Competition
                      </th>

                      <th className="px-6 py-4 text-center">
                        CPC
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {answer.map((item, index) => (
                      <tr
                        key={index}
                        className={`
                          border-b
                          border-gray-100
                          transition
                          duration-200
                          hover:bg-blue-50
                          ${
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50"
                          }
                        `}
                      >
                        {/* Number */}
                        <td className="px-4 py-4 text-center font-semibold text-gray-600">
                          {index + 1}
                        </td>

                        {/* Keyword */}
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {item.keyword || "-"}
                        </td>

                        {/* Search Volume */}
                        <td className="px-6 py-4 text-center text-gray-700">
                          {item.searchVolume !== undefined
                            ? item.searchVolume.toLocaleString()
                            : "0"}
                        </td>

                        {/* SEO Difficulty */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className="
                              inline-block
                              rounded-full
                              bg-yellow-100
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-yellow-700
                            "
                          >
                            {item.seoDifficulty ?? 0}%
                          </span>
                        </td>

                        {/* Competition */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className="
                              inline-block
                              rounded-full
                              bg-green-100
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-green-700
                            "
                          >
                            {item.competition ?? 0}
                          </span>
                        </td>

                        {/* CPC */}
                        <td className="px-6 py-4 text-center font-semibold text-gray-700">
                          ₹
                          {item.cpc !== undefined
                            ? item.cpc.toLocaleString()
                            : "0"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= FEATURES SECTION ================= */}
      <section className="w-full bg-white py-10 md:py-12">
        {/* Divider */}
        <div className="w-[90%] max-w-7xl mx-auto flex items-center">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="mx-4 md:mx-6 text-sm md:text-base font-semibold text-gray-700 whitespace-nowrap">
            What you can find
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Features */}
        <div
          className="
            w-[90%]
            max-w-7xl
            mx-auto
            mt-8
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-4
            md:gap-5
          "
        >
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                  hover:border-blue-100
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                  "
                >
                  <Icon
                    size={24}
                    className="text-blue-600"
                  />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

       
        <div
          className="
            w-[90%]
            max-w-7xl
            mx-auto
            mt-8
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            px-5
            py-4
            text-center
            text-sm
            md:text-base
            text-blue-700
          "
        >
          <Lightbulb
            size={18}
            className="shrink-0"
          />

          <p>
            <strong>Tip:</strong> Use specific keywords to get more accurate
            results.
          </p>
        </div>
      </section>

  
      <Footer />
    </div>
  );
};

export default GEMINIRESPONSE;