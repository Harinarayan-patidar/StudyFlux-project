const mongoose = require("mongoose");
const Category = require("./Category");

const courseSchema = new mongoose.Schema({
  courseName:{
    type:String,
    trim:true,
    required:true,
  },


  courseDescription:{
    type:String,
    trim:true,
  },

  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },

  whatYouWillLearn:{
    type:String,
  },

  courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
  }],

  ratingAndReviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews",
    }
  ],

  price:{
    type:Number,

  },

  thumbnail:{
     type:String,

  },

  category:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  }],

  studentsEnrolled:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }
  ],

  tag:{
    type:[String],
    required:true,
  },

  status:{
     type:String,
     enum:["Draft", "Published"],
  }
   
})

module.exports = mongoose.model("Course",  courseSchema);