import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import geminiRoutes from "./routes/geminiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js"

dotenv.config();

console.log("Mongo URI exists:", !!process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use("/api/reviews",reviewRoutes);
app.use("/api/gemini", geminiRoutes);

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});