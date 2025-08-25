const mongoose = require("mongoose");

// Connect to MongoDB using the provided connection URL
const Connected = async (url) => {
  try {
    await mongoose.connect(url); // no need for extra options in v4+
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = { Connected };