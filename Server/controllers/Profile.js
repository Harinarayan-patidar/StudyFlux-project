const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User")

exports.updateProfile = async (req , res)=>{
    try {
        // get data + user id
        const {dateOfBirt="" , about="", contactNumber , gender} = req.body;
        const id = req.user.id;
        // validate
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:'fill ALL required fields',
            })
        }
         //find Profile
         const userDetails = await User.findById(id);
         const profileId = await userDetails.additionalDetails ;
         const profileDetails =  await Profile.findById(profileId);
         // update profile
         profileDetails.dateOfBirth = dateOfBirt;
         profileDetails.about = about;
         profileDetails.gender = gender;
         profileDetails.contactNumber = contactNumber;
         await profileDetails.save();

         // return response
         return res.status(200).json({
            success:true,
            message:'profile updated successfully',
            profileDetails,
         })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'internal server error while updating profile',
            error: error.message,
        })
        
    }
}

// delete Account

exports.deleteAccount = async (req, res)=>{
    //explore :-  how can we schedule a deletion acound request , and cronjob ;
    try {
        // get id 
         const id = req.user.id
         console.log("id:-",id);
        // validation 
          const userDetails = await User.findById( {_id : id});
          console.log(userDetails)
          if(!userDetails){
            res.status(404).json({
                success:false,
                message:'User not found',
            })
          }
        // delete profile 
           console.log("till here 1")
           await Profile.findByIdAndDelete({_id :userDetails.additionalDetails});
            // TODO :- unroll user from all enrolled courses// YE BAKCHODI MENE KI HAI GADBAD AAYE TO SAMBHAL LENA 
            const courseId = userDetails. courses ;
            const courseDetails = await Course.findById(courseId);
            console.log("till here 2")
            await Course.findByIdAndUpdate(
                courseId,
                { $pull: { studentsEnroled: id } },
                { new: true }
              )
             
        // delete user 
        console.log("till here 2a")
           await User.findByIdAndDelete({_id :id});
           console.log("till here 3")
       
        // return response 
       return res.status(200).json({
        success:true,
        message:'User deleted succesfully',
       })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'internal server error while deleting user',
            error: error.message,
        })
        
    }
}

exports.getAllUserDetails = async (req, res)=>{
    try {
        const id = req.user.id ;
        console.log("id:-",id);
        
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
       
         return res.status(200).json({
            success:true,
            message:"User data fetched succesfully",
            data:userDetails 
         })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}


exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })
            const courseData =  courseDetails.map((course)=>{
                const totleStudentEntrolled = course.studentsEnroled.length;
                const totalAmountEarned = course.price * totleStudentEntrolled;
            //create a new object with the required fields
                const courseDataWithStats ={
                    courseId: course._id,
                    courseName: course.courseName,
                    courseDescription: course.courseDescription,
                    totalStudentsEnrolled: totleStudentEntrolled,
                    totalAmountEarned: totalAmountEarned,
                }
                return courseDataWithStats;
            })
        
        return res.status(200).json({
            success: true,
            message: "Instructor dashboard data fetched successfully",
            data: courseData,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching instructor dashboard",
            error: error.message,
        });
        
    }
}
