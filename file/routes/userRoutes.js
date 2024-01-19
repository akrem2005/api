const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Get all users
router.get("/getall", UserController.getUsers);

// Create a new user
router.post("/new", UserController.createUser);

// Delete a user by ID
router.get("/delete/:id", UserController.deleteUser);

// Update a user by ID
router.put("/:id", UserController.updateUser);

// Login
router.post("/login", UserController.login);
//Forget Email
router.post("/reset", UserController.passwordReset);

module.exports = router;
