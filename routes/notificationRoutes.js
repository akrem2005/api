const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authcontroller");

// Create a notification
router.post(
  "/notifications",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  notificationController.createNotification
);

// Get all notifications
router.get(
  "/notifications",
  authController.verifyToken,
  notificationController.getAllNotifications
);

// Get a specific notification by ID
router.get(
  "/notifications/:id",
  authController.verifyToken,
  notificationController.getNotificationById
);

module.exports = router;
