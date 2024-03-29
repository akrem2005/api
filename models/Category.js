// File: models/Category.js

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  image: String,
  type: String,
  active: Boolean,
});

module.exports = mongoose.model("Category", categorySchema);
