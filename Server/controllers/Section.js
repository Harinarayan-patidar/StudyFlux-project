const Section = require("../models/Section");
const Course = require("../models/Course");

// ==============================
// Create Section
// ==============================
// In your createSection controller:
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        // Validate input
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section name and course ID are required.",
            });
        }

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found for the provided ID.",
            });
        }

        // Create section
        const newSection = await Section.create({ sectionName }); // <-- The newly created section

        // Push section to course content
        course.courseContent.push(newSection._id);
        await course.save();

        // No need to populate the whole course here if you just need the section ID for the frontend.
        // If you need the full updated course for other frontend display, you can still return it,
        // but for getting the sectionId, it's better to return the section itself.

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: newSection, // <-- Return the new section object directly!
        });
    } catch (error) {
        console.error("Error in createSection:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the section.",
            error: error.message,
        });
    }
};

// ==============================
// Update Section
// ==============================
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "Section ID and new name are required.",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section updated successfully.",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating section.",
      error: error.message,
    });
  }
};

// ==============================
// Delete Section
// ==============================
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section ID is required.",
      });
    }

    // Check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found.",
      });
    }

    // Remove section reference from any course
    await Course.updateMany(
      { courseContent: sectionId },
      { $pull: { courseContent: sectionId } }
    );

    // Delete the section itself
    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting section.",
      error: error.message,
    });
  }
};
