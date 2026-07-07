import React from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  GraduationCap,
  Heart,
  Layers3,
  Play,
  Quote,
  Rocket,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react";

// =====================================
// INSTRUCTORS
// =====================================

const instructors = [
  {
    name: "Ankit Sharma",
    expertise: "Full Stack Development",
    description:
      "Building production-ready web applications from frontend to deployment.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    icon: Code2,
    tag: "Web Development",
  },
  {
    name: "Riya Verma",
    expertise: "Data Science",
    description:
      "Turning complex datasets into practical insights and intelligent systems.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    icon: BrainCircuit,
    tag: "AI & Data",
  },
  {
    name: "Rahul Singh",
    expertise: "Competitive Programming",
    description:
      "Mastering problem solving through algorithms, patterns and sharp thinking.",
    img: "https://randomuser.me/api/portraits/men/83.jpg",
    icon: Trophy,
    tag: "DSA",
  },
];

// =====================================
// FEATURES
// =====================================

const features = [
  {
    icon: Layers3,
    title: "Structured Learning",
    description:
      "Clear learning paths designed to move from fundamentals to real-world skills.",
  },
  {
    icon: Video,
    title: "Learn by Watching",
    description:
      "Focused video lessons, practical notes and progress-aware course journeys.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Notes",
    description:
      "Generate intelligent summaries and notes from lectures when you need them.",
  },
  {
    icon: Users,
    title: "Built for Learners",
    description:
      "Simple interfaces, meaningful progress tracking and fewer unnecessary distractions.",
  },
];

// =====================================
// STATS
// =====================================

const stats = [
  {
    value: "10+",
    label: "Learning Paths",
  },
  {
    value: "50+",
    label: "Video Lessons",
  },
  {
    value: "24/7",
    label: "Learn Anywhere",
  },
  {
    value: "100%",
    label: "Built with Purpose",
  },
];

// =====================================
// ANIMATION VARIANTS
// =====================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// =====================================
// ABOUT US
// =====================================

