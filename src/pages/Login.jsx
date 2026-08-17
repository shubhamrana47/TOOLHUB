
import NAVBAR from "../HOME/NAVBAR";
import Footer from "../HOME/Footer";
import ToolsBanner from "../component/ToolsBanner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slice/authslice";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        toast.success("Login successful!");
         dispatch(
          loginSuccess({
              token: response.data.token,
              user: response.data.user,
           })
         );

        // Clear form
        setFormData({
          email: "",
          password: "",
        });

        navigate("/");


      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NAVBAR />

      <div className="flex min-h-screen w-full">

        {/* Left banner */}
        <ToolsBanner />

        {/* Login area */}
        <div className="flex min-w-0 flex-1 items-center justify-center">

          <div className="w-full max-w-md px-4">

            <div className="min-h-screen font-sans flex flex-col items-center justify-center bg-white">

              {/* Icon */}
              <div className="flex p-3 items-center justify-center rounded-full bg-blue-100">
                <LogIn
                  size={28}
                  strokeWidth={2}
                  className="text-blue-600"
                />
              </div>

              {/* Heading */}
              <p className="text-4xl text-center m-5">
                Welcome Back
              </p>

              <p className="text-normal text-center m-2">
                Login to continue using Toolhub
              </p>

              {/* =========================
                  LOGIN FORM
              ========================= */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-3"
              >

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-semibold text-gray-800"
                  >
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      strokeWidth={1.6}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className="h-[35px] w-full rounded-[5px] border border-gray-200 bg-white pl-10 pr-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />

                  </div>
                </div>

                {/* Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-1.5 block font-semibold text-gray-800"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={16}
                      strokeWidth={1.7}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="h-[35px] w-full rounded-[5px] border border-gray-200 bg-white pl-10 pr-10 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />

                    {/* Show / Hide Password */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                  </div>
                </div>

                 <button  className="text-right" 
                   onClick={()=>{navigate("/forgot-password")}}
                 >Forgot password</button>


                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 h-[35px] w-full rounded-[5px] bg-blue-600 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>

              </form>

             
              {/* Signup */}
              <div className="mt-4 text-center text-[11px] text-gray-500">

                Don't have an account?

                <button
                  type="button" 
                  onClick={()=>{navigate("/signup")}}
                  className="ml-1 font-medium text-blue-600 hover:underline"
                >
                  Sign Up
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;

