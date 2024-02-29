// File: models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profile: String,
  password: String,
  referal: String,
  shares: Number,
  code: String,
  activated: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
