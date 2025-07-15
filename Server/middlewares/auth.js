const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/User");

// auth middleware
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("[auth] Extracted token:", token);

    if (!token) {
      console.log("[auth] Token missing");
      return res.status(401).json({
        success: false,
        message: "JWT token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("[auth] Token verified. User:", decode.email);
      req.user = decode;
    } catch (error) {
      console.log("[auth] Token invalid:", error.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    console.log("[auth] Error validating token:", error.message);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// isStudent middleware
exports.isStudent = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    console.log("[isStudent] Role:", userDetails?.accountType);

    if (userDetails.accountType !== "Student") {
      console.log("[isStudent] Access denied");
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }

    next();
  } catch (error) {
    console.log("[isStudent] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// isInstructor middleware
exports.isInstructor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    console.log("[isInstructor] Role:", userDetails?.accountType);

    if (userDetails.accountType !== "Instructor") {
      console.log("[isInstructor] Access denied");
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }

    next();
  } catch (error) {
    console.log("[isInstructor] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// isAdmin middleware
exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    console.log("[isAdmin] Role:", userDetails?.accountType);

    if (userDetails.accountType !== "Admin") {
      console.log("[isAdmin] Access denied");
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }

    next();
  } catch (error) {
    console.log("[isAdmin] Error:", error.message);
    res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
