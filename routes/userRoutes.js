const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authController = require("../controllers/authcontroller");
// Get all users
router.get(
  "/getall",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  UserController.getUsers
);
// Get  users by id
router.get("/:id", authController.verifyToken, UserController.getById);

// Create a new user
router.post("/new", UserController.createUser);

// Delete a user by ID
router.get(
  "/delete/:id",
  authController.verifyToken,
  UserController.deleteUser
);

// Update a user by ID
router.put("/:id", authController.verifyToken, UserController.updateUser);

// Login
router.post("/login", UserController.login);
//Forget Email
router.post("/reset", UserController.passwordReset);
//Feedback
router.post("/feedback", UserController.feedBack);
//Request Newsletter
router.post("/newsletter", UserController.newsletter);
//Request
router.post("/referal", UserController.incrementSharesForReferringUser);
module.exports = router;
