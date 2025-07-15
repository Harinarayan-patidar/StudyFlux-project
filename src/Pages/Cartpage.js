import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, resetCart } from "../Slices/cartSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCourseDetails } from "../services/operations/courseAPI";
import { buyCourse } from "../services/operations/studentfeaturesApI"; // ✅ FIXED

function CartPage() {
  const { cart, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState([]);
  const tokenFromRedux = useSelector((state) => state.auth.token);
    const userFromRedux = useSelector((state) => state.profile.user);
  // const { user, token } = useSelector((state) => state.auth);
   const token = localStorage.getItem('token') || tokenFromRedux;
  const user = JSON.parse(localStorage.getItem('user')) || userFromRedux;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const details = await Promise.all(
        cart.map(async (item) => {
          const response = await getCourseDetails(item._id); // ✅ FIXED
          return response.success ? response.data : null;
        })
      );
      setCourseDetails(details.filter(Boolean));
    };

    if (cart.length > 0) fetchCourseDetails();
  }, [cart]);

  const handleRemove = (courseId) => {
    dispatch(removeFromCart(courseId));
  };

 
  console.log("token:", token);
  console.log("user:", user);
console.log("Token type and value:", typeof token, token);


  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
    }
    const courses = cart.map((item) => item._id);
   buyCourse(courses, token, user, navigate, dispatch); // ✅ Correct order

      return;

  };

  const totalPrice = courseDetails.reduce((acc, course) => acc + course.price, 0);

  return (
    <div className="min-h-screen bg-richblack-900 py-10 px-5 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Your Cart</h1>

          <div className="mt-4 md:mt-0 p-4 bg-richblack-800 rounded-lg shadow-xl w-full md:w-auto">
            <p className="mb-2">Total Items: {totalItems}</p>
            <p className="mb-4 text-green-400 text-xl font-semibold">
              Total: ₹{totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleBuyNow}
              className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-300 text-richblack-900 font-bold py-2 px-6 rounded-md transition-all"
            >
              Buy Now
            </button>
          </div>
        </div>

        {courseDetails.length === 0 ? (
          <p className="text-lg text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {courseDetails.map((course) => (
              <div
                key={course._id}
                className="bg-richblack-800 p-5 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                <p className="text-lg text-green-400 font-bold mb-2">₹{course.price}</p>
                <button
                  onClick={() => handleRemove(course._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition-all"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
