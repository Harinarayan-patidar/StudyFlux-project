import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

  const { courseId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      setLoading(true);

      const response = await getFullCourseDetails(courseId, token);
      console.log("courseData", response);

      if (!response.success || !response.data) {
        console.error("Failed to fetch course data");
        setLoading(false);
        return;
      }

      const { courseDetails, totalDuration, completedVideos } = response.data;

      if (!Array.isArray(courseDetails?.courseContent)) {
        console.error("courseContent is not an array");
        setLoading(false);
        return;
      }

      dispatch(setCourseSectionData(courseDetails.courseContent));
      dispatch(setCourseEntireData(courseDetails));
      dispatch(setCompletedLectures(completedVideos || []));

      let lectures = 0;
      courseDetails.courseContent.forEach((section) => {
        lectures += section?.subSection?.length || 0;
      });

      dispatch(setTotalNoOfLectures(lectures));
      setLoading(false);
    };

    setCourseSpecificDetails();
  }, [courseId, token, dispatch]);

  return (
    <div className="flex min-h-screen text-white bg-richblack-900">
      {loading ? (
        <div className="flex w-full h-screen justify-center items-center">
          <p className="text-xl">Loading course...</p>
        </div>
      ) : (
        <>
          {/* Left Sidebar */}
          <div  className="w-[300px] border-r border-richblack-700">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
           </div>
          {/* Right Content */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>

          {/* Review Modal */}
          {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
      )}
    </div>
  );
};

export default ViewCourse;
