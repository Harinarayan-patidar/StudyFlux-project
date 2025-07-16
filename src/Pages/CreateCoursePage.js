import React, { useEffect, useState } from "react";
import CreateCourseMultiStage from "../components/Common/courseUploade/MultiStageForm"; // Adjust path as needed
import {
  fetchCategories,
  createCourse,
  createSection,
  createSubsection,
} from "../services/operations/courseAPI"; // Adjust path as needed
import toast from "react-hot-toast";

export default function CreateCoursePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State for initial category loading
  const [submitLoading, setSubmitLoading] = useState(false); // New state for form submission loading

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const res = await fetchCategories();
        console.log("fetchCategories response:", res);
        if (res?.success) {
          setCategories(res.data);
        } else {
          toast.error(res?.message || "Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  async function handleSubmit(formStateFromMultiStage) {
    let courseId = null; // To store course ID for subsequent calls
    const toastId = toast.loading("Submitting course data...");
    setSubmitLoading(true); // Set loading true at the start of submission

    try {
      // 1. Create Course (Main Course Details & Thumbnail)
      const courseFormData = new FormData();
      courseFormData.append("courseName", formStateFromMultiStage.courseName);
      courseFormData.append("courseDescription", formStateFromMultiStage.courseDescription);
      courseFormData.append("whatYouWillLearn", formStateFromMultiStage.whatYouWillLearn);
      courseFormData.append("price", formStateFromMultiStage.price);
      courseFormData.append("category", formStateFromMultiStage.category);
      
      if (formStateFromMultiStage.thumbnail) {
        courseFormData.append("thumbnail", formStateFromMultiStage.thumbnail);
      } else {
        console.warn("Thumbnail is missing from form data.");
        throw new Error("Course thumbnail is required."); // Enforce if not caught by form validation
      }

      console.log("Sending course details to backend...");
      // For debugging FormData, convert to a plain object (won't show file content)
      const formDataDebug = {};
      for (let [key, value] of courseFormData.entries()) {
        formDataDebug[key] = key === "thumbnail" ? value.name : value;
      }
      console.log("Course FormData prepared:", formDataDebug);

      const courseRes = await createCourse(courseFormData);
      console.log("Response from createCourse API call:", courseRes);

      if (!courseRes?.success) {
        throw new Error(courseRes?.message || "Course creation failed.");
      }
      courseId = courseRes.data._id; // Get the ID of the newly created course
      toast.success("Course details saved!");

      // 2. Loop through sections and create them
      console.log("Starting section creation loop...");
      for (const section of formStateFromMultiStage.sections) {
        console.log(`Attempting to create section: "${section.title}" for course ${courseId}`);
        const sectionRes = await createSection(
          section.title, // Map frontend 'title' to backend 'sectionName'
          courseId
        );

        console.log(`Section creation response for "${section.title}":`, sectionRes);

        if (!sectionRes?.success) {
          throw new Error(`Failed to create section: "${section.title}".`);
        }
        // Assuming createSection returns the ID of the newly created section directly
        const sectionId = sectionRes.data._id;
        toast.success(`Section "${section.title}" created!`);

        // 3. Loop through subsections within each section and create them
        console.log(`Starting subsection creation loop for section: "${section.title}" (${sectionId})`);
        for (const sub of section.subsections) {
          const subsectionFormData = new FormData();
          subsectionFormData.append("sectionId", sectionId); // Attach to the newly created section
          subsectionFormData.append("title", sub.title);
          subsectionFormData.append("description", sub.description);
          
          // Assuming timeDuration is needed by backend and is a static value for now or derived later
          // You might need to adjust this if you collect actual video duration in the frontend
          subsectionFormData.append("timeDuration", "00:01:00"); // Placeholder

          if (sub.video) {
            subsectionFormData.append("video", sub.video); // Ensure 'video' is the actual file object
          } else {
            console.warn(`Video file missing for subsection "${sub.title}".`);
            throw new Error(`Video file required for subsection: "${sub.title}".`); // Enforce if not caught by form validation
          }

          console.log(`Attempting to create subsection: "${sub.title}" for section ${sectionId}`);
          const subFormDataDebug = {};
          for (let [key, value] of subsectionFormData.entries()) {
            subFormDataDebug[key] = key === "video" ? value.name : value;
          }
          console.log("Subsection FormData prepared:", subFormDataDebug);

          const subsectionRes = await createSubsection(subsectionFormData);
          
          console.log(`Subsection creation response for "${sub.title}":`, subsectionRes);

          if (!subsectionRes?.success) {
            throw new Error(`Failed to create subsection: "${sub.title}".`);
          }
          toast.success(`Subsection "${sub.title}" added!`);
        }
      }
      console.log("every thing done")
      toast.success("Course and all its content created successfully!");
      // Optionally: Redirect the user to the course details page or dashboard
      // navigate(`/dashboard/my-courses/${courseId}`);
      
      // Consider clearing the form in the CreateCourseMultiStage component after successful submission
      // Or you might handle a redirect/state clear in the parent based on your app's flow.

    } catch (error) {
      console.error("Caught error in handleSubmit:", error);
      toast.error(error.message || "Failed to create course. Please try again.");
    } finally {
      toast.dismiss(toastId);
      setSubmitLoading(false); // Reset loading state
      console.log("Course creation process finished.");
    }
  }

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading categories...</div>;
  }

  return (
    <div className="p-6">
      <CreateCourseMultiStage
        categories={categories}
        onSubmit={handleSubmit}
        // Pass submitLoading to disable buttons in child form during API calls
        submitLoading={submitLoading}
      />
    </div>
  );
}