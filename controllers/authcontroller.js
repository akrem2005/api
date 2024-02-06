const jwt = require("jsonwebtoken");

// Middleware to check if a valid token is present
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

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
exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    jwt.verify(token, "ardax", async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      // Check if the user has an admin role (customize based on your user model)
      const user = await User.findById(decoded.userId);
      if (!user || !user.isAdmin) {
        return res
          .status(403)
          .json({ error: "Forbidden: User is not an admin" });
      }

      // If the user is an admin, proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check admin status" });
  }
};
