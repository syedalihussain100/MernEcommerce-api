const express = require("express");
const { Router } = express;
const router = Router();
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const { isAutenticatedUser } = require("../middleware/Auth");

router.route(`/payment/process`).post(isAutenticatedUser, processPayment);

router.route(`/stripeapikey`).get(isAutenticatedUser, sendStripeApiKey);

module.exports = router;
