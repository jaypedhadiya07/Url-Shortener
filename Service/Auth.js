const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; // Secret key for JWT

// Create a JWT token for the user
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "1d" }
  );
}

// Verify token and return user info
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return null;
  }
}

module.exports = { setUser, getUser };