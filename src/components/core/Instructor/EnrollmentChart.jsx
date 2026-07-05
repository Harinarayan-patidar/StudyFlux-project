import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

import {
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiBarChart2,
  FiBookOpen,
  FiAward,
} from "react-icons/fi";

/* =========================================================
   CHART MODES
========================================================= */

const CHART_MODES = [
  {
    id: "students",
    label: "Students",
    icon: FiUsers,
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: FiTrendingUp,
  },
  {
    id: "rating",
    label: "Ratings",
    icon: FiStar,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function EnrollmentChart({
  coursePerformance = [],
}) {
  const [activeChart, setActiveChart] =
    useState("students");

  /* =======================================================
     PREPARE CHART DATA
  ======================================================= */

  const data = useMemo(() => {
    return coursePerformance.map(
      (course, index) => {
        const fullName =
          course.courseName ||
          `Course ${index + 1}`;

        return {
          id:
            course.courseId ||
            course._id ||
            index,

          fullName,

          name:
            fullName.length > 12
              ? `${fullName.slice(0, 12)}...`
              : fullName,

          students:
            Number(
              course.studentsEnrolled
            ) || 0,

          revenue:
            Number(
              course.estimatedRevenue
            ) || 0,

          rating:
            Number(
              course.averageRating
            ) || 0,
        };
      }
    );
  }, [coursePerformance]);

  /* =======================================================
     SUMMARY ANALYTICS
  ======================================================= */

  const analytics = useMemo(() => {
    if (data.length === 0) {
      return {
        totalStudents: 0,
        averageStudents: 0,
        topCourse: "No data",
        bestRating: 0,
      };
    }

    const totalStudents = data.reduce(
      (sum, course) =>
        sum + course.students,
      0
    );

    const averageStudents =
      totalStudents / data.length;

    const topCourse = data.reduce(
      (best, current) =>
        current.students >
        best.students
          ? current
          : best,
      data[0]
    );

    const bestRating = Math.max(
      ...data.map(
        (course) => course.rating
      )
    );

    return {
      totalStudents,
      averageStudents,
      topCourse:
        topCourse?.fullName || "No data",
      bestRating,
    };
  }, [data]);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 22,
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
          BACKGROUND GLOW
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-cyan-400/10
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-24
          h-72
          w-72
          rounded-full
          bg-yellow-400/10
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
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
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
              flex-shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <FiBarChart2 size={21} />
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
              Course Analytics
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-white/50
              "
            >
              Compare engagement, revenue and ratings
            </p>
          </div>
        </div>

        {/* ===============================================
            CHART SWITCHER
        =============================================== */}

        <div
          className="
            flex
            w-full
            gap-1
            rounded-2xl
            border
            border-white/10
            bg-black/25
            p-1
            sm:w-fit
          "
        >
          {CHART_MODES.map((mode) => {
            const Icon = mode.icon;

            const active =
              activeChart === mode.id;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() =>
                  setActiveChart(mode.id)
                }
                className="
                  relative
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  transition-colors
                  sm:flex-none
                  sm:text-sm
                "
              >
                {active && (
                  <motion.div
                    layoutId="active-chart-tab"
                    className="
                      absolute
                      inset-0
                      rounded-xl
                      border
                      border-white/10
                      bg-white/10
                      shadow-lg
                    "
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <Icon
                  size={15}
                  className={
                    active
                      ? "relative z-10 text-yellow-300"
                      : "relative z-10 text-white/40"
                  }
                />

                <span
                  className={
                    active
                      ? "relative z-10 text-white"
                      : "relative z-10 text-white/45"
                  }
                >
                  {mode.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================
          SUMMARY CARDS
      =================================================== */}

      <div
        className="
          relative
          z-10
          mt-6
          grid
          grid-cols-2
          gap-3
          xl:grid-cols-4
        "
      >
        <SummaryCard
          icon={FiUsers}
          label="Total Enrollments"
          value={
            analytics.totalStudents
          }
          iconClass="text-cyan-300"
          iconBg="bg-cyan-400/10"
        />

        <SummaryCard
          icon={FiBookOpen}
          label="Avg. per Course"
          value={Math.round(
            analytics.averageStudents
          )}
          iconClass="text-violet-300"
          iconBg="bg-violet-400/10"
        />

        <SummaryCard
          icon={FiAward}
          label="Top Course"
          value={analytics.topCourse}
          iconClass="text-yellow-300"
          iconBg="bg-yellow-400/10"
          truncate
        />

        <SummaryCard
          icon={FiStar}
          label="Best Rating"
          value={`${Number(
            analytics.bestRating
          ).toFixed(1)} / 5`}
          iconClass="text-emerald-300"
          iconBg="bg-emerald-400/10"
        />
      </div>

      {/* ===================================================
          CHART AREA
      =================================================== */}

      <div
        className="
          relative
          z-10
          mt-6
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-black/20
          p-3
          sm:p-5
        "
      >
        {data.length === 0 ? (
          <EmptyChartState />
        ) : (
          <>
            {/* Chart title */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <h3
                  className="
                    text-base
                    font-semibold
                    text-white
                  "
                >
                  {activeChart === "students" &&
                    "Student Enrollment"}

                  {activeChart === "revenue" &&
                    "Estimated Revenue"}

                  {activeChart === "rating" &&
                    "Course Ratings"}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/40
                  "
                >
                  {activeChart === "students" &&
                    "Students enrolled in each course"}

                  {activeChart === "revenue" &&
                    "Estimated revenue generated by course"}

                  {activeChart === "rating" &&
                    "Average student rating for each course"}
                </p>
              </div>

              <ChartLegend
                activeChart={activeChart}
              />
            </div>

            {/* ===========================================
                ANIMATED CHART SWITCHING
            =========================================== */}

            <div className="h-[320px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChart}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.28,
                  }}
                  className="h-full w-full"
                >
                  {activeChart ===
                    "students" && (
                    <StudentsBarChart
                      data={data}
                    />
                  )}

                  {activeChart ===
                    "revenue" && (
                    <RevenueAreaChart
                      data={data}
                    />
                  )}

                  {activeChart ===
                    "rating" && (
                    <RatingLineChart
                      data={data}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}

/* =========================================================
   STUDENTS BAR CHART
========================================================= */

function StudentsBarChart({ data }) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -15,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="rgba(255,255,255,0.08)"
          vertical={false}
        />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "rgba(255,255,255,0.65)",
            fontSize: 11,
          }}
          dy={10}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
          tick={{
            fill: "rgba(255,255,255,0.55)",
            fontSize: 11,
          }}
        />

        <Tooltip
          cursor={{
            fill: "rgba(255,255,255,0.04)",
          }}
          content={
            <CustomTooltip
              type="students"
            />
          }
        />

        <Bar
          dataKey="students"
          fill="#22D3EE"
          radius={[8, 8, 2, 2]}
          maxBarSize={52}
          animationDuration={900}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* =========================================================
   REVENUE AREA CHART
========================================================= */

function RevenueAreaChart({ data }) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -5,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient
            id="revenueGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#34D399"
              stopOpacity={0.35}
            />

            <stop
              offset="95%"
              stopColor="#34D399"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="4 4"
          stroke="rgba(255,255,255,0.08)"
          vertical={false}
        />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "rgba(255,255,255,0.65)",
            fontSize: 11,
          }}
          dy={10}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "rgba(255,255,255,0.55)",
            fontSize: 11,
          }}
          tickFormatter={(value) =>
            value >= 1000
              ? `₹${(
                  value / 1000
                ).toFixed(0)}k`
              : `₹${value}`
          }
        />

        <Tooltip
          content={
            <CustomTooltip
              type="revenue"
            />
          }
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#34D399"
          strokeWidth={3}
          fill="url(#revenueGradient)"
          activeDot={{
            r: 6,
            fill: "#34D399",
            stroke: "#ffffff",
            strokeWidth: 2,
          }}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* =========================================================
   RATING LINE CHART
========================================================= */

function RatingLineChart({ data }) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 15,
          left: -15,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="rgba(255,255,255,0.08)"
          vertical={false}
        />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "rgba(255,255,255,0.65)",
            fontSize: 11,
          }}
          dy={10}
        />

        <YAxis
          domain={[0, 5]}
          ticks={[0, 1, 2, 3, 4, 5]}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "rgba(255,255,255,0.55)",
            fontSize: 11,
          }}
        />

        <Tooltip
          content={
            <CustomTooltip
              type="rating"
            />
          }
        />

        <Line
          type="monotone"
          dataKey="rating"
          stroke="#FACC15"
          strokeWidth={3}
          dot={{
            r: 4,
            fill: "#FACC15",
            stroke: "#0B0F19",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 7,
            fill: "#FACC15",
            stroke: "#ffffff",
            strokeWidth: 2,
          }}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

