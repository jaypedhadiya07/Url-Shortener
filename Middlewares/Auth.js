const { getUser } = require("../Service/Auth.js");

// Middleware: Check for authentication via cookie
// In Middlewares/Auth.js, update the checkForAuthentication function
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.uid;
  req.user = null;

  if (!tokenCookie) return next();

  try {
    const user = getUser(tokenCookie);
    req.user = user;
  } catch (error) {
    // Handle invalid token
    console.error("Token verification failed:", error.message);
  }

  return next();
}

// Middleware: Restrict access to specific roles
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Unauthorized access");
    }

    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
