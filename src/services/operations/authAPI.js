import { apiConnector } from "../apiconnector";

import { Authentication } from "../apis";

import { toast } from "react-hot-toast";

import { isTokenExpired } from "../autoDeleteToken";

const {
  SIGNUP_API,
  LOGIN_API,
  SEND_OTP_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
} = Authentication;

/* =========================================================
   SEND OTP
========================================================= */

export const sendOTP = async (
  email,
  navigate
) => {
  console.log("\n================================");
  console.log("📨 FRONTEND SEND OTP STARTED");
  console.log("================================");

  const toastId = toast.loading(
    "Sending OTP..."
  );

  try {
    if (!email) {
      throw new Error(
        "Email is required"
      );
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    console.log(
      "📧 Sending OTP to:",
      normalizedEmail
    );

    console.log(
      "🌐 API Endpoint:",
      SEND_OTP_API
    );

    const response = await apiConnector(
      "POST",
      SEND_OTP_API,
      {
        email: normalizedEmail,
      }
    );

    console.log(
      "📦 SEND OTP FULL RESPONSE:",
      response
    );

    console.log(
      "📦 SEND OTP RESPONSE DATA:",
      response?.data
    );

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message ||
          "Failed to send OTP"
      );
    }

    console.log(
      "✅ OTP sent successfully"
    );

    toast.success(
      response.data.message ||
        "OTP sent successfully"
    );

    console.log(
      "🧭 Navigating to /verify-email"
    );

    navigate("/verify-email");

    console.log("================================");
    console.log("🎉 SEND OTP FLOW COMPLETED");
    console.log("================================\n");

    return true;
  } catch (error) {
    console.log(
      "\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.log(
      "❌ FRONTEND SEND OTP ERROR"
    );

    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.error(
      "Error message:",
      error.message
    );

    console.error(
      "Backend response:",
      error.response?.data
    );

    console.error(
      "HTTP status:",
      error.response?.status
    );

    console.error(
      "Full error:",
      error
    );

    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"
    );

    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Error sending OTP"
    );

    return false;
  } finally {
    toast.dismiss(toastId);
  }
};

/* =========================================================
   SIGNUP
========================================================= */

export const signup = async (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  console.log("\n================================");
  console.log("📝 FRONTEND SIGNUP STARTED");
  console.log("================================");

  const toastId = toast.loading(
    "Signing up..."
  );

  try {
    const response = await apiConnector(
      "POST",
      SIGNUP_API,
      {
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
        otp,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        accountType,
      }
    );

    console.log(
      "📦 SIGNUP RESPONSE:",
      response
    );

    console.log(
      "📦 SIGNUP RESPONSE DATA:",
      response?.data
    );

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message ||
          "Signup failed"
      );
    }

    console.log(
      "✅ Signup successful"
    );

    toast.success(
      response.data.message ||
        "Signup successful"
    );

    navigate("/login");

    return true;
  } catch (error) {
    console.log(
      "\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.log(
      "❌ FRONTEND SIGNUP ERROR"
    );

    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.error(
      "Backend response:",
      error.response?.data
    );

    console.error(
      "HTTP status:",
      error.response?.status
    );

    console.error(
      "Full error:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Signup failed"
    );

    return false;
  } finally {
    toast.dismiss(toastId);
  }
};

/* =========================================================
   LOGIN
========================================================= */

export const login = async (
  email,
  password,
  navigate,
  dispatch
) => {
  console.log("\n================================");
  console.log("🔐 FRONTEND LOGIN STARTED");
  console.log("================================");

  const toastId = toast.loading(
    "Logging in..."
  );

  try {
    const oldToken =
      localStorage.getItem("token");

    if (
      oldToken &&
      isTokenExpired(oldToken)
    ) {
      console.log(
        "⚠️ Existing token expired"
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    const response = await apiConnector(
      "POST",
      LOGIN_API,
      {
        email: email.trim().toLowerCase(),
        password,
      }
    );

    console.log(
      "📦 LOGIN RESPONSE:",
      response
    );

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message ||
          "Login failed"
      );
    }

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.data.user
      )
    );

    console.log(
      "✅ Token saved to localStorage"
    );

    console.log(
      "✅ User saved to localStorage"
    );

    toast.success(
      response.data.message ||
        "Login successful"
    );

    console.log(
      "🧭 Navigating to dashboard"
    );

    navigate(
      "/dashboard/my-profile"
    );

    return true;
  } catch (error) {
    console.log(
      "\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.log(
      "❌ FRONTEND LOGIN ERROR"
    );

    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.error(
      "Backend response:",
      error.response?.data
    );

    console.error(
      "HTTP status:",
      error.response?.status
    );

    console.error(
      "Full error:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Login failed"
    );

    return false;
  } finally {
    toast.dismiss(toastId);
  }
};

/* =========================================================
   LOGOUT
========================================================= */

export const logout = (
  navigate
) => {
  console.log("🚪 Logging out user...");

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  console.log(
    "✅ Local authentication data removed"
  );

  toast.success("Logged out");

  navigate("/");
};

/* =========================================================
   GET PASSWORD RESET TOKEN
========================================================= */

export const getPasswordRestToken = async (
  email,
  setEmailSent
) => {
  const toastId = toast.loading(
    "Sending reset password email..."
  );

  try {
    console.log(
      "📧 Requesting password reset for:",
      email
    );

    const response = await apiConnector(
      "POST",
      RESETPASSWORDTOKEN_API,
      {
        email: email.trim().toLowerCase(),
      }
    );

    console.log(
      "📦 RESET TOKEN RESPONSE:",
      response
    );

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message ||
          "Failed to send reset email"
      );
    }

    toast.success(
      "Reset email sent"
    );

    setEmailSent(true);

    return true;
  } catch (error) {
    console.error(
      "❌ RESET PASSWORD TOKEN ERROR:",
      error.response?.data || error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to send email for resetting password"
    );

    return false;
  } finally {
    toast.dismiss(toastId);
  }
};

/* =========================================================
   RESET PASSWORD
========================================================= */

export const resetPassword = async (
  password,
  confirmPassword,
  token
) => {
  const toastId = toast.loading(
    "Resetting password..."
  );

  try {
    const response = await apiConnector(
      "POST",
      RESETPASSWORD_API,
      {
        password,
        confirmPassword,
        token,
      }
    );

    console.log(
      "📦 RESET PASSWORD RESPONSE:",
      response
    );

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message ||
          "Unable to reset password"
      );
    }

    toast.success(
      "Password reset successfully"
    );

    return true;
  } catch (error) {
    console.error(
      "❌ RESET PASSWORD ERROR:",
      error.response?.data || error
    );

    toast.error(
      error.response?.data?.message ||
        "Unable to reset password"
    );

    return false;
  } finally {
    toast.dismiss(toastId);
  }
};