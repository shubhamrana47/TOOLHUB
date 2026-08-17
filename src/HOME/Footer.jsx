
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const sections = [
    {
      title: "TASKIFY",
      links: [
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: "Pricing", path: "/pricing" },
        { name: "How It Works", path: "/howitworks" },
      ],
    },
    {
      title: "PRODUCT",
      links: [
        { name: "Keyword Research", path: "/keywords" },
        { name: "AI Blog Generator", path: "/blog" },
        { name: "Website Audit", path: "/audit" },
        { name: "SEO Tools", path: "/tools" },
      ],
    },
    
    {
      title: "COMPANY",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Reviews", path: "/reviews" },
        { name: "Privacy Policy", path: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-white border-t border-blue-100">

      {/* Background Glow */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-40 right-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">

        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* BRAND SECTION */}
          <div className="lg:col-span-2">

            <Link to="/" className="inline-block group">
              <h2 className="text-3xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  TASKIFY
                </span>
              </h2>
            </Link>

            <p className="mt-5 max-w-md text-gray-500 leading-7 text-sm">
              Turn ideas into powerful results with AI-driven tools built
              for smarter content, better SEO, and faster productivity.
            </p>

            {/* Small animated badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">

              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>

              <span className="text-xs font-semibold text-blue-700">
                AI-powered productivity
              </span>

            </div>
          </div>


          {/* ================= FOOTER LINKS ================= */}
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >

              {/* Section heading */}
              <h3 className="relative inline-block text-sm font-bold tracking-wider">

                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {section.title}
                </span>

                {/* Animated heading line */}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 group-hover:w-full rounded-full" />

              </h3>


              {/* Links */}
              <ul className="mt-6 space-y-3.5">

                {section.links.map((link) => (
                  <li key={link.name}>

                    <Link
                      to={link.path}
                      className="relative inline-flex items-center text-sm text-gray-500 transition-all duration-300 hover:text-blue-600 hover:translate-x-1"
                    >

                      {/* Animated dot */}
                      <span className="mr-2 h-1 w-1 rounded-full bg-blue-400 opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />

                      {link.name}

                      {/* Link underline */}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-500 transition-all duration-300 hover:w-full" />

                    </Link>

                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>


        {/* ================= GRADIENT DIVIDER ================= */}
        <div className="relative mt-14">

          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          {/* Center glow */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-24 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 blur-[1px]" />

        </div>


        {/* ================= BOTTOM SECTION ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7">

          <p className="text-xs text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-500">
              TASKIFY
            </span>
            . All rights reserved.
          </p>


          <div className="flex items-center gap-6 text-xs text-gray-400">

            <Link
              to="/terms"
              className="transition-colors duration-300 hover:text-blue-600"
            >
              Terms
            </Link>

            <Link
              to="/privacy"
              className="transition-colors duration-300 hover:text-blue-600"
            >
              Privacy
            </Link>

            <Link
              to="/contact"
              className="transition-colors duration-300 hover:text-blue-600"
            >
              Contact
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

