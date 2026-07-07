import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiAward,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiGlobe,
  FiLayers,
  FiPlay,
  FiStar,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { buyCourse } from "../services/operations/studentfeaturesApI";
import { getCourseDetails } from "../services/operations/courseAPI";
import { toast } from "react-toastify";
import GetAvgRating from "../utils/averageRating";

import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import ConfirmationModal from "../components/Common/ConfirmationModal";

/* ======================================================
   LOADING UI
====================================================== */

const CourseDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-black px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="h-8 w-40 animate-pulse rounded-full bg-white/[0.08]" />

            <div className="h-16 w-full max-w-3xl animate-pulse rounded-2xl bg-white/[0.08]" />

            <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-white/[0.05]" />

            <div className="h-5 w-3/4 animate-pulse rounded bg-white/[0.05]" />

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-2xl bg-white/[0.06]"
                />
              ))}
            </div>
          </div>

          <div className="h-[520px] animate-pulse rounded-[30px] bg-white/[0.07]" />
        </div>
      </div>
    </div>
  );
};

/* ======================================================
   STAR DISPLAY
====================================================== */

const RatingStars = ({ rating = 0 }) => {
  const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={15}
          className={
            star <= Math.round(safeRating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-zinc-700"
          }
        />
      ))}
    </div>
  );
};

/* ======================================================
   STAT CARD
====================================================== */

