
import NAVBAR from "../HOME/NAVBAR";
import Footer from "../HOME/Footer";
import ToolsBanner from "../component/ToolsBanner";

import {
  Lock,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Email should be passed from Forgot Password / OTP verification
  const email = location.state?.email || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET PASSWORD
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing. Please restart the forgot password process.");
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      toast.error("Please fill both password fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      console.log("Reset password response:", response.data);

      if (response.data.success) {
        toast.success("Password reset successfully!");

        setFormData({
          password: "",
          confirmPassword: "",
        });

        // Go to login after successful password reset
        navigate("/login");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      console.log("forgot passs error ",error);
      console.log("forgot passs error ",error.message);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while resetting password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NAVBAR />

      <div className="flex min-h-screen w-full">

        {/* Left Banner */}
        <ToolsBanner />

        {/* Reset Password Area */}
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
                Reset Password
              </p>

              <p className="text-normal text-center m-2">
                Create a new password for your account
              </p>

              {/* Email */}
              {email && (
                <p className="text-xs text-gray-500 mb-4">
                  Resetting password for{" "}
                  <span className="font-medium text-blue-600">
                    {email}
                  </span>
                </p>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4"
              >

                {/* New Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-1.5 block font-semibold text-gray-800"
                  >
                    New Password
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
                      placeholder="Enter new password"
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
                    Confirm New Password
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
                      placeholder="Confirm new password"
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

                {/* Reset Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 h-[35px] w-full rounded-[5px] bg-blue-600 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading
                    ? "Resetting..."
                    : "Reset Password"}
                </button>

              </form>

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

export default ResetPassword;

