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
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  // =====================================================
  // OTP STATES
  // =====================================================

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // =====================================================
  // SIGNUP STATES
  // =====================================================

  const [signupLoading, setSignupLoading] = useState(false);

  // =====================================================
  // PASSWORD VISIBILITY
  // =====================================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =====================================================
  // RESEND OTP
  // =====================================================

  const [resendLoading, setResendLoading] = useState(false);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // VALIDATE FORM
  // =====================================================

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.warning("Please enter your name.");
      return false;
    }

    if (!formData.email.trim()) {
      toast.warning("Please enter your email.");
      return false;
    }

    if (!formData.password) {
      toast.warning("Please enter a password.");
      return false;
    }

    if (formData.password.length < 6) {
      toast.warning(
        "Password must be at least 6 characters."
      );
      return false;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match.");
      return false;
    }

    if (!formData.terms) {
      toast.warning(
        "Please accept Terms & Conditions."
      );
      return false;
    }

    return true;
  };

  // =====================================================
  // SEND OTP
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSignupLoading(true);

    try {
      const email =
        formData.email.trim().toLowerCase();

      const response = await axios.post(
        `${API_URL}/api/auth/signup`,
        {
          name: formData.name.trim(),
          email,
          password: formData.password,
          confirmPassword:
            formData.confirmPassword,
        }
      );

      console.log(
        "Signup response:",
        response.data
      );

      if (response.data.success) {
        setFormData((previous) => ({
          ...previous,
          email,
        }));

        setShowOtp(true);
        setOtp("");

        toast.success(
          response.data.message ||
            "OTP sent to your email."
        );
      } else {
        toast.error(
          response.data.message ||
            "Unable to send OTP."
        );
      }
    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setSignupLoading(false);
    }
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.warning("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      toast.warning(
        "OTP must contain 6 digits."
      );
      return;
    }

    setOtpLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/verifyotp`,
        {
          name: formData.name.trim(),
          email:
            formData.email
              .trim()
              .toLowerCase(),
          password: formData.password,
          confirmPassword:
            formData.confirmPassword,
          otp,
        }
      );

      console.log(
        "OTP verification response:",
        response.data
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Account created successfully!"
        );

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });

        setOtp("");
        setShowOtp(false);

        // Redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        toast.error(
          response.data.message ||
            "OTP verification failed."
        );
      }
    } catch (error) {
      console.error(
        "OTP verification error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Invalid or expired OTP."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResendOtp = async () => {
    if (!formData.email) {
      toast.error("Email is missing.");
      return;
    }

    setResendLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/signup`,
        {
          name: formData.name.trim(),
          email:
            formData.email
              .trim()
              .toLowerCase(),
          password: formData.password,
          confirmPassword:
            formData.confirmPassword,
        }
      );

      console.log(
        "Resend OTP response:",
        response.data
      );

      if (response.data.success) {
        setOtp("");

        toast.success(
          response.data.message ||
            "A new OTP has been sent."
        );
      } else {
        toast.error(
          response.data.message ||
            "Unable to resend OTP."
        );
      }
    } catch (error) {
      console.error(
        "Resend OTP error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResendLoading(false);
    }
  };

  // =====================================================
  // CHANGE EMAIL / BACK
  // =====================================================

  const handleChangeEmail = () => {
    setShowOtp(false);
    setOtp("");

    toast.info(
      "You can now update your signup details."
    );
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = () => {
    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-white">

      <NAVBAR />

      <div className="flex min-h-screen w-full">

        {/* =================================================
            LEFT BANNER
        ================================================= */}

        <ToolsBanner />

        {/* =================================================
            SIGNUP AREA
        ================================================= */}

        <div className="flex min-w-0 flex-1 items-center justify-center px-4 py-10">

          <div className="w-full max-w-md">

            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="flex flex-col items-center justify-center">

              {/* =================================================
                  ICON
              ================================================= */}

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                {showOtp ? (
                  <ShieldCheck
                    size={28}
                    strokeWidth={2}
                    className="text-blue-600"
                  />
                ) : (
                  <UserRoundPlus
                    size={28}
                    strokeWidth={2}
                    className="text-blue-600"
                  />
                )}
              </div>

              {/* =================================================
                  HEADING
              ================================================= */}

              <h1 className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900">

                {showOtp
                  ? "Verify your email"
                  : "Create your account"}

              </h1>

              <p className="mt-2 text-center text-sm text-gray-500">

                {showOtp
                  ? "Enter the verification code sent to your email"
                  : "Join Toolhub and simplify your work"}

              </p>

              {/* =================================================
                  STEP INDICATOR
              ================================================= */}

              <div className="mt-6 flex items-center gap-3">

                {/* Step 1 */}

                <div
                  className={`flex items-center gap-2 text-xs font-semibold ${
                    !showOtp
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >

                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                      !showOtp
                        ? "bg-blue-600 text-white"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    1
                  </span>

                  Details

                </div>

                <div className="h-px w-8 bg-gray-200" />

                {/* Step 2 */}

                <div
                  className={`flex items-center gap-2 text-xs font-semibold ${
                    showOtp
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >

                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                      showOtp
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    2
                  </span>

                  Verify

                </div>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-7 w-full space-y-4"
              >

                {/* =================================================
                    SIGNUP DETAILS
                ================================================= */}

                {!showOtp && (
                  <>
                    {/* =================================================
                        FULL NAME
                    ================================================= */}

                    <div>

                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-semibold text-gray-800"
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
                          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div>

                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-semibold text-gray-800"
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
                          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <div>

                      <label
                        htmlFor="password"
                        className="mb-1.5 block text-sm font-semibold text-gray-800"
                      >
                        Password
                      </label>

                      <div className="relative">

                        <Lock
                          size={17}
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
                          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (previous) =>
                                !previous
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* =================================================
                        CONFIRM PASSWORD
                    ================================================= */}

                    <div>

                      <label
                        htmlFor="confirmPassword"
                        className="mb-1.5 block text-sm font-semibold text-gray-800"
                      >
                        Confirm Password
                      </label>

                      <div className="relative">

                        <Lock
                          size={17}
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
                          value={
                            formData.confirmPassword
                          }
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              (previous) =>
                                !previous
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* =================================================
                        TERMS
                    ================================================= */}

                    <div className="flex items-start gap-2 pt-1">

                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={
                          formData.terms
                        }
                        onChange={handleChange}
                        required
                        className="mt-0.5 h-4 w-4 cursor-pointer accent-blue-600"
                      />

                      <label
                        htmlFor="terms"
                        className="cursor-pointer text-xs leading-5 text-gray-600"
                      >
                        I agree to{" "}
                        <a
                          href="#"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </label>

                    </div>

                    {/* =================================================
                        SEND OTP
                    ================================================= */}

                    <button
                      type="submit"
                      disabled={signupLoading}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {signupLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <Mail size={16} />

                          Send OTP
                        </>
                      )}

                    </button>
                  </>
                )}

                {/* =================================================
                    OTP VERIFICATION
                ================================================= */}

                {showOtp && (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                    {/* =================================================
                        EMAIL DISPLAY
                    ================================================= */}

                    <div className="mb-5 text-center">

                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">

                        <Mail
                          size={21}
                          className="text-blue-600"
                        />

                      </div>

                      <p className="text-sm font-semibold text-gray-800">
                        Verification code sent
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Enter the 6-digit OTP sent to
                      </p>

                      <p className="mt-1 break-all text-xs font-bold text-blue-600">
                        {formData.email}
                      </p>

                    </div>

                    {/* =================================================
                        OTP INPUT
                    ================================================= */}

                    <label
                      htmlFor="otp"
                      className="mb-2 block text-xs font-bold text-gray-700"
                    >
                      Enter OTP
                    </label>

                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        const value =
                          e.target.value.replace(
                            /\D/g,
                            ""
                          );

                        if (
                          value.length <= 6
                        ) {
                          setOtp(value);
                        }
                      }}
                      placeholder="000000"
                      autoFocus
                      className="h-14 w-full rounded-lg border border-gray-200 bg-white px-4 text-center text-2xl font-bold tracking-[10px] text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {/* =================================================
                        VERIFY BUTTON
                    ================================================= */}

                    <button
                      type="button"
                      disabled={
                        otp.length !== 6 ||
                        otpLoading
                      }
                      onClick={
                        handleVerifyOtp
                      }
                      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >

                      {otpLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                          Verifying...
                        </>
                      ) : (
                        <>
                          <ShieldCheck
                            size={17}
                          />

                          Verify OTP
                        </>
                      )}

                    </button>

                    {/* =================================================
                        RESEND
                    ================================================= */}

                    <div className="mt-4 text-center">

                      <p className="text-xs text-gray-500">
                        Didn't receive the code?
                      </p>

                      <button
                        type="button"
                        disabled={
                          resendLoading
                        }
                        onClick={
                          handleResendOtp
                        }
                        className="mt-1 text-xs font-bold text-blue-600 hover:underline disabled:opacity-50"
                      >
                        {resendLoading
                          ? "Sending..."
                          : "Resend OTP"}
                      </button>

                    </div>

                    {/* =================================================
                        CHANGE EMAIL
                    ================================================= */}

                    <button
                      type="button"
                      onClick={
                        handleChangeEmail
                      }
                      className="mt-4 flex w-full items-center justify-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-blue-600"
                    >
                      <ArrowLeft size={13} />

                      Change email
                    </button>

                  </div>
                )}

              </form>

              {/* =================================================
                  LOGIN
              ================================================= */}

              <div className="mt-6 text-center text-xs text-gray-500">

                Already have an account?

                <button
                  type="button"
                  onClick={handleLogin}
                  className="ml-1 font-bold text-blue-600 hover:underline"
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