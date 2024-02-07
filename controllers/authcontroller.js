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
exports.verifyTokenAndAdmin = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  // Verify the token
  jwt.verify(token, "ardax", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Check if user is an admin
    if (decoded.isAdmin) {
      req.user = decoded; // Attach decoded user information to the request object
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden - User is not an admin" });
    }
  });
};
