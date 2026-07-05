import React from "react";
import { motion } from "framer-motion";

import {
  FiStar,
  FiMessageSquare,
  FiBookOpen,
  FiUser,
} from "react-icons/fi";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const reviewVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function RecentReviews({
  reviews = [],
}) {
  /* =======================================================
     SAFE REVIEWS
  ======================================================= */

  const safeReviews = Array.isArray(reviews)
    ? reviews
    : [];

  /* =======================================================
     UI
  ======================================================= */

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#0B0F19]
        p-5
        shadow-2xl
        sm:p-6
      "
    >
      {/* ===================================================
          BACKGROUND GLOWS
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-violet-500/[0.08]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-20
          h-64
          w-64
          rounded-full
          bg-cyan-400/[0.06]
          blur-[100px]
        "
      />

      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <motion.div
            whileHover={{
              rotate: 7,
              scale: 1.08,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-violet-400/20
              bg-violet-400/10
              text-violet-300
            "
          >
            <FiMessageSquare
              size={19}
            />
          </motion.div>

          <div>
            <h2
              className="
                text-lg
                font-bold
                text-white
                sm:text-xl
              "
            >
              Recent Reviews
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-white/45
              "
            >
              Latest feedback from students
            </p>
          </div>
        </div>

        {/* Review count */}

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.035]
            px-3
            py-1.5
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-violet-400
              shadow-[0_0_8px_rgba(167,139,250,0.6)]
            "
          />

          <span
            className="
              text-xs
              font-semibold
              text-white/65
            "
          >
            {safeReviews.length} recent
          </span>
        </div>
      </div>

      {/* ===================================================
          EMPTY STATE
      =================================================== */}

      {safeReviews.length === 0 ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.15,
            duration: 0.4,
          }}
          className="
            relative
            z-10
            mt-6
            flex
            min-h-[260px]
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-white/[0.02]
            px-6
            py-12
          "
        >
          <div
            className="
              max-w-sm
              text-center
            "
          >
            {/* Empty icon */}

            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-violet-400/15
                bg-violet-400/[0.08]
                text-violet-300
              "
            >
              <FiMessageSquare
                size={26}
              />
            </motion.div>

            <h3
              className="
                mt-5
                text-base
                font-bold
                text-white
              "
            >
              No reviews yet
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-white/40
              "
            >
              Student feedback will appear
              here when learners review your
              courses.
            </p>
          </div>
        </motion.div>
      ) : (
        /* =================================================
           REVIEW LIST
        ================================================= */

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            relative
            z-10
            mt-6
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-2
          "
        >
          {safeReviews.map(
            (review, index) => {
              /* ===========================================
                 SAFE REVIEW DATA
              =========================================== */

              const reviewId =
                review?.reviewId ||
                review?._id ||
                `review-${index}`;

              const studentName =
                review?.studentName ||
                "Anonymous Student";

              const courseName =
                review?.courseName ||
                "Course not specified";

              const reviewText =
                review?.review ||
                "No written feedback provided.";

              const rating = Math.min(
                5,
                Math.max(
                  0,
                  Number(review?.rating) || 0
                )
              );

              const studentImage =
                review?.studentImage ||
                "/default-avatar.png";

              return (
                <motion.article
                  key={reviewId}
                  variants={reviewVariants}
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-4
                    transition-colors
                    duration-300
                    hover:border-violet-400/20
                    hover:bg-white/[0.04]
                    sm:p-5
                  "
                >
                  {/* Card glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-36
                      w-36
                      rounded-full
                      bg-violet-400/[0.07]
                      blur-[60px]
                      transition-all
                      duration-500
                      group-hover:scale-125
                    "
                  />

                  {/* Top shine */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-white/15
                      to-transparent
                    "
                  />

                  <div
                    className="
                      relative
                      z-10
                      flex
                      items-start
                      gap-3
                      sm:gap-4
                    "
                  >
                    {/* =====================================
                        STUDENT IMAGE
                    ===================================== */}

                    <div
                      className="
                        relative
                        flex-shrink-0
                      "
                    >
                      <img
                        src={studentImage}
                        alt={studentName}
                        onError={(event) => {
                          event.currentTarget.src =
                            "/default-avatar.png";
                        }}
                        className="
                          h-11
                          w-11
                          rounded-2xl
                          border
                          border-white/10
                          object-cover
                          shadow-lg
                          sm:h-12
                          sm:w-12
                        "
                      />

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
                          border-2
                          border-[#0B0F19]
                          bg-cyan-400
                        "
                      >
                        <FiUser
                          size={9}
                          className="text-black"
                        />
                      </div>
                    </div>

                    {/* =====================================
                        REVIEW CONTENT
                    ===================================== */}

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      {/* Student + Rating */}

                      <div
                        className="
                          flex
                          flex-col
                          gap-2
                          sm:flex-row
                          sm:items-start
                          sm:justify-between
                        "
                      >
                        <div
                          className="
                            min-w-0
                          "
                        >
                          <h3
                            className="
                              truncate
                              text-sm
                              font-bold
                              text-white
                              sm:text-base
                            "
                          >
                            {studentName}
                          </h3>

                          {/* Course */}

                          <div
                            className="
                              mt-1
                              flex
                              min-w-0
                              items-center
                              gap-1.5
                            "
                          >
                            <FiBookOpen
                              size={12}
                              className="
                                flex-shrink-0
                                text-cyan-300
                              "
                            />

                            <p
                              title={courseName}
                              className="
                                truncate
                                text-xs
                                text-white/40
                              "
                            >
                              {courseName}
                            </p>
                          </div>
                        </div>

                        {/* Rating badge */}

                        <div
                          className="
                            flex
                            w-fit
                            flex-shrink-0
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-yellow-400/20
                            bg-yellow-400/[0.08]
                            px-2.5
                            py-1
                          "
                        >
                          <FiStar
                            size={13}
                            className="
                              fill-yellow-300
                              text-yellow-300
                            "
                          />

                          <span
                            className="
                              text-xs
                              font-bold
                              text-yellow-200
                            "
                          >
                            {rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* =====================================
                          STAR ROW
                      ===================================== */}

                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          gap-1
                        "
                      >
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <motion.div
                              key={star}
                              initial={{
                                opacity: 0,
                                scale: 0,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              transition={{
                                delay:
                                  0.2 +
                                  star * 0.04,
                                type: "spring",
                                stiffness: 300,
                              }}
                            >
                              <FiStar
                                size={14}
                                className={
                                  star <=
                                  Math.round(rating)
                                    ? `
                                      fill-yellow-300
                                      text-yellow-300
                                    `
                                    : `
                                      text-white/15
                                    `
                                }
                              />
                            </motion.div>
                          )
                        )}
                      </div>

                      {/* =====================================
                          REVIEW TEXT
                      ===================================== */}

                      <div
                        className="
                          relative
                          mt-4
                          rounded-xl
                          border
                          border-white/[0.06]
                          bg-black/20
                          px-4
                          py-3
                        "
                      >
                        <span
                          className="
                            absolute
                            left-2
                            top-0
                            -translate-y-1
                            text-2xl
                            font-serif
                            leading-none
                            text-violet-300/30
                          "
                        >
                          “
                        </span>

                        <p
                          className="
                            text-sm
                            leading-6
                            text-white/65
                          "
                        >
                          {reviewText}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            }
          )}
        </motion.div>
      )}
    </motion.section>
  );
}

export default RecentReviews;