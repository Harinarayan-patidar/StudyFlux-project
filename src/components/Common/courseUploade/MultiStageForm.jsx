import React, { useState } from "react";
import toast from "react-hot-toast"; // Assuming toast is available for client-side feedback

export default function CreateCourseMultiStage({ categories, onSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    category: "", // This will hold the category _id
    thumbnail: null, // File object
    sections: [], // Array of { title, subsections: [{ title, description, video }] }
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [errors, setErrors] = useState({}); // For client-side validation errors

  // Helper to safely get nested errors
  const getNestedError = (path) => {
    return errors[path];
  };

  // Handle input changes including files
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      const file = files[0];
      setForm((f) => ({ ...f, thumbnail: file }));
      setThumbnailPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    // Clear error for the changed field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  // Section title change
  const handleSectionTitleChange = (index, value) => {
    const newSections = [...form.sections];
    newSections[index] = { ...newSections[index], title: value };
    setForm((f) => ({ ...f, sections: newSections }));
    // Clear error for this specific section title
    setErrors((prevErrors) => ({ ...prevErrors, [`section_${index}_title`]: undefined }));
  };

  // Add Section
  const addSection = () => {
    setForm((f) => ({
      ...f,
      sections: [...f.sections, { title: "", subsections: [] }],
    }));
  };

  // Remove Section
  const removeSection = (index) => {
    const newSections = [...form.sections];
    newSections.splice(index, 1);
    setForm((f) => ({ ...f, sections: newSections }));
    // Clear errors related to the removed section
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`section_${index}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  // Add Subsection
  const addSubsection = (sectionIndex) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].subsections.push({
      title: "",
      description: "",
      video: null, // File object
      videoPreview: null, // URL for preview
    });
    setForm((f) => ({ ...f, sections: newSections }));
  };

  // Remove Subsection
  const removeSubsection = (sectionIndex, subsectionIndex) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].subsections.splice(subsectionIndex, 1);
    setForm((f) => ({ ...f, sections: newSections }));
    // Clear errors related to the removed subsection
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`section_${sectionIndex}_sub_${subsectionIndex}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  // Handle Subsection changes (title, description, video)
  const handleSubsectionChange = (sectionIndex, subsectionIndex, field, value) => {
    const newSections = [...form.sections];
    const sub = newSections[sectionIndex].subsections[subsectionIndex];

    if (field === "video") {
      const file = value[0]; // value will be e.target.files
      newSections[sectionIndex].subsections[subsectionIndex] = {
        ...sub,
        video: file || null,
        videoPreview: file ? URL.createObjectURL(file) : null,
      };
    } else {
      newSections[sectionIndex].subsections[subsectionIndex] = {
        ...sub,
        [field]: value,
      };
    }
    setForm((f) => ({ ...f, sections: newSections }));
    // Clear error for this specific subsection field
    setErrors((prevErrors) => ({ ...prevErrors, [`section_${sectionIndex}_sub_${subsectionIndex}_${field}`]: undefined }));
  };


  // Validation per step
  const validateStep = () => {
    let errs = {};

    if (step === 1) {
      if (!form.courseName.trim()) errs.courseName = "Course Name is required";
      if (!form.courseDescription.trim())
        errs.courseDescription = "Course Description is required";
    } else if (step === 2) {
      if (!form.whatYouWillLearn.trim()) errs.whatYouWillLearn = "This field is required";
      if (!form.price || Number(form.price) <= 0) errs.price = "Valid price is required"; // Adjusted to >= 0
      if (!form.category) errs.category = "Please select a category";
    } else if (step === 3) {
      if (!form.thumbnail) errs.thumbnail = "Thumbnail image is required";
    } else if (step === 4) {
      if (form.sections.length === 0) {
        errs.sections = "At least one section is required";
      } else {
        form.sections.forEach((section, i) => {
          if (!section.title.trim()) errs[`section_${i}_title`] = "Section title is required";
          if (!section.subsections.length) {
            errs[`section_${i}_subsections`] = "Add at least one subsection";
          } else {
            section.subsections.forEach((sub, j) => {
              if (!sub.title.trim()) errs[`section_${i}_sub_${j}_title`] = "Subsection title required";
              if (!sub.description.trim()) errs[`section_${i}_sub_${j}_desc`] = "Description required";
              if (!sub.video) errs[`section_${i}_sub_${j}_video`] = "Video file required";
            });
          }
        });
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Navigation
  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on next step
    } else {
      toast.error("Please fill all required fields before proceeding.");
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on prev step
  };

  // On final form submit - pass the entire form state to the parent's onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    // Call the onSubmit prop passed from the parent, passing the full form state
    onSubmit(form);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a New Course</h2>

      {/* Progress bar */}
      <div className="flex mb-8 space-x-2">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`flex-1 h-2 rounded ${step >= num ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="courseName" className="block mb-2 font-semibold text-gray-700">
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={form.courseName}
                onChange={handleChange}
                className={`w-full border ${errors.courseName ? "border-red-500" : "border-gray-300"} p-3 rounded`}
                placeholder="Enter course title"
              />
              {errors.courseName && <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>}
            </div>

            <div>
              <label htmlFor="courseDescription" className="block mb-2 font-semibold text-gray-700">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={form.courseDescription}
                onChange={handleChange}
                className={`w-full border ${errors.courseDescription ? "border-red-500" : "border-gray-300"} p-3 rounded`}
                rows={4}
                placeholder="Briefly describe your course"
              />
              {errors.courseDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.courseDescription}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: What You'll Learn, Price, Category */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="whatYouWillLearn" className="block mb-2 font-semibold text-gray-700">
                What You'll Learn <span className="text-red-500">*</span>
              </label>
              <textarea
                id="whatYouWillLearn"
                name="whatYouWillLearn"
                value={form.whatYouWillLearn}
                onChange={handleChange}
                className={`w-full border ${errors.whatYouWillLearn ? "border-red-500" : "border-gray-300"} p-3 rounded`}
                rows={3}
                placeholder="List key learning outcomes"
              />
              {errors.whatYouWillLearn && <p className="text-red-500 text-sm mt-1">{errors.whatYouWillLearn}</p>}
            </div>

            <div>
              <label htmlFor="price" className="block mb-2 font-semibold text-gray-700">
                Price (USD) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                className={`w-full border ${errors.price ? "border-red-500" : "border-gray-300"} p-3 rounded`}
                placeholder="Enter course price"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`w-full border ${errors.category ? "border-red-500" : "border-gray-300"} p-3 rounded`}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Thumbnail Upload */}
        {step === 3 && (
          <div className="space-y-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Course Thumbnail <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              accept="image/*"
              onChange={handleChange}
              className={`w-full p-2 border rounded cursor-pointer ${
                errors.thumbnail ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-4 max-h-48 rounded object-contain"
              />
            )}
          </div>
        )}

        {/* Step 4: Sections & Subsections */}
        {step === 4 && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">Sections & Subsections</h3>
              <button
                type="button"
                onClick={addSection}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                + Add Section
              </button>
            </div>

            {getNestedError('sections') && (
              <p className="text-red-500 mb-4 font-semibold">{getNestedError('sections')}</p>
            )}

            {form.sections.length === 0 && (
              <p className="text-gray-600">No sections added yet.</p>
            )}

            {form.sections.map((section, si) => (
              <div
                key={si}
                className="mb-8 border border-gray-300 rounded p-4 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="text-lg font-semibold">
                    Section {si + 1} Title <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeSection(si)}
                    className="text-red-600 font-bold hover:text-red-800"
                    aria-label={`Remove Section ${si + 1}`}
                  >
                    &times;
                  </button>
                </div>

                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleSectionTitleChange(si, e.target.value)}
                  placeholder="Enter section title"
                  className={`w-full p-2 border rounded ${
                    getNestedError(`section_${si}_title`) ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {getNestedError(`section_${si}_title`) && (
                  <p className="text-red-500 text-sm mt-1">{getNestedError(`section_${si}_title`)}</p>
                )}

                <div className="mt-4 mb-2 flex justify-between items-center">
                  <h4 className="font-semibold text-lg">Subsections</h4>
                  <button
                    type="button"
                    onClick={() => addSubsection(si)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    + Add Subsection
                  </button>
                </div>

                {getNestedError(`section_${si}_subsections`) && (
                  <p className="text-red-500 mb-2">{getNestedError(`section_${si}_subsections`)}</p>
                )}

                {section.subsections.map((sub, subi) => (
                  <div
                    key={subi}
                    className="mb-6 p-3 border border-gray-200 rounded bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-semibold">
                        Subsection {subi + 1}
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSubsection(si, subi)}
                        className="text-red-600 font-bold hover:text-red-800"
                        aria-label={`Remove Subsection ${subi + 1} from Section ${si + 1}`}
                      >
                        &times;
                      </button>
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        value={sub.title}
                        onChange={(e) =>
                          handleSubsectionChange(si, subi, "title", e.target.value)
                        }
                        placeholder="Subsection Title"
                        className={`w-full p-2 border rounded ${
                          getNestedError(`section_${si}_sub_${subi}_title`) ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {getNestedError(`section_${si}_sub_${subi}_title`) && (
                        <p className="text-red-500 text-sm mt-1">{getNestedError(`section_${si}_sub_${subi}_title`)}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <textarea
                        value={sub.description}
                        onChange={(e) =>
                          handleSubsectionChange(si, subi, "description", e.target.value)
                        }
                        placeholder="Subsection Description"
                        className={`w-full p-2 border rounded ${
                          getNestedError(`section_${si}_sub_${subi}_desc`) ? "border-red-500" : "border-gray-300"
                        }`}
                        rows={3}
                      />
                      {getNestedError(`section_${si}_sub_${subi}_desc`) && (
                        <p className="text-red-500 text-sm mt-1">{getNestedError(`section_${si}_sub_${subi}_desc`)}</p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold">Video Upload <span className="text-red-500">*</span></label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          handleSubsectionChange(si, subi, "video", e.target.files)
                        }
                        className={`w-full p-2 border rounded cursor-pointer ${
                          getNestedError(`section_${si}_sub_${subi}_video`) ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {getNestedError(`section_${si}_sub_${subi}_video`) && (
                        <p className="text-red-500 text-sm mt-1">{getNestedError(`section_${si}_sub_${subi}_video`)}</p>
                      )}
                      {sub.videoPreview && (
                        <video
                          controls
                          src={sub.videoPreview}
                          className="mt-3 max-h-40 rounded"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
              // Removed disabled={loading} as parent manages loading
            >
              Back
            </button>
          ) : (
            <div /> // Empty div to maintain spacing
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              // Removed disabled={loading} as parent manages loading
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              // Removed disabled={loading} as parent manages loading
            >
              Submit Course
            </button>
          )}
        </div>
      </form>
    </div>
  );
}