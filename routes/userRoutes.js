const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authController = require("../controllers/authcontroller");
//Use Router
router.use(authController.verifyToken);
// Get all users
router.get("/getall", authController.isAdmin, UserController.getUsers);
// Get  users by id
router.get("/:id", UserController.getById);

// Create a new user
router.post("/new", UserController.createUser);

// Delete a user by ID
router.get("/delete/:id", authController.isAdmin, UserController.deleteUser);

// Update a user by ID
router.put("/:id", UserController.updateUser);

// Login
router.post("/login", UserController.login);
//Forget Email
router.post("/reset", UserController.passwordReset);
//Feedback
router.post("/feedback", UserController.feedBack);

module.exports = router;
