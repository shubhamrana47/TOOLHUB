import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Gmail SMTP connection failed:");
    console.error(error);
  } else {
    console.log("✅ Gmail SMTP connection successful");
  }
});

const sendOtpEmail = async (email, otp) => {
  try {
    console.log("📧 Sending OTP email to:", email);

    const mailOptions = {
      from: `"ToolHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your ToolHub OTP",
      text: `Your OTP is ${otp}. This OTP is valid for 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ OTP email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;

  } catch (error) {
    console.error("❌ OTP email failed:");
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);

    throw error;
  }
};

export default sendOtpEmail;