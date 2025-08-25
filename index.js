require('dotenv').config()
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { Connected } = require("./Config/Connection.js");
const { checkForAuthentication, restrictTo } = require("./Middlewares/Auth.js");
const URL = require("./models/url.js");
const { handleGetAnalytics } = require("./Controllers/url.js");

const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRouter.js");
const userRoute = require("./Routes/user.js");

// Connect to MongoDB
Connected(process.env.MONGO_URT);

const app = express();
const port = process.env.PORT;

// Setup EJS view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// Routes
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

// Redirect from short ID
app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) return res.status(404).send("Short URL not found");

    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Redirect error:", err.message);
    return res.status(500).send("Internal server error");
  }
});

// Analytics route
app.get("/analytics/:shortId", handleGetAnalytics);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at: http://localhost:${port}`);
});