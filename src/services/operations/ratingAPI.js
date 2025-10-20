import { apiConnector } from "../apiconnector";
import { ratingAndReviews } from "../apis";

const {
  CREATE_RATING_API,
  GET_AVERAGE_RATING_API,
  GET_REVIEWS_API,
  GET_COURSE_REVEIEWS_API,
} = ratingAndReviews;

/**
 * 1. Create a new rating and review
 */
exports.createRating = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;

    console.log("Incoming data:", { rating, review, courseId });
    console.log("User ID:", req.user?.id);

    if (!rating || !review || !courseId || !req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Missing fields or user ID",
      });
    }

    // your logic...
  } catch (error) {
    console.error("Error in createRating:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

/**
 * 2. Get average rating for a course
 */
export const getAverageRating = async (courseId) => {
  try {
    const response = await apiConnector("POST", GET_AVERAGE_RATING_API, {
      courseId,
    });
    return response?.data;
  } catch (error) {
    console.error("❌ Error fetching average rating:", error);
    throw error;
  }
};

/**
 * 3. Get all reviews (site-wide)
 */
export const getAllReviews = async () => {
  try {
    const response = await apiConnector("GET", GET_REVIEWS_API);
    return response?.data;
  } catch (error) {
    console.error("❌ Error fetching all reviews:", error);
    throw error;
  }
};

/**
 * 4. Get all reviews for a specific course
 */
export const getCourseReviews = async (courseId, token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_COURSE_REVEIEWS_API}/${courseId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("❌ Error fetching course reviews:", error);
    throw error;
  }
};
