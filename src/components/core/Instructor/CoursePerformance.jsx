import React from "react";
import { motion } from "framer-motion";

import {
  FiStar,
  FiUsers,
  FiMessageSquare,
  FiTrendingUp,
  FiBookOpen,
  FiArrowUpRight,
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
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   COURSE PERFORMANCE COMPONENT
========================================================= */

function CoursePerformance({
  courses = [],
}) {
  /* =======================================================
     FORMAT CURRENCY
  ======================================================= */

  const formatCurrency = (value = 0) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  /* =======================================================
     FORMAT RATING
  ======================================================= */

  const formatRating = (rating = 0) => {
    return Number(rating || 0).toFixed(1);
  };

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
        duration: 0.55,
        ease: "easeOut",
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#0B0F19]
        p-4
        shadow-2xl
        sm:p-6
      "
    >
      {/* ===================================================
          BACKGROUND DECORATION
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
          bg-yellow-400/10
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-20
          h-64
          w-64
          rounded-full
          bg-cyan-400/10
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
          mb-7
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-yellow-400/20
                bg-yellow-400/10
                text-yellow-300
              "
            >
              <FiTrendingUp size={21} />
            </motion.div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-2xl
                "
              >
                Course Performance
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-white/55
                "
              >
                Track students, ratings, reviews and revenue
              </p>
            </div>
          </div>
        </div>

        {/* Total course badge */}

        <motion.div
          whileHover={{
            scale: 1.04,
          }}
          className="
            flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/[0.05]
            px-4
            py-2
            text-sm
            text-white/80
            backdrop-blur-xl
          "
        >
          <FiBookOpen
            className="text-yellow-300"
          />

          <span className="font-semibold text-white">
            {courses.length}
          </span>

          <span>
            {courses.length === 1
              ? "Course"
              : "Courses"}
          </span>
        </motion.div>
      </div>

      {/* ===================================================
          EMPTY STATE
      =================================================== */}

      {courses.length === 0 ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            relative
            z-10
            flex
            min-h-[260px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-white/[0.025]
            px-6
            text-center
          "
        >
          <motion.div
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-yellow-400/20
              bg-yellow-400/10
              text-yellow-300
            "
          >
            <FiBookOpen size={28} />
          </motion.div>

          <h3
            className="
              mt-5
              text-lg
              font-semibold
              text-white
            "
          >
            No courses available
          </h3>

          <p
            className="
              mt-2
              max-w-sm
              text-sm
              leading-6
              text-white/50
            "
          >
            Your course performance analytics will appear
            here once you create a course.
          </p>
        </motion.div>
      ) : (
        /* =================================================
           COURSE LIST
        ================================================= */

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            relative
            z-10
            space-y-4
          "
        >
          {courses.map((course, index) => (
            <motion.article
              key={
                course.courseId ||
                course._id ||
                index
              }
              variants={cardVariants}
              whileHover={{
                y: -4,
                scale: 1.005,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                p-3
                backdrop-blur-xl
                transition-colors
                duration-300
                hover:border-yellow-400/30
                hover:bg-white/[0.055]
                sm:p-4
              "
            >
              {/* Hover glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-yellow-400/0
                  blur-[60px]
                  transition-all
                  duration-500
                  group-hover:bg-yellow-400/10
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  gap-5
                  xl:flex-row
                  xl:items-center
                  xl:justify-between
                "
              >
                {/* =======================================
                    COURSE INFO
                ======================================= */}

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-4
                    xl:w-[38%]
                  "
                >
                  {/* Course thumbnail */}

                  <div
                    className="
                      relative
                      h-20
                      w-28
                      flex-shrink-0
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      sm:h-24
                      sm:w-36
                    "
                  >
                    <motion.img
                      whileHover={{
                        scale: 1.1,
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      src={
                        course.thumbnail ||
                        "/default-course.png"
                      }
                      alt={
                        course.courseName ||
                        "Course"
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                    {/* Image overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/50
                        via-transparent
                        to-transparent
                      "
                    />
                  </div>

                  {/* Name and status */}

                  <div className="min-w-0 flex-1">
                    <div
                      className="
                        flex
                        items-start
                        gap-2
                      "
                    >
                      <h3
                        title={course.courseName}
                        className="
                          line-clamp-2
                          text-base
                          font-bold
                          leading-6
                          text-white
                          transition-colors
                          duration-300
                          group-hover:text-yellow-200
                          sm:text-lg
                        "
                      >
                        {course.courseName ||
                          "Untitled Course"}
                      </h3>

                      <FiArrowUpRight
                        className="
                          mt-1
                          flex-shrink-0
                          text-white/30
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-yellow-300
                        "
                      />
                    </div>

                    <div
                      className="
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      {/* Status */}

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          px-3
                          py-1
                          text-xs
                          font-semibold

                          ${
                            course.status === "Published"
                              ? `
                                border-emerald-400/20
                                bg-emerald-400/10
                                text-emerald-300
                              `
                              : `
                                border-yellow-400/20
                                bg-yellow-400/10
                                text-yellow-300
                              `
                          }
                        `}
                      >
                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full

                            ${
                              course.status === "Published"
                                ? "bg-emerald-400"
                                : "bg-yellow-400"
                            }
                          `}
                        />

                        {course.status ||
                          "Draft"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =======================================
                    ANALYTICS GRID
                ======================================= */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                    sm:grid-cols-4
                    xl:flex-1
                    xl:gap-3
                  "
                >
                  {/* STUDENTS */}

                  <MetricBox
                    icon={FiUsers}
                    label="Students"
                    value={
                      course.studentsEnrolled || 0
                    }
                    iconClass="text-cyan-300"
                    iconBg="bg-cyan-400/10"
                  />

                  {/* RATING */}

                  <MetricBox
                    icon={FiStar}
                    label="Rating"
                    value={`${formatRating(
                      course.averageRating
                    )} / 5`}
                    iconClass="text-yellow-300"
                    iconBg="bg-yellow-400/10"
                  />

                  {/* REVIEWS */}

                  <MetricBox
                    icon={FiMessageSquare}
                    label="Reviews"
                    value={
                      course.totalReviews || 0
                    }
                    iconClass="text-violet-300"
                    iconBg="bg-violet-400/10"
                  />

                  {/* REVENUE */}

                  <MetricBox
                    icon={FiTrendingUp}
                    label="Est. Revenue"
                    value={formatCurrency(
                      course.estimatedRevenue
                    )}
                    iconClass="text-emerald-300"
                    iconBg="bg-emerald-400/10"
                    highlight
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

/* =========================================================
   REUSABLE METRIC BOX
========================================================= */

function MetricBox({
  icon: Icon,
  label,
  value,
  iconClass = "text-white",
  iconBg = "bg-white/10",
  highlight = false,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`
        min-w-0
        rounded-xl
        border
        p-3
        transition-all
        duration-300

        ${
          highlight
            ? `
              border-emerald-400/15
              bg-emerald-400/[0.055]
              hover:border-emerald-400/30
            `
            : `
              border-white/[0.07]
              bg-black/20
              hover:border-white/15
              hover:bg-white/[0.04]
            `
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <div
          className={`
            flex
            h-8
            w-8
            flex-shrink-0
            items-center
            justify-center
            rounded-lg
            ${iconBg}
          `}
        >
          <Icon
            size={15}
            className={iconClass}
          />
        </div>

        <p
          className="
            truncate
            text-[11px]
            font-medium
            uppercase
            tracking-wide
            text-white/45
          "
        >
          {label}
        </p>
      </div>

      <motion.p
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.35,
        }}
        title={String(value)}
        className="
          mt-3
          truncate
          text-sm
          font-bold
          text-white
          sm:text-base
        "
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

export default CoursePerformance;