//import the require modules
const express = require("express");
const router = express.Router();

// importing middlewares
const {auth , isInstructor , isStudent ,isAdmin}= require("../middlewares/auth");

const{signUp, login , changePassword , sendOTP} = require("../controllers/Auth");

const{resetPasswordToken , resetPassword} = require("../controllers/ResetPassword");

// define routes by me

// Route for user signup (no authentication required)
router.post("/signup", signUp);

router.post("/login", login);

router.post("/sendOTP", sendOTP);

router.post("/changePassword", auth, changePassword);

router.post("/resetPasswordToken", resetPasswordToken);

router.post("/resetPassword", resetPassword);



// exports
module.exports = router;