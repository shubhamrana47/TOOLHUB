import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TOOLHUB Email Relay is running",
  });
});

// Send OTP
app.post("/send-otp", async (req, res) => {
  try {
    // Check relay secret
    const authorization = req.headers.authorization;

    if (
      !authorization ||
      authorization !== `Bearer ${process.env.EMAIL_RELAY_SECRET}`
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    await transporter.sendMail({
      from: `"TOOLHUB" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your TOOLHUB OTP",
      text: `Your TOOLHUB verification OTP is ${otp}. Please use this OTP to complete your verification.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2>TOOLHUB Verification</h2>

          <p>Your verification OTP is:</p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            margin: 20px 0;
          ">
            ${otp}
          </div>

          <p>Please use this OTP to complete your verification.</p>

          <p>If you did not request this OTP, you can ignore this email.</p>

          <hr />

          <p style="font-size: 12px; color: #666;">
            This is an automated email from TOOLHUB.
          </p>
        </div>
      `,
    });

    console.log(`OTP email sent to ${email}`);

    return res.status(200).json({
      success: true,
      message: "OTP email sent successfully",
    });
  } catch (error) {
    console.error("EMAIL RELAY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TOOLHUB Email Relay running on port ${PORT}`);
});