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
    // Get the token from the request headers
    const token = req.headers.Authorization; // Assuming the token is sent in the "Authorization" header

    // Verify the token
    const decodedToken = jwt.verify(token, "ardax");

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;

    // Find the user in the database
    const user = await User.findById(userId);

    // Check if the user is an admin
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // You can include additional user information in the response if needed
    res.json({ message: "Admin access granted", user });
  } catch (error) {
    console.error(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};
