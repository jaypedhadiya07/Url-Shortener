const mongoose = require("mongoose");

// Schema for URL entries
const urlSchema = new mongoose.Schema(
  {
    shortID: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    visitHistory: [
      {
        timestamp: { type: Number, default: Date.now },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("Url", urlSchema);
module.exports = URL;