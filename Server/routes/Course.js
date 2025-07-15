//import the require modules
const express = require("express");
const router = express.Router();

//course controllers import
const {createCourse, getAllCourses ,getCourseDetails, getEnrolledCoursesDetails,
    updateCourseProgress,
  getCourseProgress,
   getFullCourseDetails 
} = require("../controllers/course");


const{createRating, getAverageRating,getAllRating, getCourseReviews } = require("../controllers/RatingAndReview");

// category Controller imports
const{createCategory,showAllCategory,categoryPageDetails } = require("../controllers/Category");

// section controller imports
const{createSection,updateSection ,deleteSection, } = require("../controllers/Section");

// subsection controllers imports
const {createSubsection, updateSubSection ,deleteSubsection } = require("../controllers/Subsection");

// rating controller imports



// importing middlewares
const {auth , isInstructor , isStudent ,isAdmin}= require("../middlewares/auth");

// define routes

//Course can only be created by instructor
router.post("/createCourse" , auth , isInstructor ,createCourse);

router.post("/deleteSection" , auth , isInstructor , deleteSection);

router.post("/createSection" , auth , isInstructor ,  createSection);

router.post("/updateSection" , auth , isInstructor , updateSection);

// instructor create update and  delete subsection

router.post("/deleteSubsection" , auth , isInstructor , deleteSubsection);

router.post("/createSubsection" , auth , isInstructor ,  createSubsection);

router.post("/updateSubsection" , auth , isInstructor , updateSubSection);




// check them once
router.get("/showAllCategory" , showAllCategory);
router.get("/getCategoryPageDetails", categoryPageDetails);
router.get("/getAllCourses" , getAllCourses);
router.get("/getCourseDetails", getCourseDetails);
router.get("/getEnrolledCoursesDetails", auth, isStudent, getEnrolledCoursesDetails);
router.post("/getFullCourseDetails", auth, isStudent, getFullCourseDetails);
// Course Progress Routes
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.get("/getCourseProgress", auth, isStudent, getCourseProgress);


// router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses);
// // by Admin 

router.post("/createCategory" , auth , isAdmin, createCategory);

// Review Routes
router.post("/createRating", auth, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);

// ✅ New route to get all reviews for a specific course
router.get("/course/:courseId/reviews", getCourseReviews);


module.exports = router ;




