const mongoose = require("mongoose");

// Schema for user registration
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "NORMAL" },
    password: { type: String, required: true }, // TODO: hash passwords
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;