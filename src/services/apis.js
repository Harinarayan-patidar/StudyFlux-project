

const BASE_URL = "http://localhost:4000/api/v1"

export const Categories ={
    CATEGORIES_API : BASE_URL + "/course/showAllCategory",
}

export const Authentication ={
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    SEND_OTP_API: BASE_URL + "/auth/sendOTP",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changePassword",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    
}

export const ProfileDetails ={
    USER_DETAILS: BASE_URL + "/profile/getAllUserDetails",
    UPDATE_USER_PROFILE: BASE_URL + "/profile/updateProfile",
    UPDATE_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture", 
    DELETE_PROFILE: BASE_URL + "/profile/deleteProfile",
}

// export const Course = {
//   CREATECOURSE_API: `${BASE_URL}/createCourse`,
//   CREATESECTION_API: `${BASE_URL}/createSection`,
//   UPDATESECTION_API: `${BASE_URL}/updateSection`,
//   DELETESECTION_API: `${BASE_URL}/deleteSection`,
//   CREATESUBSECTION_API: `${BASE_URL}/createSubsection`,
//   UPDATESUBSECTION_API: `${BASE_URL}/updateSubsection`,
//   DELETESUBSECTION_API: `${BASE_URL}/deleteSubsection`,
//   CREATE_RATING_API: `${BASE_URL}/createRating`,
//   GET_AVERAGE_RATING_API: `${BASE_URL}/getAverageRating`,
//   GET_REVIEWS_API: `${BASE_URL}/getReviews`,
//   GETALLCOURSES_API: `${BASE_URL}/getAllCourses`,
//   GETCOURSEDETAILS_API: `${BASE_URL}/getCourseDetails`,
//   SHOWALLCATEGORY_API: `${BASE_URL}/showAllCategory`,
//   GETCATEGORYPAGEDETAILS_API: `${BASE_URL}/getCategoryPageDetails`,
//   CREATECATEGORY_API: `${BASE_URL}/createCategory`,
// };


export const Course = {
  CREATECOURSE_API: BASE_URL + "/course/createCourse",
  CREATESECTION_API: BASE_URL + "/course/createSection",
  UPDATESECTION_API: BASE_URL + "/course/updateSection",
  DELETESECTION_API: BASE_URL + "/course/deleteSection",          // added /course prefix for consistency
  CREATESUBSECTION_API: BASE_URL + "/course/createSubsection",    // added /course prefix
  UPDATESUBSECTION_API: BASE_URL + "/course/updateSubsection",    // added /course prefix
  DELETESUBSECTION_API: BASE_URL + "/course/deleteSubsection",    // added /course prefix
  CREATE_RATING_API: BASE_URL + "/course/createRating",           // added /course prefix
  GET_AVERAGE_RATING_API: BASE_URL + "/course/getAverageRating",  // added /course prefix
  GET_REVIEWS_API: BASE_URL + "/course/getAllRating",               // added /course prefix
  GETALLCOURSES_API: BASE_URL + "/course/getAllCourses",
  GETCOURSEDETAILS_API: BASE_URL + "/course/getCourseDetails",
  SHOWALLCATEGORY_API: BASE_URL + "/course/showAllCategory",
  GETCATEGORYPAGEDETAILS_API: BASE_URL + "/course/getCategoryPageDetails",
  CREATECATEGORY_API: BASE_URL + "/course/createCategory",
   GET_ENROLLED_COURSES_API: BASE_URL + "/course/getEnrolledCoursesDetails",

  
  // existing routes...
  GET_FULL_COURSE_DETAILS_API: BASE_URL + "/course/getFullCourseDetails",
  UPDATE_COURSE_PROGRESS_API: BASE_URL + "/course/updateCourseProgress",
  GET_COURSE_PROGRESS_API: BASE_URL + "/course/getCourseProgress",


//   ENROLLEDCOURSES_API: BASE_URL + "/course/getEnrolledCourses",
};

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}


