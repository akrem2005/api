const jwt = require("jsonwebtoken");

// Middleware to check if a valid token is present
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    // Verify the token using the secret key used during signing
    const decoded = jwt.verify(token, "ardax");

    // Extract relevant information from the decoded token
    const { email, userId } = decoded;

    // You can perform additional logic here if needed

    // Return the user information
    res.json({ email, userId });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
