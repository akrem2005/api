// File: controllers/paymentController.js

const Payment = require("../models/Payments");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment({
      email: req.body.email,
      transactionid: req.body.transactionid,
    });
    await payment.save();
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment" });
  }
};

exports.getPaymentsByType = async (req, res) => {
  try {
    const payments = await Payment.find({
      transactionid: req.query.transactionid,
    });

    if (!payments || payments.length === 0) {
      return res.status(404).json({ error: "Payments not found" });
    }

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
};
