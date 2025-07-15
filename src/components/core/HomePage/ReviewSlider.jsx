import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import {
  Autoplay,
  Navigation,
  Pagination,
  FreeMode,
} from "swiper/modules";
import ReactStars from "react-stars";
import { motion } from "framer-motion";
import { getAllRating } from "../../../services/operations/courseAPI";

// Utility function to truncate text
const truncateText = (text, limit = 15) => {
  return text?.split(" ").length > limit
    ? text.split(" ").slice(0, limit).join(" ") + "..."
    : text;
};

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const result = await getAllRating();
      if (result?.success) {
        setReviews(result.reviews);
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="text-white w-full py-10 bg-richblack-700">
      <div className="max-w-7xl mx-auto px-4">
        

        <Swiper
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 40 },
          }}
          navigation={true}
          modules={[Navigation, Pagination, FreeMode, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          freeMode={{
            enabled: true,
            momentum: true,
          }}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-4 mx-2 min-h-[200px] flex flex-col justify-between hover:shadow-2xl"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.user?.image}
                    alt="user"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-semibold text-richblack-900">
                      {review.user?.firstName} {review.user?.lastName}
                    </p>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={24}
                      edit={false}
                      color2={"#ffd700"}
                    />
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-richblack-700 mb-4">
                  {truncateText(review.review)}
                </p>

                {/* Course Info */}
                {review.course && (
                  <div className="mt-2">
                    <h3 className="text-md font-semibold text-richblack-900">
                      Course: {review.course.courseName}
                    </h3>
                    <p className="text-xs text-richblack-700">
                      {truncateText(review.course.courseDescription, 20)}
                    </p>
                  </div>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
