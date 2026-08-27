import axios from "axios";

const sendOtpEmail = async (email, otp) => {
  console.log("📧 Sending OTP through email relay to:", email);

  try {
    const response = await axios.post(
      `${process.env.EMAIL_RELAY_URL}/send-otp`,
      {
        email,
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EMAIL_RELAY_SECRET}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    console.log("✅ OTP email sent successfully through relay");

    return response.data;
  } catch (error) {
    console.error("❌ Email relay failed:");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }

    throw error;
  }
};

export default sendOtpEmail;