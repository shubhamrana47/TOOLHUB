import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// ===============================
// Gmail OAuth2 Configuration
// ===============================

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({
  version: "v1",
  auth: oauth2Client,
});

// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TOOLHUB Gmail Email Relay is running",
  });
});

// ===============================
// Send OTP
// ===============================

app.post("/send-otp", async (req, res) => {
  try {
    // -------------------------------
    // Check Relay Secret
    // -------------------------------

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

    // -------------------------------
    // Get request data
    // -------------------------------

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    console.log("📧 Sending OTP through Gmail API to:", email);

    // -------------------------------
    // Email content
    // -------------------------------

    const subject = "Your TOOLHUB OTP";

    const text = `
Your TOOLHUB verification OTP is: ${otp}

Please use this OTP to complete your verification.

This OTP is valid for 10 minutes.

If you did not request this OTP, you can ignore this email.
`;

    const html = `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: auto;
        padding: 20px;
      ">

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

        <p>
          Please use this OTP to complete your verification.
        </p>

        <p>
          This OTP is valid for 10 minutes.
        </p>

        <p>
          If you did not request this OTP, you can ignore this email.
        </p>

        <hr />

        <p style="font-size: 12px; color: #666;">
          This is an automated email from TOOLHUB.
        </p>

      </div>
    `;

    // -------------------------------
    // Create Gmail Raw Message
    // -------------------------------

    const message = [
      `From: TOOLHUB <${process.env.EMAIL_USER}>`,
      `To: ${email}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      'Content-Type: text/html; charset="UTF-8"',
      "",
      html,
    ].join("\r\n");

    // Convert message to Base64URL
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // -------------------------------
    // Send through Gmail API
    // -------------------------------

    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("✅ OTP email sent successfully");
    console.log("Message ID:", result.data.id);

    return res.status(200).json({
      success: true,
      message: "OTP email sent successfully",
      messageId: result.data.id,
    });
  } catch (error) {
    console.error("❌ EMAIL RELAY ERROR");

    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email",
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `TOOLHUB Gmail Email Relay running on port ${PORT}`
  );
});