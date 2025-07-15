import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryPageDetails } from "../services/operations/courseAPI";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex space-x-1 mt-auto cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={(e) => {
            e.stopPropagation(); // prevent navigating when clicking stars
            setRating(star);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? "yellow" : "none"}
          viewBox="0 0 24 24"
          stroke="yellow"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1
            1 0 00.95.69h4.162c.969 0 1.371
            1.24.588 1.81l-3.37 2.448a1 1 0 00-.364
            1.118l1.286 3.955c.3.921-.755
            1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175
            0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.955a1 1
            0 00-.364-1.118L2.98 9.382c-.783-.57-.38-1.81.588-1.81h4.163a1 1
            0 00.95-.69l1.286-3.955z"
          />
        </svg>
      ))}
    </div>
  );
};

const CategoryCourses = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryCourses = async () => {
      if (!categoryId) {
        setError("Category ID is missing");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await getCategoryPageDetails(categoryId);
        if (res.success) {
          setCategoryData(res.data);
        } else {
          setError(res.message || "Failed to fetch category details");
          setCategoryData(null);
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        setCategoryData(null);
      }
      setLoading(false);
    };

    fetchCategoryCourses();
  }, [categoryId]);

  if (!categoryId) return <div>Category ID is required</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!categoryData || !categoryData.selectedCategory)
    return <div>No data found</div>;

  const { selectedCategory } = categoryData;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center">
      <h2 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg">
        {selectedCategory.name}
      </h2>
      <p className="mb-12 max-w-3xl text-center text-white text-lg opacity-80">
        {selectedCategory.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {selectedCategory.course && selectedCategory.course.length > 0 ? (
          selectedCategory.course.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/courses/${course._id}`)}
              className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-lg shadow-black/70
                         flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl
                         hover:shadow-black/90 cursor-pointer"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-44 object-cover rounded-t-xl"
              />
              <div className="flex flex-col flex-grow p-6 gap-3 text-white">
                <h3 className="text-2xl font-semibold drop-shadow-md">
                  {course.courseName}
                </h3>
                <p className="text-yellow-400 font-bold text-lg">
                  ₹{course.price}
                </p>
                <p className="text-sm opacity-80 line-clamp-3">
                  {course.courseDescription}
                </p>

                {/* Star rating */}
                <StarRating />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-white text-xl opacity-70">
            No courses found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCourses;
