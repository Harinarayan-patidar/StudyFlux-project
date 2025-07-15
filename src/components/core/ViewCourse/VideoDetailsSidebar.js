import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();

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
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="p-4 bg-richblack-800 text-white">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => navigate("/my-courses")}>← Back</button>
          <button onClick={() => setReviewModal(true)}>Add Review</button>
        </div>

        <div>
          <p className="font-bold">{courseEntireData?.courseName || "Course Title"}</p>
          <p>
            {completedLectures.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sections & SubSections */}
      <div className="space-y-4">
        {courseSectionData.map((section, index) => (
          <div key={index}>
            {/* Section Title */}
            <div
              className="cursor-pointer font-semibold"
              onClick={() => setActiveStatus(section._id)}
            >
              {section.sectionName}
            </div>

            {/* Subsections */}
            {activeStatus === section._id && (
              <div className="ml-4 mt-2 space-y-2">
                {section.subSection.map((topic, subIndex) => (
                  <div
                    key={subIndex}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                      videoBarActive === topic._id
                        ? "bg-yellow-400 text-richblack-900"
                        : "bg-black text-white"
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
                    />
                    <span>{topic.title}</span>
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
