const RatingAndReviews = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Create Rating + Review
exports.createRating = async (req, res) => {
  try {
    console.log("🔥 createRating endpoint hit");
    console.log("📦 Request Body:", req.body);
    console.log("🔐 Authenticated User:", req.user);

    const { rating, review, courseId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      console.warn("🚫 No user ID found in token");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!courseId || !rating || !review) {
      console.warn("⚠️ Missing required fields:", { courseId, rating, review });
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if user is enrolled
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    console.log("📘 courseDetails:", courseDetails);

    if (!courseDetails) {
      console.warn("⛔ User is not enrolled in the course:", courseId);
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // Check if already reviewed
    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      console.warn("🚫 Already reviewed:", alreadyReviewed);
      return res.status(403).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    // Create review
    const ratingReview = await RatingAndReviews.create({
      rating,
      review,
      course: new mongoose.Types.ObjectId(courseId),
      user: new mongoose.Types.ObjectId(userId),
    });

    console.log("✅ Review created:", ratingReview);

    // Update Course with review ID
    await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { ratingAndReviews: ratingReview._id } },
      { new: true }
    );

    console.log("🆙 Course updated with new review");

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });

  } catch (error) {
    console.error("❌ createRating error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// Get Average Rating of a Course
exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "No ratings yet",
      averageRating: 0,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Ratings and Reviews
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      
      .populate("course") // no `select` — populate full course

      .exec();
  console.log("review ",allReviews[0].course); // should show full course object

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all reviews",
       reviews: allReviews,
      error: error.message,
    });
  }
};

// Get All Reviews for a Specific Course
exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await RatingAndReviews.find({ course: courseId })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      });

    return res.status(200).json({
      success: true,
      message: "Course reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course reviews",
      error: error.message,
    });
  }
};
