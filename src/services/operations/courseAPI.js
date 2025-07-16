import {apiConnector} from '../apiconnector';

import { toast } from "react-hot-toast";
import { Course } from '../apis'; // Assuming this imports all your endpoint constants

const {
    CREATECATEGORY_API, CREATE_RATING_API, CREATESUBSECTION_API, CREATESECTION_API,
    CREATECOURSE_API, DELETESECTION_API, DELETESUBSECTION_API, GETALLCOURSES_API, UPDATESECTION_API, UPDATESUBSECTION_API,
     UPDATE_COURSE_PROGRESS_API,
    

  } = Course; // Destructuring from Course object (assuming Course is an object containing all API paths)

// --- Course Operations ---

export async function createCourse(formData) {
  const token = localStorage.getItem("token"); // Get token from localStorage
  try {
    const res = await fetch(CREATECOURSE_API, {
      method: "POST",
      body: formData,
      // credentials: "include", // Only needed if you're sending/receiving cookies for auth
      headers: {
        Authorization: `Bearer ${token}`,  // Add token here
        // Do NOT set Content-Type for FormData, browser handles it
      },
    });

    const data = await res.json(); // Parse JSON response
    if (!res.ok) {
      // If response is not OK (e.g., 401, 400, 500), throw an error
      throw new Error(data.message || "Course creation failed");
    }
    return { success: true, data: data.data }; // Return success and data if backend sends {success: true, data: ...}
  } catch (error) {
    console.error("CREATE_COURSE_API ERROR:", error);
    toast.error(error.message || "Failed to create course");
    return { success: false, message: error.message };
  }
}

// Create a section inside a course
export async function createSection(sectionName, courseId) {
  const token = localStorage.getItem("token"); // Get token
  try {
    const res = await fetch(CREATESECTION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Sending JSON here
        Authorization: `Bearer ${token}`, // ✅ Add token here
      },
      body: JSON.stringify({ sectionName, courseId }),  // Body data as JSON string
      // credentials: "include", // Only needed if you're sending/receiving cookies for auth
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Section creation failed");
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("CREATESECTION_API ERROR:", error);
    toast.error(error.message || "Failed to create section");
    return { success: false, message: error.message };
  }
}

/** Update Section (JSON) */
export async function updateSection(sectionName, sectionId) {
  const token = localStorage.getItem("token"); // Get token
  return apiConnector("POST", UPDATESECTION_API, {
    sectionName,
    sectionId,
  }, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ Ensure apiConnector handles this, or add it here if it's a direct fetch
  });
}

/** Delete Section (JSON) */
export async function deleteSection(sectionId) {
  const token = localStorage.getItem("token"); // Get token
  return apiConnector("POST", DELETESECTION_API, {
    sectionId,
  }, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ Ensure apiConnector handles this, or add it here if it's a direct fetch
  });
}

// Create subsection with video upload (multipart FormData)
export async function createSubsection(subsectionData) {
  const token = localStorage.getItem("token"); // Get token
  try {
    const res = await fetch(CREATESUBSECTION_API, {
      method: "POST",
      body: subsectionData,  // FormData with video file and other fields
      // credentials: "include", // Only needed if you're sending/receiving cookies for auth
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Add token here
        // Do NOT set Content-Type for FormData, browser handles it
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Subsection creation failed");
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("CREATESUBSECTION_API ERROR:", error);
    toast.error(error.message || "Failed to create subsection");
    return { success: false, message: error.message };
  }
}

/** Update Subsection (JSON) */
export async function updateSubsection(subsectionId, title, description) {
  const token = localStorage.getItem("token"); // Get token
  return apiConnector("POST", UPDATESUBSECTION_API, {
    subsectionId,
    title,
    description,
  }, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ Ensure apiConnector handles this, or add it here if it's a direct fetch
  });
}

/** Delete Subsection (JSON) */
export async function deleteSubsection(subsectionId) {
  const token = localStorage.getItem("token"); // Get token
  return apiConnector("POST", DELETESUBSECTION_API, {
    subsectionId,
  }, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ Ensure apiConnector handles this, or add it here if it's a direct fetch
  });
}



