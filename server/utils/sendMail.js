import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },

  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

const sendOtpEmail = async (email, otp) => {
  console.log("📧 Sending OTP email to:", email);

  const mailOptions = {
    from: `"Toolhub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Toolhub OTP",
    text: `Your OTP is ${otp}. This OTP is valid for 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Toolhub Email Verification</h2>
        <p>Your OTP is:</p>

        <h1 style="letter-spacing: 6px;">
          ${otp}
        </h1>

        <p>This OTP is valid for 10 minutes.</p>

        <p>If you did not request this OTP, you can ignore this email.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ OTP email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ OTP email failed:");
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Message:", error.message);

    throw error;
  }
};

export default sendOtpEmail;