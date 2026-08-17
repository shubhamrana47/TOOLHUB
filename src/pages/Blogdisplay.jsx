
import React from "react";
import { Link } from "react-router-dom";

// Blog Images
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import blog4 from "../assets/blog4.jpg";
import blog5 from "../assets/blog5.jpg";
import blog6 from "../assets/blog6.jpg";
import blog7 from "../assets/blog7.jpg";
import blog8 from "../assets/blog8.jpg";
import blog9 from "../assets/blog9.jpg";
import Footer from "../HOME/Footer";
import NAVBAR from "../HOME/NAVBAR";

const Blogdisplay = () => {
  const blogs = [
    {
      id: 1,
      image: blog1,
      category: "AI & SEO",
      date: "Jun 12, 2026",
      title: "Best AI SEO Tools to Manage Your Website in 2026",
      description:
        "AI-powered SEO tools can make managing your website easier. Discover the best tools for content, SEO and Google rankings.",
    },
    {
      id: 2,
      image: blog2,
      category: "SEO",
      date: "Jun 10, 2026",
      title: "Top Visibility & Search: Which AI SEO Tool Is Right For You?",
      description:
        "Compare powerful AI SEO platforms and discover which tool can help improve your search visibility and website performance.",
    },
    {
      id: 3,
      image: blog3,
      category: "SEO Tools",
      date: "Jun 08, 2026",
      title: "Best SEO Rank Alternatives in 2026",
      description:
        "Explore the best SEO ranking alternatives and discover powerful tools for improving your website's search performance.",
    },
    {
      id: 4,
      image: blog4,
      category: "AI Tools",
      date: "Jun 06, 2026",
      title: "What Is the Best AI Tool to Manage Your Website in 2026?",
      description:
        "Learn how AI can simplify website management, content creation, SEO and analytics while saving valuable time.",
    },
    {
      id: 5,
      image: blog5,
      category: "AI Content",
      date: "Jun 04, 2026",
      title: "Will AI Content Get You Penalized by Google in 2026?",
      description:
        "Understand Google's approach to AI-generated content and learn how to create useful content without risking search visibility.",
    },
    {
      id: 6,
      image: blog6,
      category: "SEO",
      date: "Jun 02, 2026",
      title: "How to Rank in ChatGPT Search in 2026",
      description:
        "Discover how AI search works and what you can do to increase your website's chances of appearing in ChatGPT search results.",
    },
    {
      id: 7,
      image: blog7,
      category: "AI Marketing",
      date: "May 30, 2026",
      title: "How AI Is Changing Digital Marketing",
      description:
        "Discover how artificial intelligence is transforming content creation, SEO and digital marketing strategies.",
    },
    {
      id: 8,
      image: blog8,
      category: "Content",
      date: "May 28, 2026",
      title: "How to Create Better Content With AI",
      description:
        "Learn practical ways to use AI for creating better, faster and more engaging content for your audience.",
    },
    {
      id: 9,
      image: blog9,
      category: "Analytics",
      date: "May 25, 2026",
      title: "AI Analytics Tools Every Website Should Use",
      description:
        "Explore AI-powered analytics tools that help you understand visitors, content performance and website growth.",
    },
  ];

  return (

     <div>
          <NAVBAR/>

          <section className="relative min-h-screen overflow-hidden bg-white text-gray-900">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      {/* Top blue glow */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-[120px]" />

      {/* Left glow */}
      <div className="pointer-events-none absolute left-[-250px] top-[35%] h-[500px] w-[500px] rounded-full bg-blue-50 blur-[100px]" />

      {/* Right glow */}
      <div className="pointer-events-none absolute right-[-250px] top-[60%] h-[500px] w-[500px] rounded-full bg-indigo-50 blur-[100px]" />

      {/* Decorative dots */}
      <div className="pointer-events-none absolute right-[8%] top-32 h-32 w-32 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#3b82f6 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="pointer-events-none absolute bottom-20 left-[8%] h-24 w-24 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(#2563eb 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">

        {/* Small badge */}
        <div className="mb-6 flex justify-center">

          <div className="group inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-100">

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />

            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
              Blog / Guides
            </span>

          </div>

        </div>


        {/* Main heading */}
        <div className="text-center">

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

            Practical{" "}

            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              AI, WordPress
            </span>

            <br />

            <span className="text-gray-900">
              & SEO guides
            </span>

          </h1>


          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Learn how to use AI, improve your SEO, create better content,
            and grow your website with practical guides built for modern
            creators and businesses.
          </p>

        </div>

      </div>


      {/* =====================================================
          BLOG SECTION
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-8">

        {/* Section heading */}
        <div className="mb-10 text-center">

          <div className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">
              Explore
            </span>
          </div>


          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">

            Latest{" "}

            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              guides
            </span>

          </h2>


          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
            Step-by-step guides to help you get more from AI, SEO and
            your website.
          </p>

        </div>


        {/* =====================================================
            BLOG GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog, index) => (

            <article
              key={blog.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_5px_25px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)]"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >

              {/* Blue glow on hover */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />


              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative aspect-[1.8/1] overflow-hidden bg-blue-50">

                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />


                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                {/* Category badge */}
                <div className="absolute left-3 top-3">

                  <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700 shadow-sm backdrop-blur-sm">
                    {blog.category}
                  </span>

                </div>

              </div>


              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="relative p-5">

                {/* Date */}
                <div className="mb-3 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                  <span className="text-[10px] font-medium text-gray-400">
                    {blog.date}
                  </span>

                </div>


                {/* Title */}
                <h3 className="line-clamp-2 text-base font-bold leading-6 text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                  {blog.title}
                </h3>


                {/* Description */}
                <p className="mt-3 line-clamp-3 text-xs leading-5 text-gray-500">
                  {blog.description}
                </p>


                {/* Read guide */}
                <Link
                  to={`/blog/${blog.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-blue-600 transition-all duration-300 group-hover:gap-3"
                >

                  <span>
                    Read guide
                  </span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    →
                  </span>

                </Link>

              </div>

            </article>

          ))}

        </div>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <div className="mt-16 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-8 text-center shadow-sm sm:p-10">

          <div className="mx-auto max-w-2xl">

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
              Keep learning
            </span>


            <h3 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Build smarter.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Grow faster.
              </span>
            </h3>


            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Explore more guides and discover practical ways to use AI
              and SEO to grow your online presence.
            </p>


            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Explore TASKIFY

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>

        </div>

      </div>

    </section>

      <Footer/>


     </div>
    
  );
};

export default Blogdisplay;