// Add this function to your courseAPI.js file

/** Get All Courses (GET) */
export async function getAllCourses() {
  // No token needed for public GET routes
  try {
    const response = await apiConnector("GET", GETALLCOURSES_API); // Use GETALLCOURSES_API from the destructured Course object
    console.log("GET ALL COURSES API RESPONSE:", response);

    if (response.data && response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      console.error("Backend response indicates failure or unexpected structure:", response.data);
      return { success: false, message: response.data.message || "Failed to fetch all courses from backend" };
    }
  } catch (error) {
    console.error("GET ALL COURSES API ERROR:", error);
    toast.error(error.message || "An error occurred while fetching all courses");
    return { success: false, message: error.message || "An error occurred while fetching all courses" };
  }
}


/** Get Average Rating (GET) */


/** Get All Ratings/Reviews (GET) */


/** Show All Categories (GET) */
export async function showAllCategory() {
  // No token needed for public GET routes
  return apiConnector("GET", Course.SHOWALLCATEGORY_API);
}

// Fetch all categories for selection dropdown
export async function fetchCategories() {
  try {
    const res = await fetch(Course.SHOWALLCATEGORY_API);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch categories");
    }
    return { success: true, data: data.data }; // Assuming backend returns {success: true, data: [...]}
  } catch (error) {
    console.error("FETCH_CATEGORIES_API ERROR:", error);
    toast.error(error.message || "Failed to fetch categories");
    return { success: false, message: error.message };
  }
}

/** Create Category (Admin only) */
export async function createCategory(categoryData) {
  const token = localStorage.getItem("token");
  try {
    const response = await apiConnector("POST", CREATECATEGORY_API, categoryData, {
      Authorization: `Bearer ${token}`, // ✅ send token
    });
    console.log("Category created successfully:", response);
    return response.data; // Assuming apiConnector already extracts .data and handles success/error
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

/** Get Category Page Details (GET) */
export async function getCategoryPageDetails(categoryId) {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/course/getCategoryPageDetails?categoryId=${categoryId}`
    );
    const data = await response.json();
    console.log("Category Page Details:", data);
    return data; // data should be like {success: true, data: ..., message: ...}
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/** Get All Courses (GET) */
export async function getCourseDetails(courseId) {
  try {
   const response = await apiConnector("GET", Course.GETCOURSEDETAILS_API, null, null, { courseId });
    console.log("Course Details API Response:", response); // This logs the full Axios response

    // Check if the backend response itself indicates success and contains data
    if (response.data && response.data.success) {
      // Return an object with 'success' and 'data' properties as expected by CourseDetails.jsx
      return {
        success: true,
        data: response.data.data // This `response.data.data` is your actual course object from the backend
      };
    } else {
      // Handle cases where backend response.data.success is false or not present
      console.error("Backend response indicates failure or unexpected structure:", response.data);
      return { success: false, message: response.data.message || "Failed to fetch course details from backend" };
    }
  } catch (error) {
    console.error("GET COURSE DETAILS API ERROR:", error);
    // Return a standardized error object
    return { success: false, message: error.message || "An error occurred while fetching course details" };
  }
}





// const { ENROLLED_COURSES_API } = studentEndpoints;

// export async function getEnrolledCourses(token) {
//   try {
//     const response = await apiConnector(
//       "GET",
//       ENROLLED_COURSES_API,
//       null,
//       { Authorization: `Bearer ${token}` },
//       null
//     );

//     return response?.data?.data || [];
//   } catch (error) {
//     console.error("[getEnrolledCourses] Failed to fetch enrolled courses", error);
//     throw error;
//   }
// }
export async function getEnrolledCourses() {
  const token = localStorage.getItem("token"); // get token
  try {
    const response = await apiConnector(
      "GET",
      Course.GET_ENROLLED_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` },
      null
    );

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      toast.error(response.data.message || "Failed to fetch enrolled courses");
      return { success: false, data: [] };
    }
  } catch (error) {
    toast.error(error.message || "Failed to fetch enrolled courses");
    return { success: false, data: [] };
  }
}


