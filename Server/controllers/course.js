const Course = require("../models/Course");


// we use Tag in place of Category for whole course controller

const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary}= require("../utils/imageUploader");
const { default: toast } = require("react-hot-toast");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/convertSecondToDuration");
const SubSection = require("../models/SubSection");
require("dotenv").config();


// createCourse
 exports.createCourse = async(req , res)=>{
    try {
       // fetch all data
       const {courseName , courseDescription , whatYouWillLearn ,price, category , tag} = req.body;
        
        console.log("details fetched succesfully ")
       //get thumbnail
        const thumbnail = req.files.thumbnail;
        console.log("thumbnail image fetched")
       console.log("thumnail image fetched")
       //validation
       if(!courseName || !courseDescription  || !whatYouWillLearn || !price || !category){
         return res.status(400).json({
            success:false,
            message:"All fields are required",
         });
        
       }
       console.log("validation checked")

       // check for instructor
       const userId = req.user.id;
       const instructorDetails = await User.findById(userId);
       console.log("instructor details is:-",instructorDetails);

       // TODO: that user id and instructor id are same or different ?

       if(!instructorDetails){
        return res.status(404).json({
            success:false,
            message:"Instructor details not found",
        });
       }

       // check given category  is valid or not
       console.log("step-1 cheched 1")
       const categoryDetails = await Category.findById(category);
       if(!categoryDetails){
        return res.status(404).json({
            success:false,
            message:"Tag details not found",
        });
       }
        console.log("this step 2 checked")
        console.log("req.files:", req.files);

  
       // upload image to cloudinary
       const thumbnailImage = await uploadImageToCloudinary(thumbnail ,process.env.FOLDER_NAME);
       console.log("image uploaded successfully")
       // create an entry for new course
       const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn,
        price,
        tag,
        category:categoryDetails._id,
        thumbnail:thumbnailImage.secure_url,
       
       })
       console.log("entyr added in data-base")

       // update User:- add new course in instructor user schema
          await User.findByIdAndUpdate({_id:instructorDetails._id},{
            $push:{
              courses: newCourse._id,
            },
          },
          {
            new:true
         });
         
         console.log("instructor User schema updated")

    // update the Category ka schema
    await Category.findByIdAndUpdate({_id:categoryDetails._id},{
        $push:{
            course:newCourse._id,
        }
    }, {new:true})

    console.log("tag schema updated")

    // return response
    return res.status(200).json({
        success:true,
        message:"Course Created successfully",
        data:newCourse,
    })
 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"failed to create course",
            error:error.message,
           
        });
    }
 }


//getAllCourses

exports.getAllCourses = async(req , res)=>{
    try {
        // change the below statemnet incrimently
        const allCourses = await Course.find({})
        return res.status(200).json({
            success:true,
            message:"data for all courses are fetched successfuly",
            data:allCourses,
        })
        
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"failed to get All course",
            error:error.message,
        });
    }
}

// get course details

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.query;

    // Use findById to get a single document instead of an array
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Validation if course not found
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Course details not found with id: ${courseId}`,
      });
    }

    // Return successful response with single course object
    return res.status(200).json({
      success: true,
      message: "Successfully fetched course details",
      data: courseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};


// controllers/profileController.js



// exports.getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you're using auth middleware

//     const user = await User.findById(userId)
//       .populate("enrolledCourses") // Populate course data
//       .exec();

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: user.enrolledCourses,
//     });
//   } catch (error) {
//     console.error("Error fetching enrolled courses:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch enrolled courses",
//     });
//   }
// };



exports.getEnrolledCoursesDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user and get array of enrolled course IDs
    const userDetails = await User.findById(userId).select("courses").exec();
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const enrolledCourseIds = userDetails.courses || [];

    // Fetch full course details for these IDs
    const courses = await Course.find({ _id: { $in: enrolledCourseIds } })
      .populate("instructor", "name email")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    return res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
};


// from their 





exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Fetch course with population
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category") // category is array of Category IDs
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Course not found with ID: ${courseId}`,
      });
    }

    // Optional: Block draft courses
    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: "This course is currently in Draft status.",
      });
    }

    // Get course progress for user
    const courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    // Calculate total duration
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((section) => {
      section.subSection.forEach((sub) => {
        const duration = parseInt(sub.timeDuration || "0");
        totalDurationInSeconds += duration;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgress?.completedVideos || [],
      },
    });

  } catch (error) {
    console.error("Error fetching full course details:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving course details.",
      error: error.message,
    });
  }
};


// course progress controller
// Add a subsection (video) to completedVideos
exports.updateCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, subSectionId } = req.body;

    console.log("📥 [updateCourseProgress] Request received");
    console.log("🔐 User ID:", userId);
    console.log("📘 Course ID:", courseId);
    console.log("🎬 Subsection ID:", subSectionId);

    if (!userId || !courseId || !subSectionId) {
      console.warn("⚠️ Missing one or more required fields");
      return res.status(400).json({
        success: false,
        message: "Missing required data",
      });
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      console.warn("❌ Subsection not found");
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      console.warn("❌ Course progress not found");
      return res.status(404).json({
        success: false,
        message: "Course Progress does not exist",
      });
    }

    if (courseProgress.completedVideos.includes(subSectionId)) {
      console.warn("⚠️ Subsection already marked as completed");
      return res.status(400).json({
        success: false,
        error: "Subsection already completed",
      });
    }

    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    console.log("✅ Lecture marked as completed");

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      data: courseProgress,
    });
  } catch (error) {
    console.error("❌ Error in updateCourseProgress:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};



// Get progress for a course
exports.getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.query;

    console.log("📥 [getCourseProgress] Request received");
    console.log("🔐 User ID:", userId);
    console.log("📚 Course ID (from query):", courseId);

    if (!userId || !courseId) {
      console.warn("⚠️ Missing userId or courseId");
      return res.status(400).json({
        success: false,
        message: "Missing user or course ID",
      });
    }

    const progress = await CourseProgress.findOne({
      userId,
      courseID: courseId,
    }).populate("completedVideos");

    if (!progress) {
      console.warn("❌ No course progress found for this user/course");
      return res.status(404).json({
        success: false,
        message: "No progress found for this course",
      });
    }

    console.log("✅ Course progress found:", progress);

    return res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error("❌ Error in getCourseProgress:", error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch course progress",
      error: error.message,
    });
  }
};
