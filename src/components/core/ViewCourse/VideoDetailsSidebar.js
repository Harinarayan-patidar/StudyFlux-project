import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData = [],
    completedLectures = [],
    courseEntireData,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!Array.isArray(courseSectionData) || !sectionId || !subSectionId) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex =
      courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );

    const activeSubSectionId =
      courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, courseEntireData, location.pathname,sectionId, subSectionId]);

  return (
    <div className="h-full overflow-y-auto px-4 py-3 bg-black text-white scrollbar-thin scrollbar-thumb-yellow-300">
      {/* Header Section */}
      <div className="mb-5 space-y-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/my-courses")}
            className="text-sm text-yellow-400 hover:underline"
          >
            ← Back to Courses
          </button>
          <button
            onClick={() => setReviewModal(true)}
            className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Add Review
          </button>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-lg truncate">
            {courseEntireData?.courseName || "Course Title"}
          </p>
          <p className="text-sm text-richblack-200">
            {completedLectures.length} / {totalNoOfLectures} Completed
          </p>
        </div>
      </div>

      {/* Section and SubSection List */}
      <div className="space-y-4">
        {courseSectionData.map((section, index) => (
          <div key={index}>
            {/* Section Title Toggle */}
            <div
              className="flex justify-between items-center cursor-pointer px-2 py-2 bg-richblack-700 rounded-md hover:bg-richblack-600 transition-all"
              onClick={() =>
                setActiveStatus(activeStatus === section._id ? "" : section._id)
              }
            >
              <span className="font-semibold text-yellow-400">
                {section.sectionName}
              </span>
              {activeStatus === section._id ? (
                <FiChevronUp className="text-yellow-300" />
              ) : (
                <FiChevronDown className="text-yellow-300" />
              )}
            </div>

            {/* Subsection List */}
            {activeStatus === section._id && (
              <div className="mt-2 space-y-1 pl-3 border-l border-yellow-400">
                {section?.subSection?.map((topic, subIndex) => (
                  <div
                    key={subIndex}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer group transition-all duration-200 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-400 text-black font-bold"
                        : "hover:bg-richblack-800 text-white"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic._id)}
                      readOnly
                      className="accent-yellow-400"
                    />
                    <span className="truncate">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
