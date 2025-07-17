import React, { useEffect, useState } from "react";
import { getAllCourses } from "../services/operations/courseAPI";

function ALLCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        console.log("Fetched courses:", response);

        if (response?.success) {
          setAllCourses(response.data);
        } else {
          setError(response?.message || "Failed to fetch courses");
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 px-4 sm:px-6 lg:px-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-white tracking-wide">
        📚 Explore All Courses
      </h1>

      {loading && (
        <p className="text-center text-gray-300 text-lg animate-pulse">
          Loading courses...
        </p>
      )}
      {error && (
        <p className="text-center text-red-400 text-lg font-semibold">
          {error}
        </p>
      )}

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {allCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white/10 border border-white/20 text-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-yellow-300/40 transition-transform duration-300 ease-in-out backdrop-blur-md"
          >
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-2xl font-bold text-yellow-400 hover:underline">
                {course.courseName}
              </h2>
              <p className="text-sm text-gray-300 line-clamp-3">
                {course.courseDescription}
              </p>
              <p className="text-sm text-gray-200">
                <span className="font-semibold text-white">What You’ll Learn:</span>{" "}
                {course.whatYouWillLearn}
              </p>
              <p className="text-green-400 font-semibold text-lg mt-3">
                ₹{course.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {allCourses.length === 0 && !loading && !error && (
        <p className="text-center text-gray-400 mt-10">No courses found.</p>
      )}
    </div>
  );
}

export default ALLCourses;
