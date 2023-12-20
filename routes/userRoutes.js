const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Get all users
router.get("/getall", UserController.getUsers);

// Create a new user
router.post("/new", UserController.createUser);

// Verify OTP
router.post("/verify-otp", UserController.verifyOTP);

// Delete a user by ID
router.delete("/:id", UserController.deleteUser);

// Update a user by ID
router.put("/:id", UserController.updateUser);

// Login Via Otp
router.post("/login", UserController.login);

module.exports = router;
