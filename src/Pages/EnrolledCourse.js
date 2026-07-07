import React, { useEffect, useState } from "react";
import {
  getEnrolledCourses,
  getCourseProgress,
} from "../services/operations/courseAPI";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Play,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingWords = [
  {
    text: "LEARN",
    top: "10%",
    left: "4%",
    delay: 0,
  },
  {
    text: "BUILD",
    top: "28%",
    right: "5%",
    delay: 1,
  },
  {
    text: "MASTER",
    bottom: "20%",
    left: "3%",
    delay: 2,
  },
  {
    text: "GROW",
    bottom: "10%",
    right: "7%",
    delay: 0.5,
  },
];

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCoursesWithProgress() {
      try {
        setLoading(true);

        const result = await getEnrolledCourses();

        if (result.success) {
          const courseList = result.data || [];
          setCourses(courseList);

          const progressPromises = courseList.map((course) =>
            getCourseProgress(course._id)
          );

          const progressResults = await Promise.all(progressPromises);

          const progressData = {};

          progressResults.forEach((res, index) => {
            const courseId = courseList[index]._id;

            if (res.success && res.data) {
              const completed =
                res.data.completedVideos?.length || 0;

              const total =
                courseList[index].courseContent?.reduce(
                  (sum, section) => {
                    return (
                      sum +
                      (section.subSection?.length || 0)
                    );
                  },
                  0
                ) || 1;

              progressData[courseId] = {
                completed,
                total,
                percentage: Math.min(
                  100,
                  Math.round((completed / total) * 100)
                ),
              };
            } else {
              progressData[courseId] = {
                completed: 0,
                total: 1,
                percentage: 0,
              };
            }
          });

          setProgressMap(progressData);
        }
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoursesWithProgress();
  }, []);

  const handleCourseClick = (course) => {
    const courseId = course._id;
    const section = course?.courseContent?.[0];
    const sectionId = section?._id;
    const subSectionId = section?.subSection?.[0]?._id;

    if (courseId && sectionId && subSectionId) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`
      );
    } else if (courseId && sectionId) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}`
      );
    } else {
      navigate(`/view-course/${courseId}`);
    }
  };

  // ================= DASHBOARD CALCULATIONS =================

  const totalCompleted = Object.values(progressMap).reduce(
    (sum, progress) => sum + progress.completed,
    0
  );

  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, course) => {
            return (
              sum +
              (progressMap[course._id]?.percentage || 0)
            );
          }, 0) / courses.length
        )
      : 0;

  const completedCourses = courses.filter(
    (course) =>
      progressMap[course._id]?.percentage === 100
  ).length;

  // ================= LOADING SCREEN =================

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#070B14] px-5 py-12">
        {/* Loading background glow */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[10%] top-[10%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Loading heading */}
          <div className="mb-10 text-center">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"
            >
              <GraduationCap className="text-cyan-300" />
            </motion.div>

            <h2 className="text-2xl font-bold text-white">
              Loading your learning universe...
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Gathering courses and calculating progress
            </p>
          </div>

          {/* Skeleton Cards */}
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="h-40 w-full animate-pulse rounded-2xl bg-white/10 sm:h-28 sm:w-44" />

                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-1/2 animate-pulse rounded bg-white/10" />
                    <div className="h-3 w-full animate-pulse rounded bg-white/5" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-white/5" />
                  </div>

                  <div className="w-full space-y-3 sm:w-56">
                    <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                    <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      {/* ================= BACKGROUND GRID ================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ================= MOTION GLOWS ================= */}

      <motion.div
        animate={{
          x: [0, 100, 20, 0],
          y: [0, 60, 130, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-cyan-500/15 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -100, -30, 0],
          y: [0, 100, 30, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 60, -50, 0],
          y: [0, -80, 20, 0],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-200px] left-[30%] h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[150px]"
      />

      {/* ================= FLOATING WORDS ================= */}

      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        {floatingWords.map((word, index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -16, 0],
              rotate: [-2, 2, -2],
              opacity: [0.12, 0.3, 0.12],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: word.delay,
              ease: "easeInOut",
            }}
            style={{
              top: word.top,
              left: word.left,
              right: word.right,
              bottom: word.bottom,
            }}
            className="absolute text-xs font-black tracking-[0.5em] text-cyan-300"
          >
            {word.text}
          </motion.span>
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14"
      >
        {/* ================= HERO HEADER ================= */}

        <motion.section
          variants={itemVariants}
          className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="mb-3 flex items-center gap-2"
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/70">
                Learning Dashboard
              </span>
            </motion.div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Your Learning{" "}
              <motion.span
                animate={{
                  backgroundPosition: [
                    "0% 50%",
                    "100% 50%",
                    "0% 50%",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
                className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              >
                Journey
              </motion.span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Pick up where you left off, track every milestone,
              and keep turning curiosity into skill.
            </p>
          </div>

          {/* Active learning badge */}

          <motion.div
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            className="flex w-fit items-center gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.07] px-5 py-3 backdrop-blur-xl"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400" />
            </span>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Learning Status
              </p>

              <p className="text-sm font-semibold text-cyan-300">
                Journey Active
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* ================= SUMMARY STATS ================= */}

        <motion.section
          variants={containerVariants}
          className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              label: "Enrolled Courses",
              value: courses.length,
              icon: BookOpen,
              gradient:
                "from-cyan-400/15 to-blue-500/[0.03]",
            },
            {
              label: "Videos Completed",
              value: totalCompleted,
              icon: CheckCircle2,
              gradient:
                "from-emerald-400/15 to-cyan-500/[0.03]",
            },
            {
              label: "Average Progress",
              value: `${averageProgress}%`,
              icon: Zap,
              gradient:
                "from-violet-400/15 to-purple-500/[0.03]",
            },
            {
              label: "Courses Finished",
              value: completedCourses,
              icon: Trophy,
              gradient:
                "from-amber-400/15 to-orange-500/[0.03]",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className={`group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br ${stat.gradient} p-5 backdrop-blur-xl`}
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.04] blur-2xl transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-black tracking-tight">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      {stat.label}
                    </p>
                  </div>

                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]"
                  >
                    <Icon
                      size={20}
                      className="text-cyan-200"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        {/* ================= SECTION TITLE ================= */}

        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/60">
              Continue Exploring
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Enrolled Courses
            </h2>
          </div>

          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <BookOpen size={15} />

            <span>
              {courses.length}{" "}
              {courses.length === 1 ? "course" : "courses"}
            </span>
          </div>
        </motion.div>

        {/* ================= EMPTY STATE ================= */}

        {courses.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-20 text-center backdrop-blur-xl"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-cyan-400/20 bg-cyan-400/10"
            >
              <GraduationCap
                size={34}
                className="text-cyan-300"
              />
            </motion.div>

            <h3 className="mt-6 text-2xl font-bold">
              Your classroom is waiting
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              No enrolled courses found yet. Find something
              fascinating and give your curiosity a new rabbit hole.
            </p>
          </motion.div>
        ) : (
          /* ================= COURSE LIST ================= */

          <motion.div
            variants={containerVariants}
            className="space-y-5"
          >
            {courses.map((course, index) => {
              const progress = progressMap[course._id] || {
                completed: 0,
                total: 1,
                percentage: 0,
              };

              const isCompleted =
                progress.percentage === 100;

              return (
                <motion.article
                  key={course._id}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                  }}
                  onClick={() => handleCourseClick(course)}
                  className="group relative cursor-pointer overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.045] p-4 backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-400/20 hover:bg-white/[0.065] sm:p-5"
                >
                  {/* Course number */}

                  <div className="absolute right-5 top-3 text-6xl font-black text-white/[0.025] sm:text-7xl">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Decorative glow */}

                  <div className="absolute -left-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-[60px] transition-all duration-500 group-hover:bg-cyan-500/[0.10]" />

                  <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
                    {/* ================= THUMBNAIL ================= */}

                    <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-[22px] border border-white/10 md:h-32 md:w-52">
                      <motion.img
                        whileHover={{
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.5,
                        }}
                        src={
                          course.thumbnail ||
                          "/default-course-thumbnail.jpg"
                        }
                        alt={course.courseName}
                        className="h-full w-full object-cover"
                      />

                      {/* Dark overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Play button */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        whileHover={{
                          scale: 1.1,
                        }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-md">
                          <Play
                            size={18}
                            fill="white"
                            className="ml-1 text-white"
                          />
                        </div>
                      </motion.div>

                      {/* Status badge */}

                      <div className="absolute bottom-3 left-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                            isCompleted
                              ? "border-emerald-400/30 bg-emerald-400/20 text-emerald-200"
                              : "border-cyan-400/30 bg-cyan-400/20 text-cyan-200"
                          }`}
                        >
                          {isCompleted
                            ? "Completed"
                            : "In Progress"}
                        </span>
                      </div>
                    </div>

                    {/* ================= COURSE INFO ================= */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="min-w-0">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
                            Course {index + 1}
                          </p>

                          <h3 className="truncate text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-2xl">
                            {course.courseName}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-400">
                        {course.courseDescription ||
                          "Continue your learning journey and unlock the next chapter."}
                      </p>

                      {/* Mini metadata */}

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5">
                          <BookOpen
                            size={12}
                            className="text-cyan-300"
                          />

                          <span className="text-[11px] text-slate-400">
                            {progress.total} Lectures
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5">
                          <CheckCircle2
                            size={12}
                            className="text-emerald-300"
                          />

                          <span className="text-[11px] text-slate-400">
                            {progress.completed} Completed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ================= PROGRESS AREA ================= */}

                    <div className="w-full shrink-0 md:w-64 lg:w-72">
                      <div className="mb-3 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                            Course Progress
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-300">
                            {progress.completed} of{" "}
                            {progress.total} lectures
                          </p>
                        </div>

                        <motion.span
                          initial={{
                            opacity: 0,
                            scale: 0.7,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            delay: 0.5 + index * 0.1,
                          }}
                          className="text-2xl font-black text-cyan-300"
                        >
                          {progress.percentage}%
                        </motion.span>
                      </div>

                      {/* Progress track */}

                      <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.08]">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${progress.percentage}%`,
                          }}
                          transition={{
                            duration: 1.2,
                            delay: 0.4 + index * 0.12,
                            ease: "easeOut",
                          }}
                          className={`relative h-full rounded-full ${
                            isCompleted
                              ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
                              : "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                          }`}
                        >
                          {/* Progress shine */}

                          <motion.div
                            animate={{
                              x: ["-100%", "200%"],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          />
                        </motion.div>
                      </div>

                      {/* Continue Button */}

                      <motion.button
                        whileHover={{
                          x: 4,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCourseClick(course);
                        }}
                        className="mt-4 flex w-full items-center justify-between rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] px-4 py-2.5 text-sm font-semibold text-cyan-200 transition-colors duration-300 hover:bg-cyan-400/[0.12]"
                      >
                        <span>
                          {isCompleted
                            ? "Review Course"
                            : "Continue Learning"}
                        </span>

                        <motion.span
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                          }}
                        >
                          <ArrowUpRight size={16} />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover shine */}

                  <div className="pointer-events-none absolute inset-y-0 -left-full w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.025] to-transparent transition-all duration-1000 group-hover:left-[140%]" />
                </motion.article>
              );
            })}
          </motion.div>
        )}

        {/* ================= BOTTOM MOTIVATION CARD ================= */}

        {courses.length > 0 && (
          <motion.section
            variants={itemVariants}
            whileHover={{
              scale: 1.005,
            }}
            className="relative mt-8 overflow-hidden rounded-[30px] border border-white/[0.08] bg-gradient-to-r from-cyan-500/[0.08] via-blue-500/[0.07] to-violet-500/[0.08] px-6 py-6 backdrop-blur-xl"
          >
            {/* Animated light sweep */}

            <motion.div
              animate={{
                x: ["-100%", "250%"],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-y-0 w-40 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/10"
                >
                  <Zap
                    size={20}
                    className="text-cyan-300"
                  />
                </motion.div>

                <div>
                  <p className="font-semibold text-slate-200">
                    Momentum looks good on you.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    One lecture today can quietly become a
                    career-changing skill tomorrow.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-4 py-2">
                <Clock3
                  size={14}
                  className="text-violet-300"
                />

                <span className="text-xs font-medium text-slate-400">
                  Average progress
                </span>

                <span className="text-xs font-bold text-cyan-300">
                  {averageProgress}%
                </span>
              </div>
            </div>
          </motion.section>
        )}
      </motion.main>
    </div>
  );
}

export default EnrolledCourses;