console.log("🚀 OTP Model Loaded");

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

console.log("🚀 OTP Model Loaded");

const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // OTP expires in 5 minutes
  },
});

console.log("📦 OTP Schema Created");

// Function to send OTP email
async function sendVerificationEmail(email, otp) {
  console.log("==================================================");
  console.log("➡️ sendVerificationEmail() called");
  console.log("📧 Email:", email);
  console.log("🔑 OTP:", otp);
  console.log("==================================================");

  try {
    console.log("⏳ About to call mailSender()...");

    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyFlux",
      `
        <h2>Email Verification</h2>
        <p>Your OTP for email verification is:</p>
        <h1 style="color: blue;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `
    );

    console.log("✅ mailSender() executed successfully");
    console.log("📨 Mail Response:", mailResponse);
    console.log("==================================================");

    return mailResponse;

  } catch (error) {
    console.log("❌ Error inside sendVerificationEmail()");
    console.error(error);
    console.log("==================================================");

    throw error;
  }
}

// Pre-save hook
OTPSchema.pre("save", async function (next) {
  console.log("##################################################");
  console.log("➡️ Pre-save hook triggered");
  console.log("📧 this.email:", this.email);
  console.log("🔑 this.otp:", this.otp);
  console.log("🆕 isNew:", this.isNew);
  console.log("##################################################");

  try {
    if (this.isNew) {
      console.log("🚀 New OTP document detected");
      console.log("📤 Starting email sending process...");

      await sendVerificationEmail(this.email, this.otp);

      console.log("✅ sendVerificationEmail() completed");
      console.log("➡️ After sendVerificationEmail()");
    } else {
      console.log("⚠️ Existing document detected");
      console.log("⏭ Skipping email sending");
    }

    console.log("✅ Moving to next() in pre-save hook");
    console.log("##################################################");

    next();

  } catch (error) {
    console.log("❌ Error inside pre-save hook");
    console.error(error);
    console.log("##################################################");

    next(error);
  }
});

console.log("🧠 Creating OTP model...");

module.exports = mongoose.model("OTP", OTPSchema);

console.log("✅ OTP model exported successfully");