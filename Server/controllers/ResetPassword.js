const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// reset  Password Token
exports.resetPasswordToken = async (req , res)=>{
   try {
     
     // get email from request body
     const {email} = req.body;

     console.log("step1:- done");
     // check user for this email , email validaation
     const user = await User.findOne({email:email});
         if(!user){
             return res.status(401).json({
                 success:false,
                 message:'Not found any user registered with this email',
             })
         }
         console.log("step 2 :- done")
     // generate token
     const token = crypto.randomUUID();
     //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email} ,
                                                {
                                                  token:token,
                                                  resetPasswordExpires: Date.now()+ 5*60*1000,
                                                },
                                               {new:true} );
      console.log("step 3 :- done")
     // create url 
     const url = `https://localhost:3000/update-password/${token}`

     console.log("step 4 :- done")
     // send mail containing the url
     await mailSender(email ,
                   "Password Reset Link ",
                   `Password reset link:- ${url}`);
     
             console.log("step 5 :- done")
     // send response
 
      return res.json({ success:true, message:"email send successfully ,check your email and change Password"})
 
   
 
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"someting went wrong while sending reset password mail",
      })
   }
    
}
 
// reset Password

exports.resetPassword = async (req, res) => {
    try {
        // Data fetch
        const { password, confirmPassword, token } = req.body;

        // Validation: check if passwords match
        if (password !== confirmPassword) {
            return res.json({ success: false, message: "Confirm password does not match password" });
        }

        // Get user details from DB using token
        const userDetails = await User.findOne({ token: token });

        // If no user found, token is invalid
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid"
            });
        }

        // Check if the token has expired
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token has expired. Please regenerate your token"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the password in the database
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword }, // Store the hashed password
            { new: true }
        );

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while resetting password"
        });
    }
};