const StatCard = ({ icon: Icon, label, value, accent = "violet" }) => {
  const styles = {
    violet: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    fuchsia: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      className="
        rounded-[22px]
        border
        border-white/[0.08]
        bg-white/[0.035]
        p-4
        backdrop-blur-xl
        transition-colors
        duration-300
        hover:border-white/[0.16]
      "
    >
      <div
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          ${styles[accent]}
        `}
      >
        <Icon size={15} />
      </div>

      <p className="mt-4 text-lg font-black tracking-[-0.03em] text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
    </motion.div>
  );
};

/* ======================================================
   CURRICULUM SECTION
====================================================== */

const CurriculumSection = ({
  section,
  index,
  isOpen,
  onToggle,
}) => {
  const lectures = section?.subSection || [];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-white/[0.08]
        bg-[#0b0b0b]
      "
    >
      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          px-5
          py-5
          text-left
          transition-colors
          duration-300
          hover:bg-white/[0.035]
        "
      >
        <div className="flex min-w-0 items-center gap-4">
          <span
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
              bg-violet-500/[0.08]
              text-xs
              font-black
              text-violet-300
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0">
            <p className="truncate font-black text-white">
              {section?.sectionName || `Section ${index + 1}`}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {lectures.length} lecture
              {lectures.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.035]
            text-zinc-400
          "
        >
          <FiChevronDown size={17} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.07] px-5 py-3">
              {lectures.length > 0 ? (
                lectures.map((lecture, lectureIndex) => (
                  <div
                    key={lecture?._id || lectureIndex}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-white/[0.05]
                      py-3
                      last:border-b-0
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <FiPlay
                        size={13}
                        className="shrink-0 text-violet-400"
                      />

                      <span className="truncate text-sm text-zinc-300">
                        {lecture?.title ||
                          `Lecture ${lectureIndex + 1}`}
                      </span>
                    </div>

                    {lecture?.timeDuration && (
                      <span className="shrink-0 text-xs text-zinc-600">
                        {lecture.timeDuration}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-zinc-500">
                  No lectures available in this section.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ======================================================
   MAIN COMPONENT
====================================================== */

function CourseDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const tokenFromRedux = useSelector((state) => state.auth.token);
  const userFromRedux = useSelector((state) => state.profile.user);
  const authLoading = useSelector((state) => state.auth.loading);

  const token =
    localStorage.getItem("token") || tokenFromRedux;

  let localUser = null;

  try {
    const storedUser = localStorage.getItem("user");
    localUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
  }

  const user = localUser || userFromRedux;

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [openSection, setOpenSection] = useState(0);

  /* ======================================================
     FETCH COURSE
  ====================================================== */

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) {
        setFetchError("Course ID is missing.");
        setPageLoading(false);
        return;
      }

      try {
        setPageLoading(true);
        setFetchError("");

        const response = await getCourseDetails(courseId);

        if (response?.success) {
          setCourseDetails(response.data);
        } else {
          setFetchError(
            response?.message ||
              "Failed to fetch course details."
          );
        }
      } catch (error) {
        console.error(
          "Error fetching course details:",
          error
        );

        setFetchError(
          "Could not fetch course details."
        );

        toast.error(
          "Could not fetch course details."
        );
      } finally {
        setPageLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  /* ======================================================
     DERIVED DATA
  ====================================================== */

  const avgReviewCount = useMemo(() => {
    if (!courseDetails?.ratingAndReviews?.length) {
      return 0;
    }

    return GetAvgRating(
      courseDetails.ratingAndReviews
    );
  }, [courseDetails]);

  const totalNumberOfLectures = useMemo(() => {
    if (!courseDetails?.courseContent) {
      return 0;
    }

    return courseDetails.courseContent.reduce(
      (total, section) =>
        total + (section?.subSection?.length || 0),
      0
    );
  }, [courseDetails]);

  /* ======================================================
     BUY COURSE
  ====================================================== */

  const handleBuyCourse = () => {
    if (!token || !user) {
      setConfirmationModal({
        text1: "You are not logged in",
        text2: "Please login to buy this course",
        btn1text: "Login",
        btn2text: "Cancel",

        btn1Handler: () => {
          navigate("/login");
          setConfirmationModal(null);
        },

        btn2Handler: () => {
          setConfirmationModal(null);
        },
      });

      return;
    }

    if (courseId) {
      // Keep this shape consistent with your payment API.
      // If your buyCourse expects an array, use [courseId].
      buyCourse(
        courseId,
        token,
        user,
        navigate,
        dispatch
      );
    }
  };

  /* ======================================================
     LOADING
  ====================================================== */

  if (authLoading || pageLoading) {
    return <CourseDetailsSkeleton />;
  }

  /* ======================================================
     ERROR
  ====================================================== */

  if (fetchError || !courseDetails) {
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
          <p className="font-black text-red-400">
            {fetchError || "Course not found."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="
              mt-5
              rounded-xl
              bg-white
              px-5
              py-2.5
              text-sm
              font-black
              text-black
            "
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    courseName,
    courseDescription,
    courseContent = [],
    ratingAndReviews = [],
    instructor,
    studentsEnrolled = [],
    category,
    whatYouWillLearn,
  } = courseDetails;

  const categoryName =
    Array.isArray(category)
      ? category?.[0]?.name
      : category?.name;

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
          ANIMATED GLOWS
      ================================================= */}

      <motion.div
        animate={{
          x: [0, 90, 0],
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
          top-[15%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-600/10
          blur-[160px]
        "
      />

      <motion.div
        animate={{
          x: [0, -70, 0],
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
          pb-14
          pt-20

          sm:px-6
          sm:pt-24

          lg:px-10
          lg:pb-20
          lg:pt-28
        "
      >
        {/* BACKGROUND TEXT */}

        <motion.div
          initial={{
            x: "-10%",
          }}
          animate={{
            x: "1%",
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            pointer-events-none
            absolute
            left-0
            top-8
            whitespace-nowrap
            select-none
            text-[11vw]
            font-black
            leading-none
            tracking-[-0.08em]
            text-white/[0.025]
          "
        >
          LEARN • BUILD • MASTER
        </motion.div>

        <div
          className="
            relative
            z-10
            grid
            items-start
            gap-10

            lg:grid-cols-[minmax(0,1fr)_380px]

            xl:grid-cols-[minmax(0,1fr)_420px]
            xl:gap-14
          "
        >
          {/* =============================================
              LEFT CONTENT
          ============================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0"
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
                StudyFlux Course
              </span>
            </div>

            {/* CATEGORY */}

            {categoryName && (
              <p
                className="
                  mt-7
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-cyan-400
                "
              >
                {categoryName}
              </p>
            )}

            {/* TITLE */}

            <h1
              className="
                mt-3
                max-w-4xl
                break-words
                text-4xl
                font-black
                leading-[1.03]
                tracking-[-0.055em]
                text-white

                sm:text-5xl
                md:text-6xl
                xl:text-7xl
              "
            >
              {courseName}
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-3xl
                text-sm
                leading-7
                text-zinc-400

                sm:text-base
                sm:leading-8
              "
            >
              {courseDescription}
            </p>

            {/* RATING */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-3
              "
            >
              <span className="text-lg font-black text-yellow-400">
                {Number(avgReviewCount).toFixed(1)}
              </span>

              <RatingStars rating={avgReviewCount} />

              <span className="text-sm text-zinc-500">
                {ratingAndReviews.length} review
                {ratingAndReviews.length !== 1 ? "s" : ""}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />

              <span className="text-sm text-zinc-500">
                {studentsEnrolled.length} students enrolled
              </span>
            </div>

            {/* INSTRUCTOR */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-3
              "
            >
              {instructor?.image ? (
                <img
                  src={instructor.image}
                  alt={`${instructor?.firstName || ""} ${instructor?.lastName || ""}`}
                  className="
                    h-11
                    w-11
                    rounded-full
                    border
                    border-white/15
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-violet-500/20
                    bg-violet-500/10
                    text-sm
                    font-black
                    text-violet-300
                  "
                >
                  {instructor?.firstName?.[0] || "I"}
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                  Created by
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {instructor?.firstName}{" "}
                  {instructor?.lastName}
                </p>
              </div>
            </div>

            {/* STATS */}

            <div
              className="
                mt-10
                grid
                grid-cols-2
                gap-3

                sm:grid-cols-4
              "
            >
              <StatCard
                icon={FiLayers}
                label="Sections"
                value={courseContent.length}
                accent="violet"
              />

              <StatCard
                icon={FiPlay}
                label="Lectures"
                value={totalNumberOfLectures}
                accent="cyan"
              />

              <StatCard
                icon={FiUsers}
                label="Students"
                value={studentsEnrolled.length}
                accent="fuchsia"
              />

              <StatCard
                icon={FiGlobe}
                label="Access"
                value="Online"
                accent="emerald"
              />
            </div>
          </motion.div>

          {/* =============================================
              RIGHT PURCHASE CARD
          ============================================= */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full

              lg:sticky
              lg:top-24
            "
          >
            <div
              className="
                rounded-[30px]
                border
                border-white/[0.1]
                bg-[#0a0a0a]
                p-2
                shadow-[0_30px_100px_rgba(0,0,0,0.45)]
              "
            >
              <CourseDetailsCard
                courseData={courseDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </motion.aside>
        </div>
      </section>

      {/* =================================================
          MAIN LOWER CONTENT
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
        <div
          className="
            grid
            gap-8

            lg:grid-cols-[minmax(0,1fr)_320px]
          "
        >
          {/* =============================================
              LEFT COLUMN
          ============================================= */}

          <div className="space-y-8">
            {/* WHAT YOU WILL LEARN */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
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
                duration: 0.65,
              }}
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/[0.09]
                bg-white/[0.035]
                p-6

                sm:p-8
              "
            >
              {/* glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-52
                  w-52
                  rounded-full
                  bg-violet-600/10
                  blur-[90px]
                "
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-violet-500/20
                      bg-violet-500/[0.08]
                    "
                  >
                    <FiAward
                      size={17}
                      className="text-violet-300"
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-violet-400
                      "
                    >
                      Learning outcomes
                    </p>

                    <h2
                      className="
                        mt-1
                        text-2xl
                        font-black
                        tracking-[-0.035em]
                        text-white
                      "
                    >
                      What you will learn
                    </h2>
                  </div>
                </div>

                <div
                  className="
                    mt-7
                    whitespace-pre-line
                    text-sm
                    leading-7
                    text-zinc-300

                    sm:text-base
                    sm:leading-8
                  "
                >
                  {whatYouWillLearn ||
                    "Learning outcomes will be added soon."}
                </div>
              </div>
            </motion.div>

            {/* COURSE CONTENT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.65,
              }}
            >
              <div
                className="
                  mb-6
                  flex
                  flex-col
                  gap-4

                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-cyan-400
                    "
                  >
                    Curriculum
                  </p>

                  <h2
                    className="
                      mt-2
                      text-2xl
                      font-black
                      tracking-[-0.035em]
                      text-white

                      sm:text-3xl
                    "
                  >
                    Course content
                  </h2>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-zinc-500
                  "
                >
                  <span>{courseContent.length} sections</span>

                  <span className="h-1 w-1 rounded-full bg-zinc-700" />

                  <span>
                    {totalNumberOfLectures} lectures
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {courseContent.length > 0 ? (
                  courseContent.map((section, index) => (
                    <CurriculumSection
                      key={section?._id || index}
                      section={section}
                      index={index}
                      isOpen={openSection === index}
                      onToggle={() =>
                        setOpenSection(
                          openSection === index
                            ? null
                            : index
                        )
                      }
                    />
                  ))
                ) : (
                  <div
                    className="
                      rounded-[24px]
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      p-8
                      text-center
                      text-sm
                      text-zinc-500
                    "
                  >
                    Course curriculum is not available yet.
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* =============================================
              RIGHT INFO COLUMN
          ============================================= */}

          <motion.aside
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
              duration: 0.65,
            }}
            className="
              h-fit
              rounded-[28px]
              border
              border-white/[0.08]
              bg-[#0a0a0a]
              p-6

              lg:sticky
              lg:top-24
            "
          >
            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.18em]
                text-fuchsia-400
              "
            >
              Course snapshot
            </p>

            <h3
              className="
                mt-2
                text-xl
                font-black
                tracking-[-0.03em]
                text-white
              "
            >
              Learn at your pace
            </h3>

            <div className="mt-6 space-y-4">
              {[
                {
                  icon: FiBookOpen,
                  label: "Sections",
                  value: courseContent.length,
                },
                {
                  icon: FiPlay,
                  label: "Total lectures",
                  value: totalNumberOfLectures,
                },
                {
                  icon: FiUsers,
                  label: "Enrolled students",
                  value: studentsEnrolled.length,
                },
                {
                  icon: FiClock,
                  label: "Learning mode",
                  value: "Self paced",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-white/[0.06]
                      pb-4
                      last:border-b-0
                      last:pb-0
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-white/[0.045]
                          text-zinc-400
                        "
                      >
                        <Icon size={14} />
                      </div>

                      <span className="text-xs text-zinc-500">
                        {item.label}
                      </span>
                    </div>

                    <span className="text-xs font-black text-white">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-emerald-500/15
                bg-emerald-500/[0.06]
                p-4
              "
            >
              <div className="flex items-center gap-2">
                <FiCheck
                  size={13}
                  className="text-emerald-400"
                />

                <span className="text-xs font-black text-emerald-300">
                  Ready when you are
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Start learning and track your progress through
                the StudyFlux dashboard.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* =================================================
          MODAL
      ================================================= */}

      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
        />
      )}
    </main>
  );
}

export default CourseDetails;