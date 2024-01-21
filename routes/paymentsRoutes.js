const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");

// Create a new user
router.post("/new", PaymentController.createpay);
router.get("/", PaymentController.getall);
router.get("/find", PaymentController.getPaybyType);
module.exports = router;
