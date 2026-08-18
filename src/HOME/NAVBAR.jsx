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
  CircleUserRound,
  UserRound,
} from "lucide-react";
import Footer from "./Footer";

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
                      "Search Keywords",
                      "Done-for-you AI articles and web app",
                      "geminiResponse"
                    ],
                    [
                      Rocket,
                      "Create a blog",
                      "Try out our new feature ",
                      "blog"
                    ],
                    [
                      Wrench,
                      "Website Audit ",
                      "Tool for auditing your website",
                      "websiteaudit"
                    ],
                    [
                      Grid2X2,
                      "Coming Soon",
                      "Will be available soon ",
                      null
                    ],
                  ].map(([Icon, title, description,path], index) => (
                 <Link to={`/${path}`}>
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
                  </Link>
                    
                  ))}
                </div>
              </div>
            </div>

            {/* PRICING */}
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
        
         {token && 
                   <div className="group relative">
  {/* User Icon */}
  <button
    className="
      flex h-11 w-11 right-16
      items-center justify-center
      rounded-full
      bg-blue-50
      text-blue-600
      transition-all duration-300
      hover:bg-blue-600
      hover:text-white
      hover:shadow-lg
      hover:shadow-blue-600/20
    "
  >
    <UserRound size={22} />
  </button>

  {/* Dropdown */}
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
    {/* Dashboard */}
    <Link
      to="/dashboard"
      className="
        flex items-center
        rounded-xl
        px-4 py-3
        text-sm font-semibold
        text-gray-700
        transition-all duration-200
        hover:bg-blue-50
        hover:text-blue-600
      "
    >
      DASHBOARD
    </Link>

    {/* Divider */}
    <div className="my-1 h-px bg-gray-100" />

    {/* Logout */}
    {token && (
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
          toast.info("Logged out successfully");
        }}
        className="
          w-full
          rounded-xl
          px-4 py-3
          text-left
          text-sm font-semibold
          text-red-500
          transition-all duration-200
          hover:bg-red-50
          hover:text-red-600
        "
      >
        LOGOUT
      </button>
    )}
  </div>
</div>
         }   

 
              

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