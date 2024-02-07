// File: models/Notification.js

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  text: String,
  date: String,
  image: String,
  subtitle: String,
  expires: { type: Date, default: Date.now, expires: 86400 }, // 86400 seconds = 24 hours
});

module.exports = mongoose.model("Notification", notificationSchema);
