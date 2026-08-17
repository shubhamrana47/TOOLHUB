
import NAVBAR from "../HOME/NAVBAR";
import Footer from "../HOME/Footer";
import ToolsBanner from "../component/ToolsBanner";

import {
  Mail,
  KeyRound,
} from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        }
      );

      console.log("Forgot password response:", response.data);

      if (response.data.success) {
        toast.success("OTP sent to your email");

        setShowOtp(true);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
       console.log("Forgot password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setOtpLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-forgot-otp",
        {
          email,
          otp,
        }
      );

      console.log("OTP verification:", response.data);

      if (response.data.success) {
        toast.success("OTP verified successfully");

        // Go to reset password page
        navigate("/reset-password", {
          state: {
            email,
          },
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);

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

        {/* Forgot password area */}
        <div className="flex min-w-0 flex-1 items-center justify-center">

          <div className="w-full max-w-md px-4">

            <div className="min-h-screen font-sans flex flex-col items-center justify-center bg-white">

              {/* Icon */}
              <div className="flex p-3 items-center justify-center rounded-full bg-blue-100">
                <KeyRound
                  size={28}
                  strokeWidth={2}
                  className="text-blue-600"
                />
              </div>

              {/* Heading */}
              <p className="text-4xl text-center m-5">
                Forgot Password
              </p>

              <p className="text-normal text-center m-2">
                Enter your email to receive an OTP
              </p>

              {/* Email form */}
              <form
                onSubmit={handleSendOtp}
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
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email address"
                      required
                      disabled={showOtp}
                      className="h-[35px] w-full rounded-[5px] border border-gray-200 bg-white pl-10 pr-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 disabled:bg-gray-100"
                    />

                  </div>
                </div>

                {/* Send OTP */}
                {!showOtp && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 h-[35px] w-full rounded-[5px] bg-blue-600 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {loading
                      ? "Sending OTP..."
                      : "Send OTP"}
                  </button>
                )}

              </form>

              {/* OTP SECTION */}
              {showOtp && (
                <div className="mt-5 w-full rounded-lg border border-blue-100 bg-blue-50 p-4">

                  <p className="text-sm font-semibold text-gray-800">
                    Verify your email
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Enter the 6-digit OTP sent to{" "}
                    <span className="font-medium text-blue-600">
                      {email}
                    </span>
                  </p>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value;

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

              {/* Login */}
              <div className="mt-4 text-center text-[11px] text-gray-500">

                Remember your password?

                <button
                  type="button"
                  onClick={() => navigate("/login")}
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

export default ForgotPassword;

