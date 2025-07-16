import React, { useEffect, useState } from "react";
import { getEnrolledCourses, getCourseProgress } from "../services/operations/courseAPI";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCoursesWithProgress() {
      const result = await getEnrolledCourses();
      if (result.success) {
        const courseList = result.data;
        setCourses(courseList);

        const progressPromises = courseList.map((course) =>
          getCourseProgress(course._id)
        );

        const progressResults = await Promise.all(progressPromises);

        const progressData = {};
        progressResults.forEach((res, index) => {
          const courseId = courseList[index]._id;
          if (res.success && res.data) {
            const completed = res.data.completedVideos.length || 0;
            const total = courseList[index].courseContent?.reduce((total, section) => {
              return total + (section.subSection?.length || 0);
            }, 0) || 1;
            progressData[courseId] = {
              completed,
              total,
              percentage: Math.round((completed / total) * 100)
            };
          } else {
            progressData[courseId] = { completed: 0, total: 1, percentage: 0 };
          }
        });

        setProgressMap(progressData);
      }

      setLoading(false);
    }

    fetchCoursesWithProgress();
  }, []);

  const handleCourseClick = (course) => {
    const courseId = course._id;
    const section = course?.courseContent?.[0];
    const sectionId = section?._id;
    const subSectionId = section?.subSection?.[0]?._id;

    if (courseId && sectionId && subSectionId) {
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`);
    } else if (courseId && sectionId) {
      navigate(`/view-course/${courseId}/section/${sectionId}`);
    } else {
      navigate(`/view-course/${courseId}`);
    }
  };

  if (loading)
    return <p className="text-center mt-6 text-white text-lg">Loading enrolled courses...</p>;

  return (
    <div className="p-4 sm:p-6 w-full max-w-6xl mx-auto min-h-screen rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">Your Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p className="text-center text-white">No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {courses.map((course) => {
            const progress = progressMap[course._id] || {
              completed: 0,
              total: 1,
              percentage: 0
            };

            return (
              <div
                key={course._id}
                onClick={() => handleCourseClick(course)}
                className="cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border border-gray-700 bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/30"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-28 h-32 sm:h-20 overflow-hidden rounded-md border border-gray-600">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">{course.courseName}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{course.courseDescription}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Lectures: {progress.total}, Completed: {progress.completed}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full sm:w-1/3">
                  <p className="text-sm text-gray-200 mb-1">Progress</p>
                  <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs text-gray-400 mt-1">
                    {progress.percentage}% complete
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;