function CustomTooltip({
  active,
  payload,
  type,
}) {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  const course = payload[0]?.payload;

  let label = "";
  let value = "";

  if (type === "students") {
    label = "Students";
    value =
      course.students || 0;
  }

  if (type === "revenue") {
    label = "Est. Revenue";

    value =
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(
        course.revenue || 0
      );
  }

  if (type === "rating") {
    label = "Average Rating";

    value = `${Number(
      course.rating || 0
    ).toFixed(1)} / 5`;
  }

  return (
    <div
      className="
        min-w-[180px]
        rounded-xl
        border
        border-white/10
        bg-[#111827]/95
        p-3
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <p
        className="
          max-w-[220px]
          text-sm
          font-semibold
          text-white
        "
      >
        {course.fullName}
      </p>

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          gap-5
        "
      >
        <span
          className="
            text-xs
            text-white/45
          "
        >
          {label}
        </span>

        <span
          className="
            text-sm
            font-bold
            text-white
          "
        >
          {value}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  iconClass,
  iconBg,
  truncate = false,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className="
        min-w-0
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.035]
        p-3
        backdrop-blur-xl
        transition-colors
        duration-300
        hover:border-white/15
        hover:bg-white/[0.055]
        sm:p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className={`
            flex
            h-9
            w-9
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconBg}
          `}
        >
          <Icon
            size={17}
            className={iconClass}
          />
        </div>

        <p
          className="
            truncate
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-white/40
            sm:text-xs
          "
        >
          {label}
        </p>
      </div>

      <p
        title={String(value)}
        className={`
          mt-3
          text-base
          font-bold
          text-white
          sm:text-lg

          ${
            truncate
              ? "truncate"
              : ""
          }
        `}
      >
        {value}
      </p>
    </motion.div>
  );
}

