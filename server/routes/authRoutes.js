import express from "express";

import {
  sendOtp,
  verifyOtp,
  signup,
  login,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();



router.post("/signup", sendOtp);

router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password",resetPassword);

router.post("/verifyotp", verifyOtp, signup);

router.post( "/login", login);


export default router;