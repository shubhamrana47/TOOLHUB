import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
        confirmPassword: {
      type: String,
      minlength: 6,
    },
    plan: {
  type: String,
  enum: ["free", "pro", "premium"],
  default: "free",
},

  },
  {
    timestamps: true,
  },
  
);

// THIS creates the Mongoose MODEL
const User = mongoose.model("User", userSchema);

export default User;