/* =========================================================
   CHART LEGEND
========================================================= */

function ChartLegend({
  activeChart,
}) {
  const config = {
    students: {
      label: "Enrollments",
      dot: "bg-cyan-400",
    },

    revenue: {
      label: "Revenue",
      dot: "bg-emerald-400",
    },

    rating: {
      label: "Rating",
      dot: "bg-yellow-400",
    },
  };

  const current =
    config[activeChart];

  return (
    <div
      className="
        hidden
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/[0.04]
        px-3
        py-1.5
        sm:flex
      "
    >
      <span
        className={`
          h-2
          w-2
          rounded-full
          ${current.dot}
        `}
      />

      <span
        className="
          text-xs
          font-medium
          text-white/60
        "
      >
        {current.label}
      </span>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyChartState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="
        flex
        h-[320px]
        flex-col
        items-center
        justify-center
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
          border-cyan-400/20
          bg-cyan-400/10
          text-cyan-300
        "
      >
        <FiBarChart2 size={27} />
      </motion.div>

      <h3
        className="
          mt-5
          text-lg
          font-semibold
          text-white
        "
      >
        No analytics yet
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          leading-6
          text-white/45
        "
      >
        Course engagement analytics will appear
        here once course data becomes available.
      </p>
    </motion.div>
  );
}

export default EnrollmentChart;