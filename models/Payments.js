// File: models/Payments.js

const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema({
  email: String,
  transactionid: String,
});

module.exports = mongoose.model("Payments", paymentsSchema);
