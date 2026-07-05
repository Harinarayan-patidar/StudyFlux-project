const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");

const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mailSender = require("../utils/mailSender");

require("dotenv").config();

console.log("🚀 Auth Controller Loaded");

/* =========================================================
   SEND OTP
========================================================= */

exports.sendOTP = async (req, res) => {
  console.log("\n========================================");
  console.log("📩 SEND OTP CONTROLLER STARTED");
  console.log("========================================");

  try {
    // Fetch email
    const { email } = req.body;

    console.log("📧 Received email:", email);

    // Validate email
    if (!email) {
      console.log("❌ Email is missing");

      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    console.log("📧 Normalized email:", normalizedEmail);

    // Check if user already exists
    console.log("🔍 Checking if user already exists...");

    const checkUserPresent = await User.findOne({
      email: normalizedEmail,
    });

    if (checkUserPresent) {
      console.log("⚠️ User already registered");
      console.log("========================================\n");

      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    console.log("✅ User does not exist");
    console.log("🔢 Generating OTP...");

    // Generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("🔑 OTP Generated:", otp);

    // Check OTP uniqueness
    console.log("🔍 Checking OTP uniqueness...");

    let result = await OTP.findOne({ otp });

    while (result) {
      console.log("⚠️ Duplicate OTP found");
      console.log("🔄 Generating new OTP...");

      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp });
    }

    console.log("✅ Unique OTP confirmed");

    // Send OTP email
    console.log("----------------------------------------");
    console.log("📤 Starting OTP email sending process...");
    console.log("📧 Receiver:", normalizedEmail);
    console.log("----------------------------------------");

    const mailResponse = await mailSender(
      normalizedEmail,
      "Verification Email from StudyFlux",
      `
        <div style="text-align: center;">
          <h2 style="color: #4F46E5;">
            Email Verification
          </h2>

          <p style="font-size: 16px;">
            Your OTP for email verification is:
          </p>

          <div
            style="
              display: inline-block;
              margin: 15px 0;
              padding: 12px 24px;
              background-color: #EEF2FF;
              border-radius: 8px;
            "
          >
            <span
              style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #4F46E5;
              "
            >
              ${otp}
            </span>
          </div>

          <p style="font-size: 14px; color: #666;">
            This OTP is valid for 5 minutes.
          </p>

          <p style="font-size: 14px; color: #666;">
            If you did not request this OTP,
            you can safely ignore this email.
          </p>
        </div>
      `
    );

    console.log("✅ OTP email sent successfully");
    console.log("📨 Mail Response:", mailResponse);

    // Delete old OTPs only after email succeeds
    console.log("🗑️ Deleting previous OTPs for email...");

    const deleteResult = await OTP.deleteMany({
      email: normalizedEmail,
    });

    console.log(
      "🗑️ Previous OTPs deleted:",
      deleteResult.deletedCount
    );

    // Save OTP
    console.log("💾 Saving new OTP in database...");

    const otpBody = await OTP.create({
      email: normalizedEmail,
      otp,
    });

    console.log("✅ OTP saved successfully");
    console.log("🆔 OTP Document ID:", otpBody._id);
    console.log("⏰ OTP Created At:", otpBody.createdAt);

    console.log("========================================");
    console.log("🎉 SEND OTP PROCESS COMPLETED");
    console.log("========================================\n");

    // Never return OTP to frontend
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("❌ SEND OTP CONTROLLER ERROR");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Unable to send OTP. Please try again.",
    });
  }
};

/* =========================================================
   SIGN UP
========================================================= */

exports.signUp = async (req, res) => {
  console.log("\n========================================");
  console.log("📝 SIGNUP CONTROLLER STARTED");
  console.log("========================================");

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    console.log("📧 Signup email:", email);
    console.log("👤 First name:", firstName);
    console.log("👤 Last name:", lastName);
    console.log("🏷️ Account type:", accountType);

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      console.log("❌ Required fields missing");

      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Match passwords
    if (password !== confirmPassword) {
      console.log("❌ Passwords do not match");

      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match",
      });
    }

    // Check existing user
    console.log("🔍 Checking existing user...");

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      console.log("⚠️ User already registered");

      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Find most recent OTP
    console.log("🔍 Finding most recent OTP...");

    const recentOtp = await OTP.findOne({
      email: normalizedEmail,
    }).sort({
      createdAt: -1,
    });

    if (!recentOtp) {
      console.log("❌ OTP not found or expired");

      return res.status(400).json({
        success: false,
        message:
          "OTP not found or expired. Please request a new OTP.",
      });
    }

    console.log("✅ Recent OTP found");

    // Compare OTP safely as strings
    const receivedOtp = String(otp).trim();
    const storedOtp = String(recentOtp.otp).trim();

    if (receivedOtp !== storedOtp) {
      console.log("❌ Invalid OTP entered");

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    console.log("✅ OTP verified successfully");

    // Hash password
    console.log("🔐 Hashing password...");

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    console.log("✅ Password hashed successfully");

    // Create profile
    console.log("👤 Creating profile...");

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber || null,
    });

    console.log(
      "✅ Profile created:",
      profileDetails._id
    );

    // Create user
    console.log("💾 Creating user...");

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      contactNumber: contactNumber || null,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        `${firstName} ${lastName}`
      )}`,
    });

    console.log("✅ User created:", user._id);

    // Delete OTP after successful signup
    console.log("🗑️ Removing used OTPs...");

    await OTP.deleteMany({
      email: normalizedEmail,
    });

    console.log("✅ Used OTPs removed");

    // Remove password from response
    const safeUser = user.toObject();
    delete safeUser.password;

    console.log("========================================");
    console.log("🎉 SIGNUP COMPLETED SUCCESSFULLY");
    console.log("========================================\n");

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: safeUser,
    });
  } catch (error) {
    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("❌ SIGNUP CONTROLLER ERROR");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");

    return res.status(500).json({
      success: false,
      message:
        "User cannot be registered. Please try again.",
    });
  }
};

/* =========================================================
   LOGIN
========================================================= */

exports.login = async (req, res) => {
  console.log("\n========================================");
  console.log("🔐 LOGIN CONTROLLER STARTED");
  console.log("========================================");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Email or password missing");

      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    console.log("📧 Login email:", normalizedEmail);

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    }).populate("additionalDetails");

    if (!user) {
      console.log("❌ User not registered");

      return res.status(401).json({
        success: false,
        message:
          "User is not registered. Please sign up first.",
      });
    }

    console.log("✅ User found");

    // Compare password
    const passwordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatched) {
      console.log("❌ Incorrect password");

      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    console.log("✅ Password matched");

    // JWT payload
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    // Generate token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "20m",
      }
    );

    console.log("✅ JWT token generated");

    // Safe user object
    const safeUser = user.toObject();

    safeUser.token = token;
    delete safeUser.password;

    // Cookie options
    const options = {
      expires: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    };

    console.log("========================================");
    console.log("🎉 LOGIN SUCCESSFUL");
    console.log("========================================\n");

    return res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        token,
        user: safeUser,
        message: "Logged in successfully",
      });
  } catch (error) {
    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("❌ LOGIN ERROR");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    console.error("Error message:", error.message);
    console.error("Full error:", error);

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

/* =========================================================
   CHANGE PASSWORD
========================================================= */

exports.changePassword = async (req, res) => {
  try {
    console.log("🔐 Change password controller called");

    return res.status(501).json({
      success: false,
      message: "Change password is not implemented yet",
    });
  } catch (error) {
    console.error("❌ Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to change password",
    });
  }
};