import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import ReactStars from "react-stars";
import { motion } from "framer-motion";

import {
  FiBookOpen,
  FiCheckCircle,
  FiMessageCircle,
  FiStar,
} from "react-icons/fi";

import { getAllRating } from "../../../services/operations/courseAPI";

// ======================================================
// HELPERS
// ======================================================

const truncateText = (text = "", limit = 22) => {
  const words = text.trim().split(/\s+/);

  if (words.length <= limit) return text;

  return `${words.slice(0, limit).join(" ")}...`;
};

const getInitials = (user) => {
  const first = user?.firstName?.[0] || "";
  const last = user?.lastName?.[0] || "";

  return `${first}${last}`.toUpperCase() || "SF";
};

// ======================================================
// REVIEW CARD
// ======================================================

function ReviewCard({ review, index }) {
  const rating = Number(review?.rating || 0);

  const firstName = review?.user?.firstName || "StudyFlux";
  const lastName = review?.user?.lastName || "Learner";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.07, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className="
        group
        relative
        h-[330px]
        overflow-hidden
        rounded-[24px]
        border
        border-white/10
        bg-[#090909]
        p-5
        transition-colors
        duration-500

        hover:border-violet-500/30
      "
    >
      {/* ================================================
          BACKGROUND GRID
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-20
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ================================================
          HOVER GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-violet-600/0
          blur-[80px]
          transition-all
          duration-700

          group-hover:bg-violet-600/15
        "
      />

      {/* ================================================
          TOP ACCENT
      ================================================= */}

      <div
        className="
          absolute
          left-5
          right-5
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-violet-500/0
          to-transparent
          transition-all
          duration-500

          group-hover:via-violet-500/70
        "
      />

      {/* ================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
        "
      >
        {/* ==============================================
            USER HEADER
        =============================================== */}

        <div className="flex items-center gap-3">
          {/* Avatar */}

          <div className="relative shrink-0">
            {review?.user?.image ? (
              <img
                src={review.user.image}
                alt={`${firstName} ${lastName}`}
                className="
                  h-12
                  w-12
                  rounded-2xl
                  border
                  border-white/10
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-violet-500/25
                  bg-gradient-to-br
                  from-violet-500/20
                  to-cyan-500/10
                  text-xs
                  font-black
                  text-violet-300
                "
              >
                {getInitials(review?.user)}
              </div>
            )}

            {/* Verified dot */}

            <div
              className="
                absolute
                -bottom-1
                -right-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                border-[3px]
                border-[#090909]
                bg-cyan-400
              "
            >
              <FiCheckCircle
                size={9}
                className="text-black"
              />
            </div>
          </div>

          {/* Name */}

          <div className="min-w-0 flex-1">
            <h3
              className="
                truncate
                text-sm
                font-bold
                text-white
              "
            >
              {firstName} {lastName}
            </h3>

            <div
              className="
                mt-1
                flex
                items-center
                gap-1.5
              "
            >
              <FiCheckCircle
                size={10}
                className="shrink-0 text-cyan-400"
              />

              <span
                className="
                  truncate
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-zinc-500
                "
              >
                Verified Learner
              </span>
            </div>
          </div>

          {/* Rating pill */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              rounded-full
              border
              border-amber-400/15
              bg-amber-400/[0.07]
              px-2.5
              py-1.5
            "
          >
            <FiStar
              size={11}
              className="text-amber-400"
            />

            <span
              className="
                text-[10px]
                font-bold
                text-amber-300
              "
            >
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* ==============================================
            STARS
        =============================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
          "
        >
          <ReactStars
            count={5}
            value={rating}
            size={18}
            edit={false}
            color1="#27272a"
            color2="#facc15"
          />

          <span
            className="
              text-[10px]
              font-medium
              text-zinc-600
            "
          >
            {rating.toFixed(1)}/5
          </span>
        </div>

        {/* ==============================================
            REVIEW
        =============================================== */}

        <div className="mt-5">
          <div
            className="
              mb-2
              flex
              items-center
              gap-2
            "
          >
            <FiMessageCircle
              size={13}
              className="text-violet-400"
            />

            <span
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.16em]
                text-zinc-500
              "
            >
              Experience
            </span>
          </div>

          <p
            className="
              line-clamp-3
              text-[13px]
              leading-6
              text-zinc-300
            "
          >
            “
            {truncateText(
              review?.review ||
                "A great learning experience with practical content.",
              24
            )}
            ”
          </p>
        </div>

        {/* ==============================================
            COURSE CARD
        =============================================== */}

        {review?.course && (
          <motion.div
            whileHover={{
              x: 3,
            }}
            className="
              mt-auto
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-3
              transition-all
              duration-300

              group-hover:border-violet-500/20
              group-hover:bg-violet-500/[0.045]
            "
          >
            <div className="flex items-center gap-3">
              {/* Icon */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-500/20
                  bg-violet-500/10
                "
              >
                <FiBookOpen
                  size={15}
                  className="text-violet-400"
                />
              </div>

              {/* Course info */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.15em]
                    text-zinc-600
                  "
                >
                  Reviewed Course
                </p>

                <h4
                  className="
                    mt-1
                    truncate
                    text-[12px]
                    font-bold
                    text-zinc-200
                  "
                >
                  {review.course.courseName}
                </h4>

                {review.course.courseDescription && (
                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[10px]
                      text-zinc-600
                    "
                  >
                    {review.course.courseDescription}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}

// ======================================================
// SKELETON
// ======================================================

function ReviewSkeleton() {
  return (
    <div
      className="
        h-[330px]
        animate-pulse
        rounded-[24px]
        border
        border-white/10
        bg-[#090909]
        p-5
      "
    >
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-2xl bg-white/[0.07]" />

        <div className="flex-1 space-y-2">
          <div className="h-3 w-28 rounded bg-white/[0.07]" />
          <div className="h-2 w-20 rounded bg-white/[0.05]" />
        </div>
      </div>

      <div className="mt-7 h-3 w-32 rounded bg-white/[0.06]" />

      <div className="mt-6 space-y-3">
        <div className="h-2 w-full rounded bg-white/[0.05]" />
        <div className="h-2 w-[85%] rounded bg-white/[0.05]" />
        <div className="h-2 w-[65%] rounded bg-white/[0.05]" />
      </div>

      <div className="mt-12 h-16 rounded-2xl bg-white/[0.04]" />
    </div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAllReviews = async () => {
      try {
        setLoading(true);

        const result = await getAllRating();

        if (mounted && result?.success) {
          setReviews(result?.reviews || []);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAllReviews();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        py-10
        sm:py-14
      "
    >
      {/* ================================================
          SOFT BACKGROUND GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[70%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/[0.07]
          blur-[130px]
        "
      />

      {/* ================================================
          SLIDER
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          sm:px-6
          lg:px-10
        "
      >
        {loading ? (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3].map((item) => (
              <ReviewSkeleton key={item} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div
            className="
              flex
              min-h-[250px]
              items-center
              justify-center
              rounded-3xl
              border
              border-dashed
              border-white/10
            "
          >
            <p className="text-sm text-zinc-500">
              No learner reviews yet.
            </p>
          </div>
        ) : (
          <Swiper
            grabCursor
            speed={700}
            slidesPerView={1}
            spaceBetween={18}
            breakpoints={{
              640: {
                slidesPerView: 1.4,
                spaceBetween: 18,
              },

              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              1100: {
                slidesPerView: 3,
                spaceBetween: 22,
              },
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={reviews.length > 3}
            modules={[
              Pagination,
              Autoplay,
            ]}
            className="
              review-swiper
              w-full
              !pb-12
            "
          >
            {reviews.map((review, index) => (
              <SwiperSlide
                key={review?._id || index}
              >
                <ReviewCard
                  review={review}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* ================================================
          SWIPER CSS
      ================================================= */}

      <style>{`
        .review-swiper {
          overflow: hidden !important;
        }

        .review-swiper .swiper-slide {
          height: auto;
        }

        .review-swiper .swiper-pagination {
          bottom: 0px !important;
        }

        .review-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #52525b;
          opacity: 0.45;
          transition: all 0.3s ease;
        }

        .review-swiper
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 999px;
          opacity: 1;
          background: linear-gradient(
            90deg,
            #8b5cf6,
            #d946ef,
            #22d3ee
          );
        }
      `}</style>
    </section>
  );
}

export default ReviewSlider;