const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// Utility function to format duration from seconds to "mm:ss"
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// ==========================
// ✅ Create SubSection
// ==========================
// ==========================
// ✅ Create SubSection
// ==========================
exports.createSubsection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Upload video to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    // Extract duration from Cloudinary response
    const durationInSeconds = uploadDetails.duration || 0;
    const timeDuration = formatDuration(durationInSeconds);

    // Create subsection
    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    // --- CORRECTED LINE BELOW ---
    // Push into corresponding section
    console.log("Attempting to update section with ID:", sectionId); // This console.log is now outside the function arguments
    const updatedSection = await Section.findByIdAndUpdate( // Store the updated section if you need to return it or check it
      sectionId, // 1st argument: The ID
      { $push: { subSection: subSectionDetails._id } }, // 2nd argument: The update object
      { new: true } // 3rd argument: Options
    );

    // Optional: Log the updated section to verify
    console.log("Updated Section after adding subSection:", updatedSection);

    // Optional: Check if the section was found and updated
    if (!updatedSection) {
      console.warn(`Section with ID ${sectionId} not found when trying to add subsection.`);
      // You might want to return an error here, or decide if it's critical
    }


    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: subSectionDetails,
    });

  } catch (error) {
    console.error("Error in createSubsection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating subsection",
      error: error.message,
    });
  }
};

// ==========================
// ✏️ Update SubSection
// ==========================
exports.updateSubSection = async (req, res) => {
  try {
    const { title, description, subsectionId } = req.body;
    const video = req.files?.videoFile;

    if (!title || !description || !subsectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Upload new video
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    const durationInSeconds = uploadDetails.duration || 0;
    const timeDuration = formatDuration(durationInSeconds);

    // Update subsection
    const updatedSubsection = await SubSection.findByIdAndUpdate(
      subsectionId,
      {
        title,
        timeDuration,
        description,
        videoUrl: uploadDetails.secure_url,
      },
      { new: true }
    );

    if (!updatedSubsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSubsection,
    });

  } catch (error) {
    console.error("Error in updateSubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating subsection",
      error: error.message,
    });
  }
};

// ==========================
// 🗑️ Delete SubSection
// ==========================
exports.deleteSubsection = async (req, res) => {
  try {
    const { subSectionId } = req.params;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID is required.",
      });
    }

    // Remove reference from any section that contains this subsection
    await Section.updateMany(
      { subSection: subSectionId },
      { $pull: { subSection: subSectionId } }
    );

    // Delete the subsection
    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
    });

  } catch (error) {
    console.error("Error in deleteSubsection:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting subsection",
      error: error.message,
    });
  }
};
