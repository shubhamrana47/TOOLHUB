
import NAVBAR from "../HOME/NAVBAR";
import Footer from "../HOME/Footer";
import ToolsBanner from "../component/ToolsBanner";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserRoundPlus,
} from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  // OTP states
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Signup form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // SEND OTP
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
    toast.success("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      console.log("Signup response:", response.data);

      if (response.data.success) {
        toast.success("OTP sent to your email");

        // Show OTP section
        setShowOtp(true);

        // Do NOT clear formData.
        // We still need email for OTP verification.
      }
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong during signup"
      );
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.warning("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.warning("OTP must be 6 digits");
      return;
    }

    try {
      setOtpLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verifyotp`,
        {
          email: formData.email,
          otp: otp,
        }
      );

      console.log(
        "OTP verification response:",
        response.data
      );

      if (response.data.success) {
        toast.success("Account created successfully!");

        // Clear form AFTER successful verification
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });

        setOtp("");
        setShowOtp(false);
      }
    } catch (error) {
      console.error(
        "OTP verification error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Invalid or expired OTP"
      );
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div>
      <NAVBAR />

      <div className="flex min-h-screen w-full">

        {/* Left banner */}
        <ToolsBanner />

        {/* Signup area */}
        <div className="flex min-w-0 flex-1 items-center justify-center">

          <div className="w-full max-w-md px-4">

            <div className="min-h-screen font-sans flex flex-col items-center justify-center bg-white">

              {/* Icon */}
              <div className="flex p-3 items-center justify-center rounded-full bg-blue-100">
                <UserRoundPlus
                  size={28}
                  strokeWidth={2}
                  className="text-blue-600"
                />
              </div>

              {/* Heading */}
              <p className="text-4xl text-center m-5">
                Create your account
              </p>

              <p className="text-normal text-center m-2">
                Join Toolhub and simplify your work
              </p>

              {/* =========================
                  SIGNUP FORM
              ========================= */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-3"
              >

                {/* Full Name */}
                <div className="text-[15px]">

                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-semibold text-gray-800"
                  >
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={17}
                      strokeWidth={1.6}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="h-[35px] w-full rounded-[5px] border border-gray-200 bg-white pl-10 pr-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />

                  </div>
                </div>

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
                      placeholder="Create a password"
                      required
                      className="h-[35px] w-full rounded-[5px] border border-gray-200 bg-white pl-10 pr-10 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />

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

                {/* Confirm Password */}
                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block font-semibold text-gray-800"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={16}
                      strokeWidth={1.7}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      className="h-[35px] w-full rounded-[5px] border border-gray-200 bg-white pl-10 pr-10 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 pt-1">

                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="mt-[1px] h-[14px] w-[14px] cursor-pointer accent-blue-600"
                  />

                  <label
                    htmlFor="terms"
                    className="cursor-pointer leading-[14px] text-gray-700"
                  >
                    I agree to{" "}

                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Terms & Conditions
                    </a>

                    {" "}and{" "}

                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </a>

                  </label>
                </div>

                {/* =========================
                    SEND OTP BUTTON
                ========================= */}
                <button
                  type="submit"
                  className="mt-1 h-[35px] w-full rounded-[5px] bg-blue-600 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Send OTP
                </button>

                {/* =========================
                    OTP SECTION
                ========================= */}
                {showOtp && (
                  <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">

                    <p className="text-sm font-semibold text-gray-800">
                      Verify your email
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Enter the 6-digit OTP sent to{" "}
                      <span className="font-medium text-blue-600">
                        {formData.email}
                      </span>
                    </p>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        const value =
                          e.target.value;

                        if (/^\d{0,6}$/.test(value)) {
                          setOtp(value);
                        }
                      }}
                      placeholder="Enter 6-digit OTP"
                      className="mt-3 h-[35px] w-full rounded-[5px] border border-gray-200 bg-white px-3 text-center tracking-[5px] text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      disabled={
                        otp.length !== 6 ||
                        otpLoading
                      }
                      onClick={handleVerifyOtp}
                      className="mt-3 h-[35px] w-full rounded-[5px] bg-blue-600 text-[12px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {otpLoading
                        ? "Verifying..."
                        : "Verify OTP"}
                    </button>

                  </div>
                )}

              </form>

              {/* Login */}
              <div className="mt-4 text-center text-[11px] text-gray-500">

                Already have an account?

                <button
                  type="button"
                  className="ml-1 font-medium text-blue-600 hover:underline"
                >
                  Login
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

export default Signup;

