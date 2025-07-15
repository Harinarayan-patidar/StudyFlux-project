// Import required modules
const express = require("express");
const router = express.Router();

// Import controller functions
const { capturePayment, verifyPayment,sendPaymentSuccessEmail } = require("../controllers/Payments");

// Import authentication middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// Define routes
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment",auth, isStudent,  verifyPayment);
router.post("/sendPaymentSuccessEmail",auth , isStudent ,sendPaymentSuccessEmail);

// Export the router
module.exports = router;
