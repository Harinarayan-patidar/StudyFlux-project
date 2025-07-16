import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { getFullCourseDetails } from '../services/operations/courseAPI';
import {
  setCourseSectionData,
  setCourseEntireData,
  setCompletedLectures,
  setTotalNoOfLectures
} from '../Slices/viewCourseSlice';

import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { courseId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      setLoading(true);
      const response = await getFullCourseDetails(courseId, token);

      if (!response?.success || !response?.data) {
        console.error("Failed to fetch course data");
        setLoading(false);
        return;
      }

      const { courseDetails, completedVideos } = response.data;

      if (!Array.isArray(courseDetails?.courseContent)) {
        console.error("courseContent is not an array");
        setLoading(false);
        return;
      }

      dispatch(setCourseSectionData(courseDetails.courseContent));
      dispatch(setCourseEntireData(courseDetails));
      dispatch(setCompletedLectures(completedVideos || []));

      const totalLectures = courseDetails.courseContent.reduce(
        (acc, section) => acc + (section?.subSection?.length || 0),
        0
      );
      dispatch(setTotalNoOfLectures(totalLectures));
      setLoading(false);
    };

    setCourseSpecificDetails();
  }, [courseId, token, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-xl">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-richblack-900 text-white">
      {/* 🟨 Toggle Button (Mobile) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-16 left-4 z-[60] text-yellow-400 bg-black border border-yellow-400 rounded-full p-2 hover:scale-105 transition-all"
      >
        <FiMenu size={24} />
      </button>

      {/* 🟨 Sidebar (Desktop) */}
      <div className="hidden md:block w-[300px] border-r border-richblack-700 pt-14">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>

      {/* 🟨 Sidebar (Mobile Overlay) */}
      {isSidebarOpen && (
        <div className="fixed top-14 left-0 right-0 bottom-0 z-[60] flex md:hidden">
          {/* Backdrop */}
          <div
            className="w-full h-full bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar Panel */}
          <div className="w-[280px] max-w-[80%] bg-black h-full shadow-lg border-r border-yellow-400 relative z-[70] animate-slideIn">
            <button
              className="absolute bottom-4 right-4 text-yellow-400 hover:text-white text-2xl z-[80]"
              onClick={() => setIsSidebarOpen(false)}
            >
              <IoMdClose />
            </button>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
          </div>
        </div>
      )}

      {/* 🟨 Main Content */}
      <div className="flex-1 overflow-y-auto pt-14 px-2 md:px-0">
        <Outlet />
      </div>

      {/* 🟨 Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-[80] flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <CourseReviewModal setReviewModal={setReviewModal} />
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
