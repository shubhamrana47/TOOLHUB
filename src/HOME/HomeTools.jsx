import React from "react";
import {
  Search,
  FileText,
  Globe,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  PenLine,
  CheckCircle2,
  Code2Icon,
  MessageSquareCode,
  WrenchIcon,
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
    path:"/geminiResponse",
    iconBg: "bg-blue-50",
  },
  {
    number: "02",
    icon: FileText,
    title: "Create a Blog",
    description:
      "Generate SEO-friendly, engaging blogs in seconds using AI. Just add keywords, and let us do the writing for you.",
    button: "Create Blog",
    path:"/blog",
    iconBg: "bg-blue-50",
  },
  {
    number: "03",
    icon: Globe,
    title: "Website Audit",
    description:
      "Analyze your website's performance, SEO score, speed, security and get actionable insights to improve.",
    button: "Audit Now",
    path:"/websiteaudit",
    iconBg: "bg-blue-50",
  },
    {
    number: "04",
    icon:WrenchIcon,
    title: "Image Convertor",
    description:" Tool for converting image online easily",
    button: "Convert Now",
    path:"/imageconvertor",
    iconBg: "bg-blue-50",
  },
{
     number: "05",
    icon:MessageSquareCode,
    title: "Document  Convertor",
    description:" Tool for converting Document online at a ease",
    button: "Convert DOC Now",
    path:"/documentconvertor",
    iconBg: "bg-blue-50", 
  },
  {
     number: "06",
    icon:Code2Icon,
    title: "Code Formatter",
    description:"Tool for formatting code ",
    button: "Format Code ",
    path:"/codeformatter",
    iconBg: "bg-blue-50", 
  },
];

const HomeTools = () => {
    const navigate=useNavigate();
  return (
    <section className="relative overflow-hidden bg-white px-4  py-16 sm:px-6 lg:px-10">

      {/* Background decorations */}
      <div className="absolute left-8 top-32 grid grid-cols-4 gap-3 opacity-50">
        {[...Array(16)].map((_, index) => (
          <span
            key={index}
            className="h-2 w-2 rounded-full bg-blue-200"
          />
        ))}
      </div>

      <div className="absolute right-10 top-24 grid grid-cols-4 gap-3 opacity-50">
        {[...Array(16)].map((_, index) => (
          <span
            key={index}
            className="h-2 w-2 rounded-full bg-blue-200"
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative mx-auto max-w-5xl text-center">

        <div className="mb-5 inline-flex items-center rounded-full bg-blue-50 px-6 py-2">
          <span className="text-sm font-bold tracking-[0.25em] text-blue-600">
            ALL-IN-ONE PLATFORM
          </span>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight text-blue-950 sm:text-5xl lg:text-6xl">
          Powerful Tools to Grow
          <br />
          Your Online Presence
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
          From keyword research to content creation and website optimization,
          everything you need is in one place.
        </p>
      </div>

      {/* Cards */}
      <div className="relative mx-auto mt-14 px-16 grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.number}
              className="group rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_10px_40px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
            >

              {/* Illustration area */}
              <div
                className={`relative mb-7 flex h-56 items-center justify-center overflow-hidden rounded-3xl ${tool.iconBg}`}
              >

                {/* Soft circle */}
                <div className="absolute h-44 w-44 rounded-full bg-white/80" />

                {/* Icon */}
                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl shadow-blue-200">
                  <Icon
                    size={58}
                    strokeWidth={1.7}
                    className="text-white"
                  />
                </div>

                {/* Decorative dots */}
                <div className="absolute left-8 top-8 h-3 w-3 rounded-full bg-blue-300" />
                <div className="absolute right-10 top-12 h-2 w-2 rounded-full bg-blue-400" />
                <div className="absolute bottom-8 left-12 h-2 w-2 rounded-full bg-blue-200" />

                {/* Number */}
                <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white font-bold text-blue-600 shadow-sm">
                  {tool.number}
                </div>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-blue-950">
                {tool.title}
              </h2>

              <p className="mt-3 min-h-[100px] text-base leading-7 text-slate-600">
                {tool.description}
              </p>

              {/* Button */}
              <button 
              onClick={()=>{navigate(tool.path)}}
                className="mt-5 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-300"
              >
                {tool.button}

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom message */}
      <div className="relative mx-auto mt-16 flex max-w-3xl items-center justify-center gap-5 text-center">

        <div className="hidden h-px flex-1 bg-blue-200 sm:block" />

        <div className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-blue-800 sm:text-base">

          <ShieldCheck
            size={26}
            className="text-blue-600"
          />

          <span>Smart Tools.</span>

          <span className="text-blue-600">
            Better Content.
          </span>

          <span>Stronger Rankings.</span>
        </div>

        <div className="hidden h-px flex-1 bg-blue-200 sm:block" />
      </div>

      {/* Bottom curved decoration */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[110%] -translate-x-1/2 rounded-[50%] border-t border-blue-200 bg-blue-50/30" />
    </section>
  );
};

export default HomeTools;