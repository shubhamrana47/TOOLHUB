import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authslice";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";

import {
  Home,
  Grid2X2,
  Tag,
  Rocket,
  MessageSquare,
  FileText,
  ChevronDown,
  Menu,
  X,
  Wrench,
} from "lucide-react";

function NAVBAR() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-white px-3 py-3 md:px-6 md:py-5">
        <div
          className="
            mx-auto
            flex
            min-h-[72px]
            w-full
            items-center
            justify-between
            rounded-[28px]
            border
            border-gray-100
            bg-white
            px-5
            shadow-[0_10px_35px_rgba(37,99,235,0.10)]
            md:px-8
          "
        >
          {/* ================= LOGO ================= */}
          <button
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center bg-transparent"
          >
            {/* If your logo.jpg contains the complete logo */}
            <img
              src={logo}
              alt="Pingaksho Toolhub"
              className="h-12 w-auto object-contain"
            />
          </button>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden items-center gap-2 lg:flex">
            {/* PRODUCT */}
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
                  transition
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                <Home size={20} className="text-blue-600" />
                Product
              </button>

              {/* PRODUCT DROPDOWN */}
              <div
                className="
                  invisible
                  absolute
                  left-48
                  top-[65px]
                  z-50
                  w-[700px]
                  -translate-x-1/2
                  translate-y-2
                  rounded-3xl
                  border
                  border-blue-100
                  bg-white
                  p-6
                  opacity-0
                  shadow-[0_20px_60px_rgba(37,99,235,0.15)]
                  transition-all
                  duration-300
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                {/* Dropdown Header */}
                <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4 left-36">
                  <div>
                    <p className="text-xs font-bold tracking-[3px] text-gray-400">
                      PRODUCT
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Everything you need in one place
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                    All Tools →
                  </span>
                </div>

                {/* Product Items */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    [
                      Grid2X2,
                      "Features",
                      "Everything your AI can do on your site",
                      "/features",
                    ],
                    [
                      Wrench,
                      "All 280 Tools",
                      "The full catalog of useful tools",
                      "/all280Tools",
                    ],
                    [
                      Rocket,
                      "AI Readiness Assessment",
                      "Check if your website is ready for AI search",
                      "/aIReadinessAssessment",
                    ],
                    [
                      Wrench,
                      "Free WordPress Plugin",
                      "Track AI bots and AEO on WordPress",
                      "/freeWordPressPlugin",
                    ],
                    [
                      Tag,
                      "AI SEO Score",
                      "Score any page for search and AI",
                      "/aISEOScore",
                    ],
                    [
                      MessageSquare,
                      "AI Visibility",
                      "See what AI says about your brand",
                      "/aIVisibility",
                    ],
                  ].map(([Icon, title, description, path], index) => (
                    <Link
                      key={index}
                      to={path}
                      className="
                        flex
                        gap-4
                        rounded-2xl
                        border
                        border-transparent
                        p-4
                        transition
                        hover:border-blue-100
                        hover:bg-blue-50/60
                      "
                    >
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-600
                        "
                      >
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {title}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-gray-500">
                          {description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* SERVICES */}
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
                  transition
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                <Grid2X2 size={20} className="text-blue-600" />
                Services
                <ChevronDown size={16} />
              </button>

              {/* SERVICES DROPDOWN */}
              <div
                className="
                  invisible
                  absolute
                  left-1/2
                  top-[65px]
                  z-50
                  w-[620px]
                  -translate-x-1/2
                  translate-y-2
                  rounded-3xl
                  border
                  border-blue-100
                  bg-white
                  p-6
                  opacity-0
                  shadow-[0_20px_60px_rgba(37,99,235,0.15)]
                  transition-all
                  duration-300
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <div className="mb-5 border-b border-gray-100 pb-4">
                  <p className="text-xs font-bold tracking-[3px] text-gray-400">
                    SERVICES
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Professional AI and digital solutions
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    [
                      FileText,
                      "AI Content And Apps",
                      "Done-for-you AI articles and web apps",
                    ],
                    [
                      Rocket,
                      "AI SEO",
                      "Improve your visibility on search engines",
                    ],
                    [
                      Wrench,
                      "Custom AI Tool And Plugin",
                      "Custom WordPress plugins and automation",
                    ],
                    [
                      Grid2X2,
                      "AI Integration",
                      "Integrate AI with your data and website",
                    ],
                  ].map(([Icon, title, description], index) => (
                    <div
                      key={index}
                      className="
                        flex
                        gap-4
                        rounded-2xl
                        p-4
                        transition
                        hover:bg-blue-50
                      "
                    >
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-600
                        "
                      >
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {title}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-gray-500">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PRICING */}
            <Link
              to=""
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
                transition
                hover:bg-blue-50
                hover:text-blue-600
              "
            >
              <Tag size={20} className="text-blue-600" />
              Pricing
            </Link>

            {/* HOW IT WORKS */}
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
                transition
                hover:bg-blue-50
                hover:text-blue-600
              "
            >
              <Rocket size={20} className="text-blue-600" />
              How it works
            </Link>

            {/* REVIEW */}
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
                transition
                hover:bg-blue-50
                hover:text-blue-600
              "
            >
              <MessageSquare size={20} className="text-blue-600" />
              Review
            </Link>

            {/* BLOG */}
            <Link
              to=""
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
                transition
                hover:bg-blue-50
                hover:text-blue-600
              "
            >
              <FileText size={20} className="text-blue-600" />
              Blog
            </Link>
          </nav>

          {/* ================= DESKTOP AUTH ================= */}
          <div className="hidden items-center gap-3 lg:flex">
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
                  transition
                  hover:border-blue-500
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                Login
              </button>
            )}

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
                  transition
                  hover:bg-blue-700
                  hover:shadow-xl
                "
              >
                Get Started
                <span>→</span>
              </button>
            )}

            {token && (
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                  toast.info("Logged out successfully");
                }}
                className="
                  rounded-xl
                  bg-blue-600
                  px-6
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

          {/* ================= MOBILE BUTTON ================= */}
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
              lg:hidden
            "
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
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
              lg:hidden
            "
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50"
              >
                Product
              </Link>

              <Link
                to="/features"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50"
              >
                Features
              </Link>

              <Link
                to=""
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50"
              >
                Services
              </Link>

              <Link
                to=""
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50"
              >
                Pricing
              </Link>

              <Link
                to="/howitworks"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50"
              >
                How it works
              </Link>

              <Link
                to=""
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50"
              >
                Review
              </Link>

              <Link
                to=""
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50"
              >
                Blog
              </Link>
            </div>

            {/* Mobile Auth */}
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
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
                  "
                >
                  Get Started →
                </button>
              )}

              {token && (
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                    setMobileMenu(false);
                    toast.info("Logged out successfully");
                  }}
                  className="
                    w-full
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    font-semibold
                    text-white
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