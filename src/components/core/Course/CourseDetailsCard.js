import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegShareSquare } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { addToCart } from '../../../Slices/cartSlice';

function CourseDetailsCard({ courseData, handleBuyCourse, setConformationModal }) {
  // ✅ Always call hooks at the top
  const tokenFromRedux = useSelector((state) => state.auth.token);
  const userFromRedux = useSelector((state) => state.profile.user);
  const token = localStorage.getItem('token') || tokenFromRedux;
  const user = JSON.parse(localStorage.getItem('user')) || userFromRedux;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!courseData) return null; // ✅ OK now — hooks were already called

  const isEnrolled = user && courseData?.studentsEnrolled?.includes(user._id);

 const handleAddToCart=()=>{
    if(user && user.accoutType === "Instructor"){
      toast.error("Instructors cannot add courses to cart");
      return;
    }
    if (!token || !user) {
      toast.error("Please login to add courses to cart");
      return;
    }
    if(token && user){
      dispatch(addToCart({
         _id: courseData._id,
         courseName: courseData.courseName,
         price: courseData.price,
         thumbnail: courseData.thumbnail,
       }));
      return;
    }

    setConformationModal({
      text1: "You are not logged in",
      text2: "Please login to add this course to cart",
      btn1text: "Login",
      btn2text: "Cancel",
       
 })
}

 const handleShare = () => {
  console.log("Clicked Share");
  copy(window.location.href);
  toast.success("Course link copied to clipboard!");
}



  return (
    <div className="w-full max-w-sm bg-gray-800 text-white rounded-xl items-center shadow-xl pb-2 mt-10 animate-scaleIn">
      {/* Course Thumbnail */}
      <div className="w-full h-48 overflow-hidden rounded-md ">
        <img
          src={courseData.thumbnail}
          alt="Course Thumbnail"
          className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Price */}
      <div className="text-2xl font-bold mt-2 text-green-400 mb-4">
        ₹{courseData.price}
      </div>

      {/* Buy or Go to Course Button */}
      <div className='items-center text-center flex flex-col gap-2 '>
        <button
          onClick={
            isEnrolled
              ? () => navigate('/my-courses')
              : handleBuyCourse
          }
          className={`w-fit px-7 py-1 rounded-md text-lg items-center font-semibold transition-all duration-200 ${
            isEnrolled
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-yellow-400 hover:bg-yellow-300 text-richblack-900'
          }`}
        >
          {isEnrolled ? 'Go to Course' : 'Buy Now'}
        </button>

       {
        (!courseData?.studentsEnrolled.includes(user._id) &&(
            <button className='w-fit px-5 py-1 my-2 rounded-md items-center text-lg font-semibold transition-all duration-200
            bg-yellow-400 hover:bg-yellow-300 text-richblack-900'
            onClick={handleAddToCart}>
                add to cart
            </button>
        )
        )
       }


      </div>

       <div className='items-center text-center'>
         <p>20-days money back guarantee</p>
       </div>

       <div 
          onClick={handleShare}
            className='flex items-center justify-center gap-2 mt-4 text-mintgreen cursor-pointer hover:text-yellow-400 transition-colors duration-200'
          >
          <FaRegShareSquare />
         <span>Share</span>
        </div>


    </div>
  );
}

export default CourseDetailsCard;
