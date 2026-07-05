import { apiConnector } from "../apiconnector";
import { InstructorEndpoints } from "../apis";

console.log("🚀 Instructor API Service Loaded");

const {
  INSTRUCTOR_DASHBOARD_API,
} = InstructorEndpoints;

/* =========================================================
   GET INSTRUCTOR DASHBOARD
========================================================= */

export const getInstructorDashboard = async () => {
  console.log("\n================================");
  console.log("📊 GET INSTRUCTOR DASHBOARD API");
  console.log("================================");

  try {
    const token = localStorage.getItem("token");

    console.log("🔐 Token present:", Boolean(token));

    if (!token) {
      throw new Error(
        "Authentication token not found"
      );
    }

    console.log(
      "🌐 Dashboard Endpoint:",
      INSTRUCTOR_DASHBOARD_API
    );

    console.log(
      "📤 Sending dashboard request..."
    );

    const response = await apiConnector(
      "GET",
      INSTRUCTOR_DASHBOARD_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(
      "📥 Dashboard response received"
    );

    console.log(
      "📦 Response data:",
      response.data
    );

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message ||
          "Failed to fetch instructor dashboard"
      );
    }

    console.log(
      "✅ Instructor dashboard fetched successfully"
    );

    console.log("================================\n");

    return response.data.data;
  } catch (error) {
    console.log(
      "\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.log(
      "❌ INSTRUCTOR DASHBOARD API ERROR"
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

    throw error;
  }
};