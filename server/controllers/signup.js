import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const signup = async (req, res) => {
  try {
    console.log("Signup body:", req.body);

    const {
      name,
      email,
      password,
      confirmPassword,
    } = req.body;

    // ==============================
    // VALIDATION
    // ==============================

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

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords must be the same",
      });
    }

    // ==============================
    // NORMALIZE EMAIL
    // ==============================

    const normalizedEmail =
      email.trim().toLowerCase();

    // ==============================
    // CHECK EXISTING USER
    // ==============================

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ==============================
    // HASH PASSWORD
    // ==============================

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // ==============================
    // CREATE USER
    // ==============================

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // ==============================
    // RESPONSE
    // ==============================

    return res.status(201).json({
      success: true,
      message: "Signup successful. Please login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(
      "Signup error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Problem occurred during signup",
    });
  }
};