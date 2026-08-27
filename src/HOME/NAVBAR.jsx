import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authslice";
import { toast } from "react-toastify";

import logo8 from "../assets/logo8.png";

import {
  Search,
  Grid2X2,
  Tag,
  Rocket,
  MessageSquare,
  FileText,
  ChevronDown,
  Menu,
  X,
  Wrench,
  UserRound,
} from "lucide-react";

function NAVBAR() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ============================================================
  // SCROLL DETECTION
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMobileMenu(false);
    toast.info("Logged out successfully");
  };

  return (
    <>
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <header
        className={`
          sticky
          top-0
          z-50
          w-full
          bg-white
          px-3
          transition-all
          duration-300
          ease-in-out
          md:px-6

          ${
            scrolled
              ? "py-2 shadow-md"
              : "py-3 shadow-sm md:py-5"
          }
        `}
      >
        {/* ======================================================
            NAVBAR CONTAINER
        ====================================================== */}

        <div
          className={`
            mx-auto
            flex
            w-full
            items-center
            justify-between
            rounded-[28px]
            border
            bg-white
            px-5
            transition-all
            duration-300
            ease-in-out
            md:px-8

            ${
              scrolled
                ? "min-h-[64px] border-blue-100 shadow-[0_8px_25px_rgba(37,99,235,0.12)]"
                : "min-h-[72px] border-gray-100 shadow-[0_10px_35px_rgba(37,99,235,0.10)]"
            }
          `}
        >

          {/* ====================================================
              LOGO
          ==================================================== */}

          <button
            onClick={() => navigate("/")}
            className="
              flex
              shrink-0
              items-center
              bg-transparent
            "
          >
            <img
              src={logo8}
              alt="Toolshubs"
              className={`
                w-auto
                object-contain
                transition-all
                duration-300

                ${
                  scrolled
                    ? "h-20"
                    : "h-24"
                }
              `}
            />
          </button>


          {/* ====================================================
              DESKTOP NAVIGATION
          ==================================================== */}

          <nav className="hidden items-center gap-2 lg:flex">

            {/* ==================================================
                SERVICES
            ================================================== */}

            <div className="group relative">

              <button
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  px-5
                  py-4
                  text-[16px]
                  font-medium
                  text-gray-800
                  transition-all
                  duration-200
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                <Grid2X2
                  size={20}
                  className="text-blue-600"
                />

                Tools

                <ChevronDown size={16} />
              </button>


              {/* ================================================
                  SERVICES DROPDOWN
              ================================================= */}

              <div
  className="
    invisible
    absolute
    left-[185px]
    top-[80px]
    z-50
    w-[900px]
    max-w-[calc(100vw-30px)]
    -translate-x-1/2
    translate-y-2
    rounded-xl
    border
    border-gray-200
    bg-white
    p-3
    opacity-0
    shadow-[0_18px_50px_rgba(15,23,42,0.12)]
    transition-all
    duration-300
    ease-out
    group-hover:visible
    group-hover:translate-y-0
    group-hover:opacity-100
  "
>
  {/* ==================================================
      TOOLS GRID
  ================================================== */}

  <div className="grid grid-cols-4 divide-x divide-gray-200">

    {/* ==================================================
        SEO TOOLS
    ================================================== */}

    <div className="px-2.5 first:pl-1">

      <div
        className="
          mb-2.5
          flex
          items-center
          gap-2
          rounded-md
          border
          border-blue-100
          bg-blue-50
          px-2.5
          py-2
        "
      >
        <div
          className="
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-md
            bg-white
            text-blue-500
            shadow-sm
          "
        >
          <Search size={14} />
        </div>

        <h3 className="text-[15px] font-bold text-gray-800">
          Seo Tools
        </h3>
      </div>

      <div className="space-y-0.5">

        <Link
          to="/geminiResponse"
          className="
            group/item
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1.5
            text-[15px]
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-blue-50
            hover:text-blue-500
          "
        >
          <span>Search Keywords</span>
          <span className="text-gray-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
            ›
          </span>
        </Link>

        <Link
          to="/blog"
          className="
            group/item
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1.5
            text-[15px]
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-blue-50
            hover:text-blue-500
          "
        >
          <span>Create a Blog</span>
          <span className="text-gray-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
            ›
          </span>
        </Link>

        <Link
          to="/websiteaudit"
          className="
            group/item
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1.5
            text-[15px]
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-blue-50
            hover:text-blue-500
          "
        >
          <span>Website Audit</span>
          <span className="text-gray-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
            ›
          </span>
        </Link>

      </div>
    </div>


    {/* ==================================================
        WEBSITE TOOLS
    ================================================== */}

    <div className="px-2.5">

      <div
        className="
          mb-2.5
          flex
          items-center
          gap-2
          rounded-md
          border
          border-blue-100
          bg-blue-50
          px-2.5
          py-2
        "
      >
        <div
          className="
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-md
            bg-white
            text-blue-500
            shadow-sm
          "
        >
          <Rocket size={14} />
        </div>

        <h3 className="text-[15px] font-bold text-gray-800">
          Website Tools
        </h3>
      </div>

      <div className="space-y-0.5">

        <Link
          to="/wpplugin"
          className="
            group/item
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1.5
            text-[15px]
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-blue-50
            hover:text-blue-500
          "
        >
          <span>Create WPPlugins</span>
          <span className="text-gray-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
            ›
          </span>
        </Link>

        <Link
          to="/codeformatter"
          className="
            group/item
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1.5
            text-[15px]
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-blue-50
            hover:text-blue-500
          "
        >
          <span>Code Formatter</span>
          <span className="text-gray-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
            ›
          </span>
        </Link>

      </div>
    </div>


    {/* ==================================================
        DOCUMENT TOOLS
    ================================================== */}

    <div className="px-2.5">

      <div
        className="
          mb-2.5
          flex
          items-center
          gap-2
          rounded-md
          border
          border-blue-100
          bg-blue-50
          px-2.5
          py-2
        "
      >
        <div
          className="
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-md
            bg-white
            text-blue-500
            shadow-sm
          "
        >
          <Wrench size={14} />
        </div>

        <h3 className="text-[15px] font-bold text-gray-800">
          Document Tools
        </h3>
      </div>

      <div className="space-y-0.5">

        <Link
          to="/documentconvertor"
          className="
            group/item
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1.5
            text-[15px]
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-blue-50
            hover:text-blue-500
          "
        >
          <span>Document Convertor</span>
          <span className="text-gray-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
            ›
          </span>
        </Link>

      </div>
    </div>


    {/* ==================================================
        IMAGE TOOLS
    ================================================== */}

    <div className="px-2.5 last:pr-1">

      <div
        className="
          mb-2.5
          flex
          items-center
          gap-2
          rounded-md
          border
          border-blue-100
          bg-blue-50
          px-2.5
          py-2
        "
      >
        <div
          className="
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-md
            bg-white
            text-blue-500
            shadow-sm
          "
        >
          <Grid2X2 size={14} />
        </div>

        <h3 className="text-[15px] font-bold text-gray-800">
          Image Tool
        </h3>
      </div>

      <div className="space-y-0.5">

        <Link
          to="/imageconvertor"
          className="
            group/item
            flex
            items-center
            justify-between
            rounded-md
            px-2
            py-1.5
            text-[15px]
            font-medium
            text-gray-600
            transition-all
            duration-200
            hover:bg-blue-50
            hover:text-blue-500
          "
        >
          <span>Image Converter</span>
          <span className="text-gray-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-blue-500">
            ›
          </span>
        </Link>

      </div>
    </div>

  </div>


  {/* ==================================================
      BOTTOM CTA
  ================================================== */}

  <div
    className="
      mt-3
      flex
      items-center
      justify-between
      rounded-lg
      border
      border-blue-100
      bg-blue-50
      px-3
      py-2.5
    "
  >

    <div className="flex items-center gap-2.5">

      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-blue-500
          text-white
          shadow-sm
        "
      >
        <Rocket size={15} />
      </div>

      <div>

        <p className="text-[14px] font-bold text-gray-800">
          Not sure which tool you need?
        </p>

        <p className="mt-0.5 text-[12px] text-gray-500">
          Explore all our AI-powered tools and productivity solutions.
        </p>

      </div>

    </div>


    <Link
      to="/features"
      className="
        flex
        items-center
        gap-1.5
        rounded-full
        bg-blue-500
        px-4
        py-1.5
        text-[13px]
        font-semibold
        text-white
        shadow-sm
        transition-all
        duration-200
        hover:bg-blue-600
        hover:shadow-md
      "
    >
      View All Tools
      <span className="text-sm leading-none">→</span>
    </Link>

  </div>

</div>

            </div>


            {/* ==================================================
                PRICING
            ================================================== */}

            <Link
              to="/pricing"
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                px-5
                py-4
                text-[16px]
                font-medium
                text-gray-800
                transition-all
                duration-200
                hover:bg-blue-50
                hover:text-blue-600
              "
            >

              <Tag
                size={20}
                className="text-blue-600"
              />

              Pricing

            </Link>


            {/* ==================================================
                HOW IT WORKS
            ================================================== */}

            <Link
              to="/howitworks"
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                px-5
                py-4
                text-[16px]
                font-medium
                text-gray-800
                transition-all
                duration-200
                hover:bg-blue-50
                hover:text-blue-600
              "
            >

              <Rocket
                size={20}
                className="text-blue-600"
              />

              How it works

            </Link>


            {/* ==================================================
                REVIEW
            ================================================== */}

            <Link
              to="/review"
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                px-5
                py-4
                text-[16px]
                font-medium
                text-gray-800
                transition-all
                duration-200
                hover:bg-blue-50
                hover:text-blue-600
              "
            >

              <MessageSquare
                size={20}
                className="text-blue-600"
              />

              Review

            </Link>


            {/* ==================================================
                BLOG
            ================================================== */}

            <Link
              to="/blogdisplay"
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                px-5
                py-4
                text-[16px]
                font-medium
                text-gray-800
                transition-all
                duration-200
                hover:bg-blue-50
                hover:text-blue-600
              "
            >

              <FileText
                size={20}
                className="text-blue-600"
              />

              Blog

            </Link>

          </nav>


          {/* ====================================================
              DESKTOP AUTH
          ==================================================== */}

          <div className="hidden items-center gap-3 lg:flex">

            {/* ==================================================
                LOGIN
            ================================================== */}

            {!token && (
              <button
                onClick={() => navigate("/login")}
                className="
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-6
                  py-3
                  font-medium
                  text-gray-800
                  transition-all
                  duration-200
                  hover:border-blue-500
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                Login
              </button>
            )}


            {/* ==================================================
                GET STARTED
            ================================================== */}

            {!token && (
              <button
                onClick={() => navigate("/signup")}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-200
                  hover:bg-blue-700
                  hover:shadow-xl
                "
              >
                Get Started

                <span>→</span>

              </button>
            )}


            {/* ==================================================
                USER DROPDOWN
            ================================================== */}

            {token && (
              <div className="group relative">

                <button
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                    text-blue-600
                    transition-all
                    duration-300
                    hover:bg-blue-600
                    hover:text-white
                    hover:shadow-lg
                    hover:shadow-blue-600/20
                  "
                >
                  <UserRound size={22} />
                </button>


                {/* USER DROPDOWN */}

                <div
                  className="
                    invisible
                    absolute
                    right-0
                    top-14
                    z-50
                    w-52
                    translate-y-2
                    rounded-2xl
                    border
                    border-blue-100
                    bg-white
                    p-2
                    opacity-0
                    shadow-[0_15px_40px_rgba(37,99,235,0.15)]
                    transition-all
                    duration-300
                    ease-out
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >

                  {/* DASHBOARD */}

                  <Link
                    to="/dashboard"
                    className="
                      flex
                      items-center
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-gray-700
                      transition-all
                      duration-200
                      hover:bg-blue-50
                      hover:text-blue-600
                    "
                  >
                    DASHBOARD
                  </Link>


                  {/* DIVIDER */}

                  <div className="my-1 h-px bg-gray-100" />


                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-semibold
                      text-red-500
                      transition-all
                      duration-200
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    LOGOUT
                  </button>

                </div>

              </div>
            )}

          </div>


          {/* ====================================================
              MOBILE BUTTON
          ==================================================== */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
              transition-all
              duration-200
              hover:bg-blue-100
              lg:hidden
            "
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>


        {/* ======================================================
            MOBILE MENU
        ====================================================== */}

        {mobileMenu && (
          <div
            className="
              mx-2
              mt-3
              rounded-3xl
              border
              border-blue-100
              bg-white
              p-5
              shadow-xl
              transition-all
              duration-300
              lg:hidden
            "
          >

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:bg-blue-50
                "
              >
                Product
              </Link>


              <Link
                to="/features"
                onClick={() => setMobileMenu(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:bg-blue-50
                "
              >
                Features
              </Link>


              <Link
                to=""
                onClick={() => setMobileMenu(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:bg-blue-50
                "
              >
                Services
              </Link>


              <Link
                to="/pricing"
                onClick={() => setMobileMenu(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:bg-blue-50
                "
              >
                Pricing
              </Link>


              <Link
                to="/howitworks"
                onClick={() => setMobileMenu(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:bg-blue-50
                "
              >
                How it works
              </Link>


              <Link
                to="/review"
                onClick={() => setMobileMenu(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:bg-blue-50
                "
              >
                Review
              </Link>


              <Link
                to="/blogdisplay"
                onClick={() => setMobileMenu(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:bg-blue-50
                "
              >
                Blog
              </Link>

            </div>


            {/* ==================================================
                MOBILE AUTH
            ================================================== */}

            <div
              className="
                mt-4
                flex
                flex-col
                gap-3
                border-t
                border-gray-100
                pt-4
              "
            >

              {!token && (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenu(false);
                  }}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-5
                    py-3
                    font-medium
                    text-gray-800
                    transition
                    hover:border-blue-500
                    hover:bg-blue-50
                  "
                >
                  Login
                </button>
              )}


              {!token && (
                <button
                  onClick={() => {
                    navigate("/signup");
                    setMobileMenu(false);
                  }}
                  className="
                    w-full
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Get Started →
                </button>
              )}


              {token && (
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Logout
                </button>
              )}

            </div>

          </div>
        )}

      </header>
    </>
  );
}

export default NAVBAR;