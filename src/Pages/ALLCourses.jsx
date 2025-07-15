import React, { useEffect, useState } from "react";
import { getAllCourses } from '../services/operations/courseAPI';

function ALLCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        console.log("Fetched courses:", response);

        if (response?.data?.success) {
          setAllCourses(response.data.data);
        } else {
          setError(response.data?.message || "Failed to fetch courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">All Courses</h1>

      {loading && <p className="text-center text-gray-400">Loading courses...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {allCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transform transition-all duration-300"
          >
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold">{course.courseName}</h2>
              <p className="text-sm text-gray-300">{course.courseDescription}</p>
              <p className="text-sm">
                <b>What You’ll Learn:</b> {course.whatYouWillLearn}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-400 font-bold">${course.price}</span>
                <button className="bg-yellow-400 text-black font-semibold py-1 px-4 rounded-lg hover:bg-yellow-300 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ALLCourses;
