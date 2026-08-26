import React from "react";
import {
  Search,
  FileText,
  Globe,
  ArrowRight,
  ShieldCheck,
  Code2Icon,
  MessageSquareCode,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    number: "01",
    icon: Search,
    title: "Search Keywords",
    description:
      "Discover high-value keywords with search volume, competition, CPC and more to target the right audience.",
    button: "Explore Keywords",
    path: "/geminiResponse",
  },
  {
    number: "02",
    icon: FileText,
    title: "Create a Blog",
    description:
      "Generate SEO-friendly, engaging blogs in seconds using AI. Just add keywords, and let us do the writing for you.",
    button: "Create Blog",
    path: "/blog",
  },
  {
    number: "03",
    icon: Globe,
    title: "Website Audit",
    description:
      "Analyze your website's performance, SEO score, speed, security and get actionable insights to improve.",
    button: "Audit Now",
    path: "/websiteaudit",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Image Convertor",
    description: "Tool for converting image online easily",
    button: "Convert Now",
    path: "/imageconvertor",
  },
  {
    number: "05",
    icon: MessageSquareCode,
    title: "Document Convertor",
    description:
      "Tool for converting Document online at a ease",
    button: "Convert DOC Now",
    path: "/documentconvertor",
  },
  {
    number: "06",
    icon: Code2Icon,
    title: "Code Formatter",
    description: "Tool for formatting code",
    button: "Format Code",
    path: "/codeformatter",
  },
];

const HomeTools = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-10">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
              <Wrench
                size={21}
                strokeWidth={2}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                All-in-One Platform
              </p>

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Powerful Tools to Grow Your Online Presence
              </h2>
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
            From keyword research to content creation and website optimization,
            everything you need is in one place.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.number}
                className="
                  group
                  relative
                  min-h-[180px]
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-[0_4px_18px_rgba(15,23,42,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)]
                "
              >

                {/* Top Row */}
                <div className="flex items-start justify-between">

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-blue-100
                      bg-blue-50
                      transition-all
                      duration-300
                      group-hover:bg-blue-600
                    "
                  >
                    <Icon
                      size={21}
                      strokeWidth={2}
                      className="text-blue-600 transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  {/* Number */}
                  <div
                    className="
                      flex
                      h-6
                      min-w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-50
                      px-2
                      text-[10px]
                      font-bold
                      text-blue-600
                    "
                  >
                    {tool.number}
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3">

                  <h3 className="text-[15px] font-bold leading-5 text-slate-800">
                    {tool.title}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate-500">
                    {tool.description}
                  </p>

                </div>

                {/* Button */}
                <button
                  onClick={() => navigate(tool.path)}
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-md
                    bg-blue-600
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-white
                    shadow-sm
                    shadow-blue-200
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    hover:shadow-md
                  "
                >
                  {tool.button}

                  <ArrowRight
                    size={12}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>

              </div>
            );
          })}

        </div>

        {/* Bottom Message */}
        <div className="mt-8 flex items-center gap-4">

          <div className="hidden h-px flex-1 bg-slate-200 sm:block" />

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 sm:text-sm">

            <ShieldCheck
              size={18}
              className="text-blue-600"
            />

            <span>
              Smart Tools.
            </span>

            <span className="text-blue-600">
              Better Content.
            </span>

            <span>
              Stronger Rankings.
            </span>

          </div>

          <div className="hidden h-px flex-1 bg-slate-200 sm:block" />

        </div>

      </div>
    </section>
  );
};

export default HomeTools;