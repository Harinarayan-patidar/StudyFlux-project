import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { toast } from "react-hot-toast";

import {
  FiRefreshCw,
  FiAlertCircle,
  FiBarChart2,
  FiActivity,
  FiBookOpen,
  FiMessageSquare,
} from "react-icons/fi";

import {
  getInstructorDashboard,
} from "../../../services/operations/instructorAPI";

import InstructorHeader from "./InstructorHeader";
import InstructorStats from "./InstructorStats";
import EnrollmentChart from "./EnrollmentChart";
import RatingDistribution from "./RatingDistribution";
import CoursePerformance from "./CoursePerformance";
import RecentReviews from "./RecentReviews";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const pageVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function InstructorDashboard() {
  const [
    dashboardData,
    setDashboardData,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  /* =======================================================
     FETCH DASHBOARD
  ======================================================= */

  const fetchDashboard = useCallback(
    async (isRefresh = false) => {
      console.log(
        "\n================================"
      );

      console.log(
        "📊 INSTRUCTOR DASHBOARD PAGE FETCH"
      );

      console.log(
        "================================"
      );

      try {
        if (isRefresh) {
          setRefreshing(true);

          console.log(
            "🔄 Manual dashboard refresh started"
          );
        } else {
          setLoading(true);
        }

        setError("");

        console.log(
          "📤 Calling dashboard API..."
        );

        const data =
          await getInstructorDashboard();

        console.log(
          "📥 Dashboard data received:",
          data
        );

        if (!data) {
          throw new Error(
            "Dashboard API returned no data"
          );
        }

        setDashboardData(data);

        console.log(
          "✅ Dashboard state updated"
        );

        if (isRefresh) {
          toast.success(
            "Dashboard refreshed"
          );
        }
      } catch (error) {
        console.error(
          "❌ Dashboard page error:",
          error
        );

        const message =
          error.response?.data?.message ||
          error.message ||
          "Unable to load instructor dashboard";

        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
        setRefreshing(false);

        console.log(
          "🏁 Dashboard fetch completed"
        );

        console.log(
          "================================\n"
        );
      }
    },
    []
  );

  /* =======================================================
     INITIAL FETCH
  ======================================================= */

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return <DashboardLoading />;
  }

  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error && !dashboardData) {
    return (
      <DashboardError
        error={error}
        onRetry={() =>
          fetchDashboard(false)
        }
      />
    );
  }

  /* =======================================================
     SAFE DATA EXTRACTION
  ======================================================= */

  const {
    instructor = {},
    stats = {},
    ratingDistribution = {},
    coursePerformance = [],
    recentReviews = [],
  } = dashboardData || {};

  /* =======================================================
     DASHBOARD UI
  ======================================================= */

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050810]
        px-3
        py-6
        text-white
        sm:px-6
        sm:py-8
        lg:px-8
      "
    >
      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          -right-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/[0.07]
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          -bottom-48
          -left-40
          h-[520px]
          w-[520px]
          rounded-full
          bg-yellow-400/[0.06]
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          left-1/2
          top-1/3
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/[0.035]
          blur-[150px]
        "
      />

      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          z-10
          mx-auto
          max-w-[1600px]
          space-y-7
        "
      >
        {/* =================================================
            TOP PAGE BAR
        ================================================= */}

        <motion.div
          variants={sectionVariants}
          className="
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
                gap-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-cyan-300/80
              "
            >
              <FiActivity size={14} />

              Instructor Workspace
            </div>

            <h1
              className="
                mt-2
                text-2xl
                font-bold
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              Dashboard Overview
            </h1>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-white/45
              "
            >
              Monitor course performance,
              student engagement, ratings and
              estimated revenue from one place.
            </p>
          </div>

          {/* Refresh button */}

          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              fetchDashboard(true)
            }
            disabled={refreshing}
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.05]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-cyan-400/30
              hover:bg-white/[0.08]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FiRefreshCw
              className={
                refreshing
                  ? "animate-spin text-cyan-300"
                  : "text-cyan-300"
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh Data"}
          </motion.button>
        </motion.div>

        {/* =================================================
            INSTRUCTOR HEADER
        ================================================= */}

        <motion.div
          variants={sectionVariants}
        >
          <InstructorHeader
            instructor={instructor}
          />
        </motion.div>

        {/* =================================================
            STATS
        ================================================= */}

        <motion.div
          variants={sectionVariants}
        >
          <InstructorStats
            stats={stats}
          />
        </motion.div>

        {/* =================================================
            ANALYTICS SECTION
        ================================================= */}

        <motion.section
          variants={sectionVariants}
          className="space-y-4"
        >
          <SectionHeading
            icon={FiBarChart2}
            eyebrow="Performance Intelligence"
            title="Analytics Overview"
            description="Explore enrollment, revenue and rating patterns across your courses."
          />

          <div
            className="
              grid
              grid-cols-1
              gap-6
              2xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]
            "
          >
            <div className="min-w-0">
              <EnrollmentChart
                coursePerformance={
                  coursePerformance
                }
              />
            </div>

            <div className="min-w-0">
              <RatingDistribution
                distribution={
                  ratingDistribution
                }
                totalReviews={
                  stats?.totalReviews || 0
                }
              />
            </div>
          </div>
        </motion.section>

        {/* =================================================
            COURSE PERFORMANCE
        ================================================= */}

        <motion.section
          variants={sectionVariants}
          className="space-y-4"
        >
          <SectionHeading
            icon={FiBookOpen}
            eyebrow="Course Intelligence"
            title="Course Breakdown"
            description="A detailed performance snapshot for every course in your catalog."
          />

          <CoursePerformance
            courses={coursePerformance}
          />
        </motion.section>

        {/* =================================================
            RECENT REVIEWS
        ================================================= */}

        <motion.section
          variants={sectionVariants}
          className="space-y-4"
        >
          <SectionHeading
            icon={FiMessageSquare}
            eyebrow="Student Voice"
            title="Recent Feedback"
            description="See what learners are saying about your courses."
          />

          <RecentReviews
            reviews={recentReviews}
          />
        </motion.section>

        {/* =================================================
            FOOTER STATUS
        ================================================= */}

        <motion.div
          variants={sectionVariants}
          className="
            flex
            flex-col
            gap-2
            border-t
            border-white/[0.07]
            py-5
            text-xs
            text-white/30
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            StudyFlux Instructor Analytics
          </p>

          <p>
            Data reflects your current course
            activity
          </p>
        </motion.div>
      </motion.div>

      {/* ===================================================
          REFRESH OVERLAY INDICATOR
      =================================================== */}

      <AnimatePresence>
        {refreshing && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            className="
              fixed
              right-5
              top-5
              z-50
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-[#111827]/95
              px-4
              py-3
              text-sm
              font-medium
              text-white
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <FiRefreshCw
              className="
                animate-spin
                text-cyan-300
              "
            />

            Updating analytics...
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
      "
    >
      <motion.div
        whileHover={{
          rotate: 7,
          scale: 1.06,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
        className="
          mt-0.5
          flex
          h-10
          w-10
          flex-shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/[0.05]
          text-cyan-300
        "
      >
        <Icon size={18} />
      </motion.div>

      <div>
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-white/35
            sm:text-xs
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            mt-1
            text-lg
            font-bold
            text-white
            sm:text-xl
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            max-w-2xl
            text-sm
            leading-6
            text-white/45
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   LOADING SCREEN
========================================================= */

function DashboardLoading() {
  return (
    <div
      className="
        min-h-screen
        bg-[#050810]
        px-4
        py-8
        text-white
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]
          space-y-7
        "
      >
        {/* Top loading indicator */}

        <div
          className="
            flex
            min-h-[180px]
            flex-col
            items-center
            justify-center
          "
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                h-12
                w-12
                rounded-full
                border-2
                border-white/10
                border-t-cyan-300
              "
            />

            <div
              className="
                absolute
                inset-2
                rounded-full
                bg-cyan-400/10
                blur-md
              "
            />
          </div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              mt-5
              text-sm
              font-medium
              text-white/60
            "
          >
            Loading instructor analytics...
          </motion.p>

          <p
            className="
              mt-1
              text-xs
              text-white/30
            "
          >
            Gathering your course performance
          </p>
        </div>

        {/* Skeleton stats */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            lg:grid-cols-4
          "
        >
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>

        {/* Skeleton chart */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-[1.5fr_1fr]
          "
        >
          <SkeletonPanel height="h-[420px]" />
          <SkeletonPanel height="h-[420px]" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SKELETON CARD
========================================================= */

function SkeletonCard() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.03]
        p-4
      "
    >
      <div
        className="
          h-9
          w-9
          animate-pulse
          rounded-xl
          bg-white/[0.08]
        "
      />

      <div
        className="
          mt-4
          h-3
          w-20
          animate-pulse
          rounded-full
          bg-white/[0.07]
        "
      />

      <div
        className="
          mt-3
          h-6
          w-28
          animate-pulse
          rounded-full
          bg-white/[0.09]
        "
      />
    </div>
  );
}

/* =========================================================
   SKELETON PANEL
========================================================= */

function SkeletonPanel({
  height = "h-80",
}) {
  return (
    <div
      className={`
        ${height}
        animate-pulse
        rounded-3xl
        border
        border-white/[0.07]
        bg-white/[0.03]
        p-5
      `}
    >
      <div
        className="
          h-5
          w-40
          rounded-full
          bg-white/[0.09]
        "
      />

      <div
        className="
          mt-3
          h-3
          w-64
          max-w-full
          rounded-full
          bg-white/[0.06]
        "
      />

      <div
        className="
          mt-8
          h-[75%]
          rounded-2xl
          bg-white/[0.025]
        "
      />
    </div>
  );
}

/* =========================================================
   ERROR SCREEN
========================================================= */

function DashboardError({
  error,
  onRetry,
}) {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#050810]
        px-4
        text-white
      "
    >
      {/* Error glow */}

      <div
        className="
          pointer-events-none
          absolute
          h-80
          w-80
          rounded-full
          bg-red-500/10
          blur-[120px]
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-3xl
          border
          border-red-400/15
          bg-white/[0.04]
          p-7
          text-center
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2.2,
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
            border-red-400/20
            bg-red-400/10
            text-red-300
          "
        >
          <FiAlertCircle size={28} />
        </motion.div>

        <h2
          className="
            mt-5
            text-xl
            font-bold
            text-white
          "
        >
          Dashboard unavailable
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-white/50
          "
        >
          {error}
        </p>

        <motion.button
          type="button"
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={onRetry}
          className="
            mx-auto
            mt-6
            flex
            items-center
            gap-2
            rounded-xl
            bg-white
            px-5
            py-2.5
            text-sm
            font-bold
            text-black
            transition
            hover:bg-white/90
          "
        >
          <FiRefreshCw />

          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
}

export default InstructorDashboard;