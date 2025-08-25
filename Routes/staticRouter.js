const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../Middlewares/Auth");
const router = express.Router();

// Admin page: view all short URLs
router.get("/admin/user", restrictTo(["ADMIN"]), async (req, res) => {
  try {
    const allurls = await URL.find({});
    res.render("Home", { urls: allurls, user: req.user });
  } catch (err) {
    console.error("Admin fetch error:", err.message);
    res.status(500).send("Internal server error");
  }
});

// Home page: view user-specific short URLs
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    const allurls = await URL.find({ createdBy: req.user._id });
    res.render("Home", { urls: allurls, user: req.user });
  } catch (err) {
    console.error("Home fetch error:", err.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/signup", (req, res) => res.render("Signup", { user: req.user }));
router.get("/login", (req, res) => res.render("Login", { user: req.user }));

router.get("/user/logout", (req, res) => {
  res.clearCookie("uid");
  res.redirect("/login");
});

module.exports = router;