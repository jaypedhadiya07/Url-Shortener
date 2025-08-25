const express = require("express");
const { handleGenerateNewShortUrl } = require("../Controllers/url.js");
const router = express.Router();

// Handle POST: Create short URL
router.post("/newurl", handleGenerateNewShortUrl);

module.exports = router;