export default function AboutUs() {
  const { scrollYProgress } = useScroll();

  // Small controlled background movement
  const backgroundTextX = useTransform(
    scrollYProgress,
    [0, 1],
    ["3%", "-3%"]
  );

  const secondBackgroundTextX = useTransform(
    scrollYProgress,
    [0, 1],
    ["-3%", "3%"]
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.35],
    [0, 70]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0.3]
  );

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* =====================================
          GLOBAL BACKGROUND
      ===================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* Dark Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-60
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(139,92,246,0.055) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(139,92,246,0.055) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Top Fade */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-[500px]
            bg-gradient-to-b
            from-violet-950/20
            via-transparent
            to-transparent
          "
        />

        {/* Animated Purple Glow */}

        <motion.div
          animate={{
            x: [0, 80, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-32
            top-10
            h-[420px]
            w-[420px]
            rounded-full
            bg-violet-600/15
            blur-[120px]
          "
        />

        {/* Animated Cyan Glow */}

        <motion.div
          animate={{
            x: [0, -70, 10, 0],
            y: [0, 80, 20, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-40
            top-[25%]
            h-[460px]
            w-[460px]
            rounded-full
            bg-cyan-500/10
            blur-[130px]
          "
        />

        {/* Bottom Purple Glow */}

        <motion.div
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-0
            left-[35%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-fuchsia-600/10
            blur-[130px]
          "
        />
      </div>

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section
        className="
          relative
          z-10
          flex
          min-h-[88vh]
          items-center
          overflow-hidden
          border-b
          border-white/10
        "
      >
        {/* =====================================
            BACKGROUND STUDYFLUX
        ===================================== */}

        <motion.div
          style={{
            x: backgroundTextX,
          }}
          animate={{
            opacity: [0.055, 0.11, 0.055],
          }}
          transition={{
            opacity: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[10%]
            -translate-x-1/2
            whitespace-nowrap
            select-none

            text-[16vw]
            sm:text-[14vw]
            md:text-[12vw]
            lg:text-[10vw]
            xl:text-[9vw]

            font-black
            leading-none
            tracking-[-0.07em]
            text-violet-400
          "
        >
          STUDYFLUX
        </motion.div>

        {/* Outline Background Text */}

        <motion.div
          style={{
            x: secondBackgroundTextX,
          }}
          className="
            pointer-events-none
            absolute
            bottom-[4%]
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            select-none

            text-[8vw]
            sm:text-[7vw]
            md:text-[6vw]
            lg:text-[5vw]
            xl:text-[4.5vw]

            font-black
            leading-none
            tracking-[-0.06em]
            text-transparent
            opacity-[0.12]
            [-webkit-text-stroke:1.5px_#8b5cf6]
          "
        >
          LEARN • BUILD • GROW
        </motion.div>

        {/* =====================================
            HERO CONTENT
        ===================================== */}

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
          className="
            relative
            z-20
            mx-auto
            grid
            w-full
            max-w-7xl
            grid-cols-1
            items-center
            gap-14
            px-5
            py-24
            sm:px-8
            lg:grid-cols-[1.15fr_0.85fr]
            lg:px-10
          "
        >
          {/* =====================================
              HERO LEFT
          ===================================== */}

          <div>
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.6,
              }}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(139,92,246,0.6)",
              }}
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-violet-500/25
                bg-violet-500/10
                px-4
                py-2
                shadow-[0_0_30px_rgba(139,92,246,0.08)]
                backdrop-blur-xl
              "
            >
              <motion.span
                animate={{
                  rotate: [0, 15, -10, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Sparkles
                  size={14}
                  className="text-violet-400"
                />
              </motion.span>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-violet-300
                "
              >
                The Story Behind StudyFlux
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 45,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-4xl
                text-5xl
                font-black
                leading-[0.95]
                tracking-[-0.06em]
                text-white
                sm:text-6xl
                md:text-7xl
                lg:text-[82px]
              "
            >
              Learning should
              <br />

              <span className="relative inline-block">
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
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-fuchsia-400
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  create momentum.
                </motion.span>

                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: 1,
                  }}
                  transition={{
                    delay: 1,
                    duration: 0.8,
                  }}
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-[5px]
                    w-full
                    origin-left
                    rounded-full
                    bg-gradient-to-r
                    from-violet-500
                    via-fuchsia-500
                    to-cyan-400
                    shadow-[0_0_20px_rgba(139,92,246,0.5)]
                  "
                />
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
                duration: 0.7,
              }}
              className="
                mt-9
                max-w-2xl
                text-base
                leading-8
                text-zinc-400
                sm:text-lg
              "
            >
              StudyFlux is an EdTech platform envisioned by{" "}
              <span className="font-bold text-white">
                Harinarayan Patidar
              </span>
              , built around one simple idea: education should
              be engaging, accessible and designed for real
              progress, not endless clicking through forgotten
              tabs.
            </motion.p>

            {/* Hero Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.75,
                duration: 0.7,
              }}
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-4
              "
            >
              {/* Start Button */}

              <motion.button
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  px-5
                  py-3.5
                  text-black
                  shadow-[0_18px_50px_rgba(255,255,255,0.1)]
                "
              >
                <motion.span
                  animate={{
                    x: ["-150%", "250%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    w-16
                    rotate-12
                    bg-gradient-to-r
                    from-transparent
                    via-violet-300/50
                    to-transparent
                  "
                />

                <div
                  className="
                    relative
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-black
                    text-white
                  "
                >
                  <Play
                    size={13}
                    fill="currentColor"
                  />
                </div>

                <div className="relative text-left">
                  <p className="text-xs font-black text-black">
                    Start Learning
                  </p>

                  <p className="text-[9px] text-zinc-500">
                    Explore the journey
                  </p>
                </div>

                <ArrowUpRight
                  size={15}
                  className="
                    relative
                    ml-2
                    text-black
                    transition-transform
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </motion.button>

              {/* Expert Card */}

              <motion.div
                whileHover={{
                  y: -3,
                  borderColor: "rgba(139,92,246,0.45)",
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-4
                  py-3
                  backdrop-blur-xl
                "
              >
                <div className="flex -space-x-2">
                  {instructors.map(
                    (instructor, index) => (
                      <img
                        key={index}
                        src={instructor.img}
                        alt={instructor.name}
                        className="
                          h-8
                          w-8
                          rounded-full
                          border-2
                          border-black
                          object-cover
                        "
                      />
                    )
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <Star
                          key={star}
                          size={9}
                          fill="currentColor"
                          className="text-amber-400"
                        />
                      )
                    )}
                  </div>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      font-semibold
                      text-zinc-400
                    "
                  >
                    Learn from experts
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* =====================================
              HERO RIGHT CARDS
          ===================================== */}

          <div
            className="
              relative
              hidden
              min-h-[500px]
              lg:block
            "
          >
            {/* Main Learning Card */}

            <motion.div
              initial={{
                opacity: 0,
                x: 60,
                rotate: 4,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 2,
                y: [0, -12, 0],
              }}
              transition={{
                opacity: {
                  delay: 0.4,
                  duration: 0.8,
                },
                x: {
                  delay: 0.4,
                  duration: 0.8,
                },
                rotate: {
                  delay: 0.4,
                  duration: 0.8,
                },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="
                absolute
                right-4
                top-8
                w-[350px]
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-zinc-950/85
                p-6
                shadow-[0_30px_90px_rgba(139,92,246,0.18)]
                backdrop-blur-2xl
              "
            >
              {/* Card Glow */}

              <div
                className="
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-violet-600/25
                  blur-[55px]
                "
              />

              <div
                className="
                  absolute
                  -bottom-20
                  -left-20
                  h-40
                  w-40
                  rounded-full
                  bg-cyan-500/10
                  blur-[55px]
                "
              />

              <div className="relative">
                <div className="flex items-center justify-between">
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
                      bg-violet-500/10
                    "
                  >
                    <GraduationCap
                      size={20}
                      className="text-violet-400"
                    />
                  </div>

                  <span
                    className="
                      rounded-full
                      border
                      border-emerald-500/20
                      bg-emerald-500/10
                      px-3
                      py-1
                      text-[9px]
                      font-bold
                      text-emerald-400
                    "
                  >
                    ● Learning
                  </span>
                </div>

                <p
                  className="
                    mt-8
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-zinc-500
                  "
                >
                  Your Journey
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-black
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  Build skills that
                  <br />
                  move with you.
                </h3>

                <div className="mt-7">
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-semibold
                        text-zinc-400
                      "
                    >
                      Weekly progress
                    </span>

                    <span
                      className="
                        text-xs
                        font-black
                        text-violet-400
                      "
                    >
                      78%
                    </span>
                  </div>

                  <div
                    className="
                      h-2.5
                      overflow-hidden
                      rounded-full
                      bg-white/10
                    "
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: "78%",
                      }}
                      transition={{
                        delay: 1.2,
                        duration: 1.4,
                        ease: "easeOut",
                      }}
                      className="
                        relative
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-violet-500
                        via-fuchsia-500
                        to-cyan-400
                      "
                    >
                      <motion.span
                        animate={{
                          x: ["-100%", "300%"],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="
                          absolute
                          inset-y-0
                          w-10
                          bg-gradient-to-r
                          from-transparent
                          via-white/70
                          to-transparent
                        "
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Notes Card */}

            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [-3, -1, -3],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-0
                top-[44%]
                w-[210px]
                rounded-[24px]
                border
                border-white/10
                bg-zinc-950/90
                p-4
                shadow-[0_24px_70px_rgba(139,92,246,0.15)]
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-violet-500/20
                    bg-violet-500/10
                  "
                >
                  <BrainCircuit
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-black
                      text-white
                    "
                  >
                    AI Notes
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      text-zinc-500
                    "
                  >
                    Smart summaries
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Completed Card */}

            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-8
                right-2
                flex
                items-center
                gap-3
                rounded-[22px]
                border
                border-white/10
                bg-zinc-950/90
                px-5
                py-4
                shadow-[0_24px_70px_rgba(16,185,129,0.12)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                "
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-black
                    text-white
                  "
                >
                  Lecture Completed
                </p>

                <p
                  className="
                    mt-0.5
                    text-[8px]
                    text-zinc-500
                  "
                >
                  Keep the momentum alive
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* =====================================
          MARQUEE
      ===================================== */}

      <section
        className="
          relative
          z-10
          overflow-hidden
          border-y
          border-white/10
          bg-zinc-950
          py-5
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-violet-950/20
            via-transparent
            to-cyan-950/20
          "
        />

        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            relative
            flex
            w-max
            items-center
            whitespace-nowrap
          "
        >
          {[
            "LEARN",
            "BUILD",
            "PRACTICE",
            "CREATE",
            "GROW",
            "EXPLORE",
            "LEARN",
            "BUILD",
            "PRACTICE",
            "CREATE",
            "GROW",
            "EXPLORE",
          ].map((word, index) => (
            <div
              key={index}
              className="flex items-center"
            >
              <span
                className="
                  px-8
                  text-sm
                  font-black
                  tracking-[0.25em]
                  text-zinc-200
                  sm:px-12
                "
              >
                {word}
              </span>

              <Sparkles
                size={14}
                className="text-violet-400"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* =====================================
          PHILOSOPHY
      ===================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          py-24
          sm:px-8
          lg:px-10
          lg:py-32
        "
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            grid
            grid-cols-1
            gap-14
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-end
          "
        >
          <motion.div variants={fadeUp}>
            <div
              className="
                mb-5
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-[2px]
                  w-8
                  bg-violet-500
                  shadow-[0_0_10px_rgba(139,92,246,0.8)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-violet-400
                "
              >
                Our Philosophy
              </span>
            </div>

            <h2
              className="
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.055em]
                text-white
                sm:text-5xl
              "
            >
              Education with
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-violet-400
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                less friction.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="
              max-w-2xl
              text-base
              leading-8
              text-zinc-400
              sm:text-lg
            "
          >
            Great learning experiences do not need unnecessary
            complexity. StudyFlux brings courses, progress,
            reviews and intelligent learning tools into one
            focused experience, giving students more room to
            learn and less reason to wrestle with the interface.
          </motion.p>
        </motion.div>

        {/* Features */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mt-16
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {features.map(
            (feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -10,
                    scale: 1.015,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/10
                    bg-zinc-950/70
                    p-6
                    shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                    backdrop-blur-xl
                    transition-all
                    hover:border-violet-500/30
                    hover:shadow-[0_25px_70px_rgba(139,92,246,0.12)]
                  "
                >
                  {/* Glow */}

                  <motion.div
                    className="
                      absolute
                      -right-16
                      -top-16
                      h-32
                      w-32
                      rounded-full
                      bg-violet-600/20
                      blur-[45px]
                    "
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <motion.div
                        whileHover={{
                          rotate: 8,
                          scale: 1.08,
                        }}
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-violet-500/20
                          bg-gradient-to-br
                          from-violet-500/15
                          to-fuchsia-500/10
                          text-violet-400
                        "
                      >
                        <Icon size={21} />
                      </motion.div>

                      <span
                        className="
                          text-[10px]
                          font-black
                          text-zinc-700
                        "
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <h3
                      className="
                        mt-8
                        text-lg
                        font-black
                        tracking-[-0.03em]
                        text-white
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-zinc-500
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </section>

      {/* =====================================
          GITA QUOTE
      ===================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          pb-24
          sm:px-8
          lg:px-10
          lg:pb-32
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
          }}
          whileHover={{
            scale: 1.005,
          }}
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-violet-500/20
            bg-gradient-to-br
            from-violet-950
            via-zinc-950
            to-black
            px-6
            py-14
            text-white
            shadow-[0_35px_100px_rgba(139,92,246,0.16)]
            sm:px-10
            lg:px-16
            lg:py-20
          "
        >
          {/* Glow Areas */}

          <div
            className="
              absolute
              -left-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-violet-600/20
              blur-[90px]
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -right-24
              h-64
              w-64
              rounded-full
              bg-cyan-500/10
              blur-[90px]
            "
          />

          <Quote
            className="
              pointer-events-none
              absolute
              -right-6
              -top-8
              h-48
              w-48
              text-white/[0.04]
              sm:h-64
              sm:w-64
            "
          />

          {/* Floating Dots */}

          {[1, 2, 3, 4, 5].map(
            (dot, index) => (
              <motion.span
                key={dot}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="
                  absolute
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_#67e8f9]
                "
                style={{
                  left: `${10 + index * 18}%`,
                  top: `${20 + (index % 2) * 55}%`,
                }}
              />
            )
          )}

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-4xl
              text-center
            "
          >
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.06]
                text-violet-300
                backdrop-blur-xl
              "
            >
              <BookOpen size={20} />
            </motion.div>

            <p
              className="
                mt-8
                text-2xl
                font-bold
                leading-relaxed
                tracking-[-0.03em]
                text-white
                sm:text-3xl
                lg:text-4xl
              "
            >
              “न हि ज्ञानेन सदृशं
              <br className="hidden sm:block" />
              पवित्रमिह विद्यते।”
            </p>

            <div
              className="
                mx-auto
                mt-7
                h-[2px]
                w-16
                bg-gradient-to-r
                from-transparent
                via-cyan-300
                to-transparent
                shadow-[0_0_14px_rgba(103,232,249,0.8)]
              "
            />

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-zinc-300
                sm:text-base
              "
            >
              There is nothing as purifying as knowledge.
            </p>

            <p
              className="
                mt-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-cyan-300
              "
            >
              Bhagavad Gita • 4.38
            </p>
          </div>
        </motion.div>
      </section>

      {/* =====================================
          STATS
      ===================================== */}

      <section
        className="
          relative
          z-10
          border-y
          border-white/10
          bg-zinc-950/70
          backdrop-blur-xl
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-violet-950/10
            via-transparent
            to-cyan-950/10
          "
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            grid-cols-2
            px-5
            sm:px-8
            lg:grid-cols-4
            lg:px-10
          "
        >
          {stats.map(
            (stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{
                  y: -5,
                }}
                className={`
                  relative
                  px-4
                  py-10
                  text-center
                  sm:py-12
                  ${
                    index !== stats.length - 1
                      ? "lg:border-r lg:border-white/10"
                      : ""
                  }
                `}
              >
                <motion.p
                  whileHover={{
                    scale: 1.1,
                  }}
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-fuchsia-400
                    to-cyan-400
                    bg-clip-text
                    text-3xl
                    font-black
                    tracking-[-0.05em]
                    text-transparent
                    sm:text-4xl
                  "
                >
                  {stat.value}
                </motion.p>

                <p
                  className="
                    mt-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-zinc-500
                  "
                >
                  {stat.label}
                </p>
              </motion.div>
            )
          )}
        </motion.div>
      </section>

      {/* =====================================
          INSTRUCTORS
      ===================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          py-24
          sm:px-8
          lg:px-10
          lg:py-32
        "
      >
        <motion.div
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
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            flex
            flex-col
            gap-6
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                mb-5
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-[2px]
                  w-8
                  bg-fuchsia-500
                  shadow-[0_0_10px_rgba(217,70,239,0.8)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-fuchsia-400
                "
              >
                The People Behind Learning
              </span>
            </div>

            <h2
              className="
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.055em]
                text-white
                sm:text-5xl
              "
            >
              Meet the instructors.
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-zinc-500
            "
          >
            Practical knowledge from people who understand
            both the concepts and the craft of applying them.
          </p>
        </motion.div>

        {/* Instructor Grid */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mt-14
            grid
            grid-cols-1
            gap-6
            md:grid-cols-3
          "
        >
          {instructors.map((instructor) => {
            const Icon = instructor.icon;

            return (
              <motion.article
                key={instructor.name}
                variants={fadeUp}
                whileHover={{
                  y: -12,
                  scale: 1.01,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/10
                  bg-zinc-950
                  shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                  transition-all
                  hover:border-violet-500/30
                  hover:shadow-[0_30px_90px_rgba(139,92,246,0.16)]
                "
              >
                {/* Image */}

                <div
                  className="
                    relative
                    h-[280px]
                    overflow-hidden
                  "
                >
                  <motion.img
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                    src={instructor.img}
                    alt={instructor.name}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  {/* Dark Overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-zinc-950
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* Purple Overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-violet-500/10
                      via-transparent
                      to-cyan-500/5
                    "
                  />

                  {/* Tag */}

                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      border
                      border-white/15
                      bg-black/60
                      px-3
                      py-1.5
                      text-[9px]
                      font-bold
                      text-white
                      backdrop-blur-xl
                    "
                  >
                    {instructor.tag}
                  </div>

                  {/* Icon */}

                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.08,
                    }}
                    className="
                      absolute
                      bottom-4
                      right-4
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/15
                      bg-black/50
                      text-violet-300
                      backdrop-blur-xl
                    "
                  >
                    <Icon size={19} />
                  </motion.div>
                </div>

                {/* Content */}

                <div className="p-6">
                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-violet-400
                    "
                  >
                    {instructor.expertise}
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-black
                      tracking-[-0.035em]
                      text-white
                    "
                  >
                    {instructor.name}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-zinc-500
                    "
                  >
                    {instructor.description}
                  </p>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/10
                      pt-5
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-zinc-500
                      "
                    >
                      View expertise
                    </span>

                    <motion.div
                      whileHover={{
                        x: 3,
                        y: -3,
                      }}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.05]
                        text-zinc-300
                        transition
                        group-hover:border-violet-500
                        group-hover:bg-violet-600
                        group-hover:text-white
                      "
                    >
                      <ArrowUpRight size={14} />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* =====================================
          FINAL MESSAGE
      ===================================== */}

      <section
        className="
          relative
          z-10
          overflow-hidden
          border-t
          border-white/10
          bg-zinc-950
          px-5
          py-24
          sm:px-8
          lg:py-32
        "
      >
        {/* Background Glow */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-violet-600/10
            blur-[130px]
          "
        />

        {/* Background Text */}

        <motion.div
          animate={{
            x: ["-3%", "3%", "-3%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
            select-none

            text-[12vw]
            sm:text-[10vw]
            md:text-[9vw]
            lg:text-[8vw]

            font-black
            tracking-[-0.07em]
            text-white/[0.025]
          "
        >
          KEEP LEARNING
        </motion.div>

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
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            z-10
            mx-auto
            max-w-3xl
            text-center
          "
        >
          {/* Heart */}

          <motion.div
            animate={{
              y: [0, -7, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-[20px]
              border
              border-rose-500/20
              bg-rose-500/10
              shadow-[0_0_35px_rgba(244,63,94,0.12)]
            "
          >
            <Heart
              size={22}
              fill="currentColor"
              className="text-rose-400"
            />
          </motion.div>

          {/* Final Heading */}

          <h2
            className="
              mt-7
              text-4xl
              font-black
              leading-[1.05]
              tracking-[-0.055em]
              text-white
              sm:text-5xl
            "
          >
            Built with purpose.
            <br />

            <span
              className="
                bg-gradient-to-r
                from-violet-400
                via-fuchsia-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Designed for progress.
            </span>
          </h2>

          {/* Final Text */}

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-sm
              leading-7
              text-zinc-500
              sm:text-base
            "
          >
            StudyFlux is built with care, curiosity and a belief
            that good technology should make learning feel more
            possible.
          </p>

          {/* Creator Badge */}

          <motion.div
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-500/20
              bg-violet-500/10
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <Rocket
              size={13}
              className="text-violet-400"
            />

            <span
              className="
                text-[10px]
                font-bold
                text-zinc-300
              "
            >
              Crafted by Harinarayan Patidar
            </span>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}