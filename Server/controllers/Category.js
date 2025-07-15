const { response } = require("express");
const Category = require("../models/Category");

// create tag ka handler function


exports.createCategory = async (req , res)=>{
    try {
        // fetch data
        
        const {name , description} = req.body;
        
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"please enter name and description of tag",
            });
        }
        console.log("step3 done")
        //create DB entry
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        })
        console.log(" step- 4 done")
        console.log(categoryDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Category created successfuly",
        })
    

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//get all tags

exports.showAllCategory = async (req , res)=>{
    try {
        const allCategories = await Category.find({}, {name:true , description:true});
         res.status(200).json({
            success:true,
            message:"All Categories return successfully",
            data:allCategories,
         })
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
  try {
    // get categoryId from query params instead of body
    const { categoryId } = req.query;

   const selectedCategory = await Category.findById(categoryId)
  .populate("course")  // ✅ matches the schema
  .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    const differentCategories = await Category.find({ _id: { $ne: categoryId } })
  .populate("course") // ✅ same fix
  .exec();

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
      message: "Finding different category and selected category course successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
