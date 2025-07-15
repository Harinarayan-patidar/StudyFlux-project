const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile =require("../models/Profile");
require('dotenv').config();

// SendOTP
exports.sendOTP = async (req , res)=>{
 try {
       // fetch data
       const {email} = req.body;
    

       // check is user already exist
      const checkUserPresent = await User.findOne({email});
       
      // if user already present then return response

    if(checkUserPresent){
       return res.status(401).json({
           success :false,
           message:"User already registered",
       });
    }
   
    //Generate otp
  var otp = otpGenerator.generate(6, {
     upperCaseAlphabets:false,
     lowerCaseAlphabets:false,
     specialChars:false,
  });
  console.log("otp Generated :" , otp);

  // check unique otp or not
  let result = await OTP.findOne({otp:otp});
  while(result){
        //  otp = otpGenerator(6, {
        //   upperCaseAlphabets:false,
        //   lowerCaseAlphabets:false, 
        //   specialChars:false,
        // });
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        result = await OTP.findOne({otp:otp});
     }
    

 
  const otpPayload = {email , otp};

  //  create an entry of otp in DB
       const otpBody = await OTP.create(otpPayload);
       console.log( "otpBody:",otpBody);
       console.log("otp save in Db ")

 // return response
       res.status(200).json({
        success:true,
        message:"otp send successfully",
        otp,
       })
    
 } catch (error) {
     console.log(error);
     res.status(500).json({
        success:false,
        message:error.message,
     })
 }


}


// signUp
  exports.signUp = async (req , res) =>{
    try {
        // fetch datta drom req body
           const { firstName ,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    accountType,
                    contactNumber,
                    otp,

                               } = req.body;

        // validate karlo
        if(!firstName || !lastName || !email || !password || 
            !confirmPassword  || !otp){
            return res.status(403).json({
                success:false,
                message:"ALL fields are required",
            })
        }

        // match both password
            if(password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:'Password and Confirm Password is not match please try again',

                })
            }
        // check user already exist or not
            const existingUser = await User.findOne({email});
            
            if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:'Already registered email',
                });
            }

        // find most recent otp for the user
            //   const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
            const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
             console.log("recent otp is:-",recentOtp);

        //valiadate otp
            if(recentOtp.length == 0){
                // otp not found
                return res.status(400).json({
                    success:false,
                    message:'Otp not found',
                })
            }    
            // else if (otp !== recentOtp[0].otp) {
            //     // Invalid OTP
            //     return res.status(400).json({
            //         success: false,
            //         message: "Invalid OTP",
            //     });
            // }
            else if (otp.trim() !== recentOtp[0].otp.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP",
                });
            }

        // hash password
            const hashedPassword = await bcrypt.hash(password, 10); 
            console.log("hashed password is :-", hashedPassword);

        // create entry in DB
           const profileDetails = await Profile.create({
             gender:null,
             dateOfBirth:null,
             about:null,
             contactNumber:null,
           })

            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                contactNumber,
                accountType,
                additionalDetails:profileDetails._id ,
                image :`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,

            })      

        // RETURN RESPONSE

          return res.status(200).json({
            success:true,
            message:'User is registered Succefully',
            user,
          })


    } catch (error) {
        console.error("Error occurred during sign-up:", error); 
        return res.status(500).json({
            success:false,
            message:'User cannot be registered please ,Try again',

        })
    }
  }

// Login

exports.login = async (req , res)=>{
    try {
        //get data from request body
          const {email , password} = req.body;
        // validation
           if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field are required please try again",
            })
           }
        //check user if registered or not
           const user = await User.findOne({email}).populate("additionalDetails");
           if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered Please Sign up first",
            });
           }
        //generate jwt after password matching
        if(await bcrypt.compare(password , user.password)){
                    const Payload = {
                        email:user.email,
                        id:user._id,
                        accountType:user.accountType,
                    }

                 const token = jwt.sign(Payload, process.env.JWT_SECRET,{
                    expiresIn:"20m",
                 })

                 user.token = token;
                 user.password= undefined;
      
        //create cookie and send response
        const Options ={
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }


         res.cookie("token", token ,Options).status(200).json({
             success:true,
             token,
             user,
             message:'Logged in Successfuly'
         })  
     }

        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect'
            })
        }
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure please try again',
        })

    }
}

// changePassword

exports.changePassword = async (req , res)=>{
    try {
        // get data from request body
        //get old password , new password , confirm new password
        // validation
        //update password in db
        //send mail :- update password successful
        //return response

    } catch (error) {
        
    }
}
