const express = require("express");
const router = express.Router();
const {
  createRating,
  getAverageRating,
  getAllRating,
  getCourseReviews,
} = require("../controllers/RatingAndReview");
const { auth } = require("../middlewares/auth");

// Review Routes
router.post("/createRating", auth, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);

// ✅ New route to get all reviews for a specific course
router.get("/course/:courseId/reviews", getCourseReviews);

module.exports = router;
