import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiClock,
  FiLayers,
  FiSearch,
  FiStar,
  FiZap,
} from "react-icons/fi";

import { getCategoryPageDetails } from "../services/operations/courseAPI";

/* ======================================================
   STAR RATING
====================================================== */

const StarRating = ({ rating = 4.5 }) => {
  const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[2px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            size={14}
            className={
              star <= Math.round(safeRating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-zinc-700"
            }
          />
        ))}
      </div>

      <span className="text-[11px] font-bold text-zinc-500">
        {safeRating.toFixed(1)}
      </span>
    </div>
  );
};

/* ======================================================
   LOADING SKELETON
====================================================== */

const CourseSkeleton = () => {
  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[#0a0a0a]
      "
    >
      <div className="h-[210px] animate-pulse bg-white/[0.06]" />

      <div className="space-y-4 p-5">
        <div className="h-3 w-20 animate-pulse rounded-full bg-white/[0.08]" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-white/[0.08]" />
        <div className="h-3 w-full animate-pulse rounded bg-white/[0.05]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.05]" />

        <div className="flex justify-between pt-4">
          <div className="h-5 w-20 animate-pulse rounded bg-white/[0.08]" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
};

/* ======================================================
   COURSE CARD
====================================================== */

const CourseCard = ({ course, index, navigate }) => {
  const rating =
    course?.averageRating ||
    course?.ratingAndReviews?.averageRating ||
    4.5;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 60,
        rotateX: 6,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
      }}
      onClick={() => navigate(`/courses/${course._id}`)}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.09]
        bg-[#090909]
        transition-all
        duration-500

        hover:border-violet-500/30
        hover:shadow-[0_25px_80px_rgba(124,58,237,0.14)]
      "
    >
      {/* CARD GRID */}
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
          backgroundSize: "28px 28px",
        }}
      />

      {/* HOVER GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-violet-600/20
          opacity-0
          blur-[100px]
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      />

      {/* IMAGE */}
      <div className="relative h-[210px] overflow-hidden">
        <motion.img
          src={course.thumbnail}
          alt={course.courseName}
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* IMAGE OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#090909]
            via-transparent
            to-black/10
          "
        />

        {/* COURSE BADGE */}
        <div
          className="
            absolute
            left-4
            top-4
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-black/60
            px-3
            py-1.5
            backdrop-blur-xl
          "
        >
          <FiBookOpen
            size={11}
            className="text-violet-300"
          />

          <span
            className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            Course
          </span>
        </div>

        {/* NUMBER */}
        <span
          className="
            absolute
            bottom-2
            right-4
            text-5xl
            font-black
            tracking-[-0.08em]
            text-white/[0.12]
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          min-h-[260px]
          flex-col
          p-5
        "
      >
        {/* RATING */}
        <StarRating rating={rating} />

        {/* TITLE */}
        <h3
          className="
            mt-4
            line-clamp-2
            text-xl
            font-black
            leading-tight
            tracking-[-0.03em]
            text-white
            transition-colors
            duration-300

            group-hover:text-violet-200
          "
        >
          {course.courseName}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mt-3
            line-clamp-3
            text-sm
            leading-6
            text-zinc-400
          "
        >
          {course.courseDescription}
        </p>

        {/* META */}
        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.035]
              px-2.5
              py-1.5
            "
          >
            <FiLayers
              size={11}
              className="text-cyan-400"
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-zinc-400
              "
            >
              Structured
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.035]
              px-2.5
              py-1.5
            "
          >
            <FiClock
              size={11}
              className="text-fuchsia-400"
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-zinc-400
              "
            >
              Self paced
            </span>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-auto
            flex
            items-center
            justify-between
            border-t
            border-white/[0.07]
            pt-5
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.16em]
                text-zinc-600
              "
            >
              Course price
            </p>

            <p
              className="
                mt-1
                text-xl
                font-black
                tracking-[-0.03em]
                text-white
              "
            >
              ₹{course.price}
            </p>
          </div>

          <motion.div
            whileHover={{
              rotate: 45,
              scale: 1.08,
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              transition-shadow
              duration-300

              group-hover:shadow-[0_0_35px_rgba(167,139,250,0.35)]
            "
          >
            <FiArrowUpRight size={18} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

/* ======================================================
   MAIN COMPONENT
====================================================== */

const CategoryCourses = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

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
          setError(
            res.message ||
              "Failed to fetch category details"
          );

          setCategoryData(null);
        }
      } catch (err) {
        console.error(
          "Category fetch error:",
          err
        );

        setError(
          "An error occurred while fetching data"
        );

        setCategoryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCourses();
  }, [categoryId]);

  /* ======================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-black
          px-4
          py-24
          sm:px-6
          lg:px-10
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 space-y-4">
            <div className="h-4 w-32 animate-pulse rounded bg-white/[0.08]" />
            <div className="h-12 w-80 max-w-full animate-pulse rounded bg-white/[0.08]" />
            <div className="h-4 w-full max-w-xl animate-pulse rounded bg-white/[0.05]" />
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {[1, 2, 3, 4].map((item) => (
              <CourseSkeleton key={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ======================================================
     ERROR
  ====================================================== */

  if (error) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-black
          px-4
        "
      >
        <div
          className="
            max-w-md
            rounded-[28px]
            border
            border-red-500/20
            bg-red-500/[0.05]
            p-8
            text-center
          "
        >
          <p className="font-bold text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (
    !categoryData ||
    !categoryData.selectedCategory
  ) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-black
          text-white
        "
      >
        No category data found.
      </div>
    );
  }

  const { selectedCategory } = categoryData;

  const courses = selectedCategory?.course || [];

  const filteredCourses = courses.filter((course) =>
    course.courseName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* =================================================
          BACKGROUND GRID
      ================================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          opacity-40
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(139,92,246,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(139,92,246,0.035) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* =================================================
          ANIMATED BACKGROUND GLOWS
      ================================================= */}

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          fixed
          -left-48
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-600/10
          blur-[160px]
        "
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          fixed
          -right-48
          bottom-0
          h-[480px]
          w-[480px]
          rounded-full
          bg-cyan-500/[0.08]
          blur-[160px]
        "
      />

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          pb-12
          pt-20

          sm:px-6
          sm:pt-24

          lg:px-10
          lg:pb-16
          lg:pt-32
        "
      >
        {/* GIANT BACKGROUND TEXT */}

        <motion.div
          initial={{
            x: "-12%",
          }}
          animate={{
            x: "2%",
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            pointer-events-none
            absolute
            left-0
            top-10
            whitespace-nowrap
            select-none
            text-[12vw]
            font-black
            leading-none
            tracking-[-0.08em]
            text-white/[0.025]
          "
        >
          EXPLORE • LEARN • BUILD
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
          }}
          className="relative z-10"
        >
          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-500/20
              bg-violet-500/[0.07]
              px-4
              py-2
            "
          >
            <FiZap
              size={11}
              className="text-violet-400"
            />

            <span
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.2em]
                text-violet-300
              "
            >
              StudyFlux Catalog
            </span>
          </div>

          {/* HEADING */}

          <h1
            className="
              mt-7
              max-w-4xl
              text-4xl
              font-black
              leading-[1.02]
              tracking-[-0.055em]
              text-white

              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            {selectedCategory.name}
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-zinc-400

              sm:text-base
              sm:leading-8
            "
          >
            {selectedCategory.description}
          </p>

          {/* STATS */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <div
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-4
                py-2
              "
            >
              <span className="text-xs font-bold text-white">
                {courses.length}
              </span>

              <span className="ml-2 text-xs text-zinc-500">
                Courses
              </span>
            </div>

            <div
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-4
                py-2
              "
            >
              <span className="text-xs font-bold text-emerald-400">
                ●
              </span>

              <span className="ml-2 text-xs text-zinc-500">
                Available now
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =================================================
          COURSE SECTION
      ================================================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          pb-28

          sm:px-6
          lg:px-10
        "
      >
        {/* TOP BAR */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-5
            border-t
            border-white/[0.07]
            pt-8

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.18em]
                text-violet-400
              "
            >
              Course collection
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-black
                tracking-[-0.035em]
                text-white
              "
            >
              Explore available courses
            </h2>
          </div>

          {/* SEARCH */}

          <div
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              border-white/[0.09]
              bg-white/[0.035]
              px-4
              py-3
              transition-colors
              duration-300

              focus-within:border-violet-500/40

              sm:w-[300px]
            "
          >
            <FiSearch
              size={16}
              className="shrink-0 text-zinc-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search courses..."
              className="
                w-full
                bg-transparent
                text-sm
                text-white
                outline-none
                placeholder:text-zinc-600
              "
            />
          </div>
        </div>

        {/* COURSE GRID */}

        {filteredCourses.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-6

              sm:grid-cols-2

              lg:grid-cols-3

              xl:grid-cols-4
            "
          >
            {filteredCourses.map(
              (course, index) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  index={index}
                  navigate={navigate}
                />
              )
            )}
          </div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              rounded-[28px]
              border
              border-white/[0.08]
              bg-white/[0.025]
              px-6
              text-center
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-violet-500/20
                bg-violet-500/[0.08]
              "
            >
              <FiSearch
                size={20}
                className="text-violet-400"
              />
            </div>

            <h3
              className="
                mt-5
                text-xl
                font-black
                text-white
              "
            >
              No courses found
            </h3>

            <p
              className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-zinc-500
              "
            >
              Try another search term or explore
              a different category.
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default CategoryCourses;