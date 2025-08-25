const User = require("../models/user");
const { setUser } = require("../Service/Auth.js");

// User signup controller
// In Controllers/user.js, update the handleUserSignup function
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).render("Signup", { 
        error: "All fields are required",
        user: req.user // Add this line
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render("Signup", { 
        error: "User already exists with this email",
        user: req.user // Add this line
      });
    }

    await User.create({ name, email, password });

    return res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).render("Signup", { 
      error: "Internal server error",
      user: req.user // Add this line
    });
  }
}

// User login controller
// In Controllers/user.js, update the handleUserLogin function
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("Login", { 
        error: "Email and password are required",
        user: req.user // Add this line
      });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.render("Login", { 
        error: "Invalid username or password",
        user: req.user // Add this line
      });
    }

    const token = setUser(user);
    res.cookie("uid", token, { httpOnly: true, secure: false });

    return res.redirect("/");
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).render("Login", { 
      error: "Internal server error",
      user: req.user // Add this line
    });
  }
}

module.exports = { handleUserSignup, handleUserLogin };