export async function getFullCourseDetails(courseId) {
  const token = localStorage.getItem("token");
  try {
    const response = await apiConnector(
      "POST",
      Course.GET_FULL_COURSE_DETAILS_API, // You can add a new constant if needed
      { courseId },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      toast.error(response.data.message || "Failed to fetch full course details");
      return { success: false, data: null };
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong while fetching course details");
    return { success: false, data: null };
  }
}


export async function updateCourseProgress(courseId, subSectionId) {
  const token = localStorage.getItem("token");
  try {
    const response = await apiConnector(
      "POST",
      Course.UPDATE_COURSE_PROGRESS_API,
      { courseId, subSectionId },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      toast.error(response.data.message || "Failed to update course progress");
      return { success: false };
    }
  } catch (error) {
    toast.error(error.message || "Could not update progress");
    return { success: false };
  }
}


export async function getCourseProgress(courseId, silent = false) {
  const token = localStorage.getItem("token");
  try {
    const response = await apiConnector(
      "GET",
      Course.GET_COURSE_PROGRESS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      { courseId }
    );

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      toast.error(response.data.message || "Failed to fetch course progress");
      return { success: false, data: null };
    }
  } catch (error) {
    toast.error(error.message || "Could not fetch course progress");
    return { success: false, data: null };
  }
}


export const markLectureAsCompleted = async (data , token) => {
   let result = null;
   console.log("markLectureAsCompleted data", data);
   const tostId = toast.loading("Marking lecture as completed...");
   try {
     result = await apiConnector(
       "POST",
       UPDATE_COURSE_PROGRESS_API,
       data,
       {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       }
     );
     console.log("markLectureAsCompleted result", result);
     if (result.data.success) {
       toast.success("Lecture marked as completed successfully!", { id: tostId });
       return { success: true, data: result.data.data };
     } else {
       toast.error(result.data.message || "Failed to mark lecture as completed", { id: tostId });
       return { success: false, message: result.data.message };
     }
   } catch (error) {
     console.error("Error marking lecture as completed:", error);
     toast.error(error.message || "An error occurred while marking lecture as completed", { id: tostId });
     return { success: false, message: error.message };
   }
}



/** Create Rating (JSON) */
export async function createRating({ courseId, rating, review }) {
  const token = localStorage.getItem("token");

  try {
    const response = await apiConnector(
      "POST",
      Course.CREATE_RATING_API, // Comes from Course object
      {
        courseId,
        rating,
        review,
      },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.data.success) {
      toast.success("Review submitted successfully!");
      return { success: true, data: response.data.ratingReview };
    } else {
      toast.error(response.data.message || "Failed to submit review");
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("CREATE_RATING_API ERROR:", error);
    toast.error(error.message || "An error occurred while submitting review");
    return { success: false, message: error.message };
  }
}


export async function getAverageRating(courseId) {
  try {
    const response = await apiConnector(
      "POST",
      Course.GET_AVERAGE_RATING_API,
      { courseId },
      { "Content-Type": "application/json" }
    );

    if (response.data.success) {
      return { success: true, averageRating: response.data.averageRating };
    } else {
      toast.error(response.data.message || "Could not fetch average rating");
      return { success: false, averageRating: 0 };
    }
  } catch (error) {
    console.error("GET_AVERAGE_RATING_API ERROR:", error);
    toast.error(error.message || "An error occurred while fetching average rating");
    return { success: false, averageRating: 0 };
  }
}


export async function getAllRating() {
  try {
    const response = await apiConnector("GET", Course.GET_REVIEWS_API);

    if (response.data.success) {
      return { success: true, reviews: response.data.data };
    } else {
      toast.error(response.data.message || "Failed to load reviews");
      return { success: false, reviews: [] };
    }
  } catch (error) {
    console.error("GET_REVIEWS_API ERROR:", error);
    toast.error(error.message || "Error fetching all reviews");
    return { success: false, reviews: [] };
  }
}
