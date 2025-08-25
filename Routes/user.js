const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../Controllers/user");
const router = express.Router();

// POST: Signup user
router.post("/", handleUserSignup);

// POST: Login user
router.post("/login", handleUserLogin);

module.exports = router;