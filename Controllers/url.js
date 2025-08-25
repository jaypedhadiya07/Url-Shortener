const shortid = require("shortid");
const URL = require("../models/url.js");

// Generate a new short URL
async function handleGenerateNewShortUrl(req, res) {
  try {
    const body = req.body;

    if (!body.url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid();

    await URL.create({
      shortID: shortId,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user?._id,
    });

    return res.render("Newurl", { shortId });
  } catch (err) {
    console.error("Error generating short URL:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get analytics for a short URL
async function handleGetAnalytics(req, res) {
  try {
    const shortID = req.params.shortId;

    const result = await URL.findOne({ shortID });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };