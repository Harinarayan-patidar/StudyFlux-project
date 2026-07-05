const express = require("express");

const router = express.Router();

const {
  getInstructorDashboard,
} = require("../controllers/InstructorDashboard");

const {
  auth,
  isInstructor,
} = require("../middlewares/auth");

console.log("🚀 Instructor Routes Loaded");

/* =========================================================
   GET INSTRUCTOR DASHBOARD
========================================================= */

router.get(
  "/dashboard",
  auth,
  isInstructor,
  getInstructorDashboard
);

module.exports = router;