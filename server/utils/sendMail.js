import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  console.log("sending otp email in backend");
const sendOtpEmail = async (
  email,
  otp
) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Your Toolhub OTP",

    text: `Your OTP is ${otp}. This OTP is valid for 10 minutes.`,
  };

  await transporter.sendMail(
    mailOptions
  );
};
console.log("otp mail sendm successfully");

export default sendOtpEmail;