const jwt = require("jsonwebtoken");

// Middleware to check if a valid token is present
exports.verifyToken = (req, res, next) => {
  const token = req.headers.Authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, "ardax", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
