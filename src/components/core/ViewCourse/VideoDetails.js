import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCirclePlay } from "react-icons/fa6";
import { markLectureAsCompleted } from "../../../services/operations/courseAPI";
import { updateCompletedLectures } from "../../../Slices/viewCourseSlice";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const location = useLocation();

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!courseSectionData.length) return;
    if (!courseId || !sectionId || !subSectionId) {
      navigate("/enrolled-courses");
      return;
    }

    const currentSection = courseSectionData.find(
      (section) => section._id === sectionId
    );

    const currentVideo = currentSection?.subSection.find(
      (video) => video._id === subSectionId
    );

    setVideoData(currentVideo);
    setVideoEnded(false);
    setIsPlaying(false);

    console.log("Current Video Data:", currentVideo);
    console.log("Video URL:", currentVideo?.videoUrl);
  }, [courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subIndex = courseSectionData?.[sectionIndex]?.subSection.findIndex(
      (vid) => vid._id === subSectionId
    );
    return sectionIndex === 0 && subIndex === 0;
  };

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subIndex = courseSectionData?.[sectionIndex]?.subSection.findIndex(
      (vid) => vid._id === subSectionId
    );
    const totalSubSections =
      courseSectionData?.[sectionIndex]?.subSection.length;
    return (
      sectionIndex === courseSectionData.length - 1 &&
      subIndex === totalSubSections - 1
    );
  };

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subIndex = courseSectionData?.[sectionIndex]?.subSection.findIndex(
      (vid) => vid._id === subSectionId
    );
    const section = courseSectionData[sectionIndex];

    if (subIndex < section.subSection.length - 1) {
      const nextSubId = section.subSection[subIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${section._id}/sub-section/${nextSubId}`
      );
    } else {
      const nextSection = courseSectionData[sectionIndex + 1];
      if (nextSection) {
        const nextSubId = nextSection.subSection[0]._id;
        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubId}`
        );
      }
    }
  };

  const goToPreviousVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subIndex = courseSectionData?.[sectionIndex]?.subSection.findIndex(
      (vid) => vid._id === subSectionId
    );

    if (subIndex > 0) {
      const prevSubId =
        courseSectionData[sectionIndex]?.subSection[subIndex - 1]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubId}`
      );
    } else if (sectionIndex > 0) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const prevSubId = prevSection.subSection.slice(-1)[0]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSubId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsCompleted({ courseId, subSectionId }, token);
    console.log("Completion Response:", res);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="w-full px-6 py-6 space-y-6 text-white">
      {!videoData ? (
        <p className="text-center text-lg">No video data available</p>
      ) : (
        <>
          {/* ▶️ Video Section */}
          <div className="aspect-video relative shadow-lg rounded-xl overflow-hidden border border-richblack-600">
            <video
              ref={playerRef}
              src={videoData.videoUrl}
              controls
              className="w-full h-full object-cover"
              onEnded={() => {
                setVideoEnded(true);
                setIsPlaying(false);
              }}
            />

            {/* ▶️ Play Overlay Button */}
            {!isPlaying && (
              <button
                onClick={() => {
                  setIsPlaying(true);
                  playerRef.current?.play();
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-all"
              >
                <FaRegCirclePlay className="text-white text-7xl hover:scale-110 transition-transform duration-300" />
              </button>
            )}

            {/* 🎬 Action Buttons Overlay */}
            {videoEnded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 z-10 px-4">
                <div className="flex flex-wrap justify-center gap-4">
                  {!completedLectures.includes(subSectionId) && (
                    <button
                      onClick={handleLectureCompletion}
                      disabled={loading}
                      className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
                    >
                      {loading ? "Processing..." : "Mark as Completed"}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (playerRef.current) {
                        playerRef.current.currentTime = 0;
                        playerRef.current.play();
                        setVideoEnded(false);
                        setIsPlaying(true);
                      }
                    }}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Replay Video
                  </button>

                  {!isFirstVideo() && (
                    <button
                      onClick={goToPreviousVideo}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Previous Video
                    </button>
                  )}

                  {!isLastVideo() && (
                    <button
                      onClick={goToNextVideo}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Next Video
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 📄 Title and Description */}
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">
              {videoData.title || "Untitled Video"}
            </h1>
            <p className="text-richblack-200">
              {videoData.description || "No description available."}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetails;
