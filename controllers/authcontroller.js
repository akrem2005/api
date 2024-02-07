const jwt = require("jsonwebtoken");

// Middleware to check if a valid token is present
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }
  next();
};
