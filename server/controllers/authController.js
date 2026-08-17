import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import Otp from "../model/Otp.js";
import sendOtpEmail from "../utils/sendMail.js";



export const sendOtp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = req.body;

    console.log("Signup body:", req.body);

    // Check fields
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required details",
      });
    }

    // Check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both the passwords must be same",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Generate OTP
    const generatedOtp = crypto
      .randomInt(100000, 1000000)
      .toString();

    console.log(
      "OTP generated for:",
      email,
      generatedOtp
    );

    // Remove old OTP
    await Otp.deleteMany({
      email: email,
    });

    // Store OTP and signup data
    await Otp.create({
      email: email,
      otp: generatedOtp,

      signupData: {
        name: name,
        email: email,
        password: hashedPassword,
      },

      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    // Send OTP email
    await sendOtpEmail(
      email,
      generatedOtp
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (error) {
    console.error("Send OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Problem occurred while sending OTP",
    });
  }
};

export const verifyOtp = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      otp,
    } = req.body;

    console.log(
      "Verify OTP body:",
      req.body
    );

    // Check fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find OTP
    const otpRecord = await Otp.findOne({
      email: email,
      otp: otp,
    });

    // Invalid OTP
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check expiry
    if (otpRecord.expiresAt < new Date()) {

      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Check user again
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {

      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Save signup data for next controller
    req.signupData = otpRecord.signupData;

    // Save OTP id
    req.otpId = otpRecord._id;

    // OTP verified
    next();

  } catch (error) {
    console.error(
      "Verify OTP error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Problem occurred during OTP verification",
    });
  }
};


export const signup = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.signupData;

    // Create user
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    // Delete OTP
    await Otp.deleteOne({
      _id: req.otpId,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(
      "Create account error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Problem occurred while creating account",
    });
  }
};


export const login = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required details",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email,
    });

    // User doesn't exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Problem occurred during login",
    });
  }
};


export const forgotPassword = async (req, res) => {
  console.log("FORGOT PASSWORD CONTROLLER HIT");

  try {
    const email = req.body.email?.trim().toLowerCase();

    console.log("Email received:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    console.log("User found:", user ? "YES" : "NO");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const generatedOtp = crypto
      .randomInt(100000, 1000000)
      .toString();

    console.log("Forgot password OTP:", generatedOtp);

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp: generatedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOtpEmail(email, generatedOtp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

export const verifyForgotOtp = async (req, res) => {
   console.log("VERIFY FORGOT OTP CONTROLLER HIT");
  console.log("Verify forgot OTP body:", req.body);
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await Otp.findOne({
      email: email,
      otp: otp,
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });
     
      console.log("FORGOT OTP VERIFIED SUCCESSFULLY");
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // OTP is valid
    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("Verify forgot OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};


export const resetPassword = async (req, res) => {
  console.log("resetp pass controller hit starts");
  console.log("reset pass body",req.body);
  try {
    const { email,password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword){
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length<6){
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};