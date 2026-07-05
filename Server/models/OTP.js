const mongoose = require("mongoose");

console.log("🚀 OTP Model Loading...");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  otp: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

console.log("📦 OTP Schema Created");
console.log("⏰ OTP Expiry: 5 minutes");

// Helpful index for email lookup
OTPSchema.index({
  email: 1,
  createdAt: -1,
});

console.log("🔍 OTP indexes configured");

// Logging only, NO email sending here
OTPSchema.post("save", function (doc) {
  console.log("----------------------------------------");
  console.log("💾 OTP DOCUMENT SAVED");
  console.log("🆔 Document ID:", doc._id);
  console.log("📧 Email:", doc.email);
  console.log("⏰ Created At:", doc.createdAt);
  console.log("----------------------------------------");
});

console.log("🧠 Creating OTP model...");

const OTP = mongoose.model("OTP", OTPSchema);

console.log("✅ OTP Model Exported Successfully");

module.exports = OTP;