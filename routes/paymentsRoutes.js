const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const authController = require("../controllers/authcontroller");
// Create a new user

router.post("/new", PaymentController.createPayment);
router.get("/", PaymentController.getAllPayments);
router.get("/find", PaymentController.getPaymentsByType);

module.exports = router;
