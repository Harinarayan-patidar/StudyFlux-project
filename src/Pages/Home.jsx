import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import { TiArrowRightOutline } from "react-icons/ti";
import {
  FiBookOpen,
  FiCode,
  FiCpu,
  FiLayers,
  FiPlay,
  FiStar,
  FiTerminal,
  FiZap,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/Button";
import Video from "../assets/images/homeVideo.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import FooterHome from "../components/core/HomePage/FooterHome";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/core/HomePage/ReviewSlider";

// ======================================================
// DATA
// ======================================================

const floatingCards = [
  {
    icon: FiCode,
    title: "Code",
    subtitle: "Build real projects",
    position:
      "left-[2%] top-[24%] sm:left-[4%] lg:left-[6%]",
    rotate: -10,
  },
  {
    icon: FiCpu,
    title: "AI",
    subtitle: "Learn intelligently",
    position:
      "right-[2%] top-[18%] sm:right-[4%] lg:right-[7%]",
    rotate: 9,
  },
  {
    icon: FiLayers,
    title: "Skills",
    subtitle: "Stack your future",
    position:
      "right-[3%] bottom-[14%] lg:right-[10%]",
    rotate: -7,
  },
];

const stats = [
  {
    value: "50+",
    label: "Expert Courses",
    icon: FiBookOpen,
  },
  {
    value: "10K+",
    label: "Learning Hours",
    icon: FiPlay,
  },
  {
    value: "24/7",
    label: "Learn Anytime",
    icon: FiZap,
  },
  {
    value: "∞",
    label: "Possibilities",
    icon: FiStar,
  },
];

// ======================================================
// REVEAL WRAPPER
// ======================================================

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: -80, y: 0 },
    right: { x: 80, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ======================================================
// FLOATING CARD
// ======================================================

function FloatingCard({
  icon: Icon,
  title,
  subtitle,
  position,
  rotate,
  scrollYProgress,
  index,
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index % 2 === 0 ? -180 : 180]
  );

  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [rotate, rotate + (index % 2 === 0 ? 35 : -35)]
  );

  return (
    <motion.div
      style={{
        y,
        rotate: rotation,
      }}
      animate={{
        translateY: [0, -12, 0],
      }}
      transition={{
        translateY: {
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`
        pointer-events-none
        absolute
        z-20
        hidden
        lg:block
        ${position}
      `}
    >
      <div
        className="
          w-[170px]
          rounded-3xl
          border
          border-white/10
          bg-zinc-950/70
          p-4
          shadow-[0_25px_80px_rgba(0,0,0,0.5)]
          backdrop-blur-xl
        "
      >
        <div
          className="
            mb-3
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
          <Icon className="text-violet-400" size={18} />
        </div>

        <p className="text-sm font-black text-white">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-zinc-500">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

// ======================================================
// HOME
// ======================================================

function Home() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Whole page scrolling
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // Hero parallax
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Video parallax
  const { scrollYProgress: videoScroll } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  // Smooth progress bar
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hero transforms
  const heroY = useTransform(
    heroScroll,
    [0, 1],
    [0, 220]
  );

  const heroOpacity = useTransform(
    heroScroll,
    [0, 0.75, 1],
    [1, 0.5, 0]
  );

  const heroScale = useTransform(
    heroScroll,
    [0, 1],
    [1, 0.9]
  );

  // Background word
  const backgroundTextX = useTransform(
    scrollYProgress,
    [0, 1],
    ["-8%", "8%"]
  );

  // Video transforms
  const videoRotate = useTransform(
    videoScroll,
    [0, 0.5, 1],
    [-5, 0, 5]
  );

  const videoScale = useTransform(
    videoScroll,
    [0, 0.5, 1],
    [0.88, 1, 0.92]
  );

  // Orb transforms
  const orbOneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -500]
  );

  const orbTwoY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 380]
  );

  return (
    <div
      ref={pageRef}
      className="
        relative
        w-full
        overflow-x-hidden
        bg-black
        text-white
      "
    >
      {/* ==================================================
          FIXED SCROLL PROGRESS
      ================================================== */}

      <motion.div
        style={{
          scaleX: smoothProgress,
          transformOrigin: "0%",
        }}
        className="
          fixed
          left-0
          top-0
          z-[100]
          h-[3px]
          w-full
          bg-gradient-to-r
          from-violet-500
          via-fuchsia-500
          to-cyan-400
        "
      />

      {/* ==================================================
          FIXED BACKGROUND GRID
      ================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          opacity-40
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(139, 92, 246, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(139, 92, 246, 0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* ==================================================
          PARALLAX ORBS
      ================================================== */}

      <motion.div
        style={{ y: orbOneY }}
        className="
          pointer-events-none
          fixed
          -left-40
          top-[30%]
          z-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-600/15
          blur-[150px]
        "
      />

      <motion.div
        style={{ y: orbTwoY }}
        className="
          pointer-events-none
          fixed
          -right-40
          top-[10%]
          z-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/10
          blur-[160px]
        "
      />

      {/* ==================================================
          MOVING BACKGROUND WORD
      ================================================== */}

      <motion.div
        style={{
          x: backgroundTextX,
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-[35%]
          z-0
          whitespace-nowrap
          text-[15vw]
          font-black
          leading-none
          tracking-[-0.09em]
          text-white/[0.018]
          select-none
        "
      >
        LEARN • BUILD • GROW
      </motion.div>

      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section
        ref={heroRef}
        className="
          relative
          z-10
          flex
          min-h-[95vh]
          w-full
          flex-col
          items-center
          justify-center
          overflow-hidden
          px-4
          pb-16
          pt-20
          sm:px-6
          md:px-12
          lg:px-24
        "
      >
        {/* Floating cards */}

        {floatingCards.map((card, index) => (
          <FloatingCard
            key={card.title}
            {...card}
            index={index}
            scrollYProgress={heroScroll}
          />
        ))}

        {/* Hero content */}

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
          }}
          className="
            relative
            z-30
            flex
            w-full
            max-w-5xl
            flex-col
            items-center
            text-center
          "
        >
          {/* Instructor pill */}

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <Link
              to="/signup"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.05]
                p-1.5
                pr-4
                text-xs
                font-bold
                text-zinc-300
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-violet-500/30
                hover:bg-violet-500/10
              "
            >
              <span
                className="
                  rounded-full
                  bg-gradient-to-r
                  from-violet-500
                  to-fuchsia-500
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-wider
                  text-white
                "
              >
                New
              </span>

              Become an Instructor

              <TiArrowRightOutline
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              max-w-5xl
              text-4xl
              font-black
              leading-[0.98]
              tracking-[-0.055em]
              text-white

              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-[82px]
            "
          >
            Empower Your Future
            <br />

            <span className="text-zinc-500">
              With{" "}
            </span>

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
              Coding Skills
            </span>
          </motion.h1>

          {/* Subtitle */}

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-zinc-500

              sm:text-base
              md:text-lg
            "
          >
            Learn essential coding skills, build real-world
            applications and transform complex problems into
            elegant solutions.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
            className="
              mt-9
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            <motion.div
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <CTAButton active linkto="/signup">
                Learn More
              </CTAButton>
            </motion.div>

            <motion.div
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <CTAButton
                active={false}
                linkto="/login"
              >
                Book a Demo
              </CTAButton>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              mt-12
              flex
              flex-col
              items-center
              gap-2
              text-[8px]
              font-black
              uppercase
              tracking-[0.25em]
              text-zinc-700
            "
          >
            Scroll to explore

            <div
              className="
                flex
                h-9
                w-5
                justify-center
                rounded-full
                border
                border-white/10
                pt-1.5
              "
            >
              <motion.span
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0.2, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-violet-400
                "
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================================================
          STATS STRIP
      ================================================== */}

      <section
        className="
          relative
          z-10
          w-full
          border-y
          border-white/10
          bg-zinc-950/60
          backdrop-blur-xl
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-2
            md:grid-cols-4
          "
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
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
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  flex
                  min-h-[150px]
                  flex-col
                  items-center
                  justify-center
                  border-b
                  border-r
                  border-white/10
                  p-6
                  text-center

                  md:border-b-0
                "
              >
                <Icon
                  size={18}
                  className="
                    mb-3
                    text-violet-400
                    transition-transform
                    duration-300
                    group-hover:scale-125
                    group-hover:rotate-6
                  "
                />

                <p
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  {stat.value}
                </p>

                <p
                  className="
                    mt-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-zinc-600
                  "
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          PARALLAX VIDEO
      ================================================== */}

      <section
        ref={videoRef}
        className="
          relative
          z-10
          flex
          min-h-[80vh]
          w-full
          items-center
          justify-center
          overflow-hidden
          px-4
          py-24
          sm:px-8
          lg:px-20
        "
      >
        {/* giant background number */}

        <motion.div
          style={{
            y: useTransform(
              videoScroll,
              [0, 1],
              [120, -120]
            ),
          }}
          className="
            pointer-events-none
            absolute
            left-[4%]
            top-[5%]
            text-[30vw]
            font-black
            leading-none
            text-white/[0.018]
          "
        >
          01
        </motion.div>

        <motion.div
          style={{
            rotate: videoRotate,
            scale: videoScale,
          }}
          className="
            relative
            w-full
            max-w-5xl
          "
        >
          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              scale-90
              bg-violet-600/20
              blur-[100px]
            "
          />

          {/* Video frame */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-zinc-950
              p-2
              shadow-[0_40px_120px_rgba(0,0,0,0.7)]
            "
          >
            {/* Fake browser top */}

            <div
              className="
                flex
                h-10
                items-center
                gap-2
                px-3
              "
            >
              <span className="h-2 w-2 rounded-full bg-rose-500/70" />
              <span className="h-2 w-2 rounded-full bg-amber-500/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/70" />

              <div
                className="
                  ml-3
                  h-5
                  flex-1
                  rounded-full
                  bg-white/[0.04]
                "
              />
            </div>

            <video
              className="
                w-full
                rounded-[20px]
                object-cover
              "
              muted
              loop
              autoPlay
              playsInline
            >
              <source
                src={Video}
                type="video/mp4"
              />
            </video>
          </div>

          {/* Floating terminal card */}

          <motion.div
            animate={{
              y: [0, -14, 0],
              rotate: [-3, 0, -3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -bottom-10
              -left-2
              hidden
              w-[220px]
              rounded-2xl
              border
              border-white/10
              bg-black/80
              p-4
              shadow-2xl
              backdrop-blur-xl

              md:block
            "
          >
            <div className="flex items-center gap-2">
              <FiTerminal className="text-emerald-400" />

              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-wider
                  text-zinc-500
                "
              >
                Live Environment
              </span>
            </div>

            <p
              className="
                mt-3
                font-mono
                text-[10px]
                text-emerald-400
              "
            >
              $ npm run future_
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================================================
          CODE SECTIONS
      ================================================== */}

      <section
        className="
          relative
          z-10
          w-full
          px-4
          py-20
          sm:px-6
          md:px-12
          lg:px-24
        "
      >
        {/* Section label */}

        <Reveal className="mb-16 text-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-500/20
              bg-violet-500/10
              px-4
              py-2
            "
          >
            <FiCode
              size={12}
              className="text-violet-400"
            />

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.2em]
                text-violet-300
              "
            >
              Learn by building
            </span>
          </div>
        </Reveal>

        {/* Code block 1 */}

        <Reveal direction="left">
          <div className="w-full">
            <CodeBlocks
              position="lg:flex-row"
              heading={
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Unlock your{" "}
                  <HighlightText
                    text={"coding potential"}
                  />{" "}
                  with our online courses
                </h2>
              }
              subheading="Our courses are designed by industry experts, providing practical knowledge and skills to help you succeed in the tech world."
              ctabtn1={{
                btnText: "Try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport">
<title>Sample Page</title>
</head>
<body>
<header>`}
              codeColour="text-yellow-500"
            />
          </div>
        </Reveal>

        {/* Divider */}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
          }}
          className="
            mx-auto
            my-20
            h-px
            w-full
            max-w-5xl
            bg-gradient-to-r
            from-transparent
            via-violet-500/40
            to-transparent
          "
        />

        {/* Code block 2 */}

        <Reveal direction="right">
          <div className="w-full">
            <CodeBlocks
              position="lg:flex-row-reverse"
              heading={
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Start Coding{" "}
                  <HighlightText
                    text={"in seconds"}
                  />
                </h2>
              }
              subheading="Our courses are best-selling worldwide. Hurry up and grab the best opportunity!"
              ctabtn1={{
                btnText: "Let's learn",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport">
<title>Sample Page</title>
</head>
<body>
<header>`}
              codeColour="text-yellow-500"
            />
          </div>
        </Reveal>

        {/* Explore More */}

        <Reveal delay={0.1}>
          <div className="mt-16">
            <ExploreMore />
          </div>
        </Reveal>
      </section>

      {/* ==================================================
          JOURNEY / TIMELINE SECTION
      ================================================== */}

      <section
        className="
          relative
          z-10
          w-full
          overflow-hidden
          bg-zinc-50
          text-richblack-900
        "
      >
        {/* Parallax banner */}

        <div
          className="
            homepage_bg
            relative
            flex
            min-h-[320px]
            w-full
            items-center
            justify-center
            overflow-hidden
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
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
              flex
              w-11/12
              max-w-6xl
              flex-col
              items-center
              gap-6
              text-white
            "
          >
            <motion.p
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
              className="
                text-center
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Your next skill is one scroll away.
            </motion.p>

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-4
              "
            >
              <CTAButton
                active
                linkto="/signup"
              >
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <TiArrowRightOutline />
                </div>
              </CTAButton>

              <CTAButton
                active={false}
                linkto="/login"
              >
                <div className="flex items-center gap-2">
                  Learn More
                  <TiArrowRightOutline />
                </div>
              </CTAButton>
            </div>
          </motion.div>
        </div>

        {/* Timeline content */}

        <div
          className="
            mx-auto
            w-full
            max-w-6xl
            px-4
            py-20
            sm:px-6
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-8
              lg:flex-row
            "
          >
            <Reveal
              direction="left"
              className="lg:w-1/2"
            >
              <div
                className="
                  text-center
                  text-3xl
                  font-black
                  tracking-tight
                  lg:text-left
                  lg:text-5xl
                "
              >
                Get the skills you need for a{" "}
                <HighlightText
                  text="Job that is in demand"
                />
              </div>
            </Reveal>

            <Reveal
              direction="right"
              className="lg:w-1/2"
            >
              <div
                className="
                  text-sm
                  leading-7
                  text-slate-600
                  sm:text-base
                "
              >
                <p>
                  Build practical skills through structured
                  learning paths designed to move from
                  understanding to real-world execution.
                </p>

                <div className="mt-5">
                  <CTAButton
                    active
                    linkto="/signup"
                  >
                    <div className="flex items-center gap-2">
                      Learn More
                      <TiArrowRightOutline />
                    </div>
                  </CTAButton>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Existing sections */}

          <Reveal className="mt-16">
            <TimeLineSection />
          </Reveal>

         
        </div>
      </section>

       <Reveal className="mt-20 mx-0">
            <LearningLanguageSection />
          </Reveal>

      {/* ==================================================
          INSTRUCTOR SECTION
      ================================================== */}
{/* ==================================================
    INSTRUCTOR SECTION
================================================== */}

<section className="relative z-10 w-full overflow-hidden bg-black text-white">
  <InstructorSection />
</section>

{/* ==================================================
    REVIEWS SECTION
================================================== */}

<section className="relative z-10 w-full bg-black text-white">
  {/* Decorative moving background text */}
  <motion.div
    initial={{ x: "-8%" }}
    whileInView={{ x: "4%" }}
    viewport={{ once: false }}
    transition={{
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      pointer-events-none
      absolute
      left-0
      top-8
      whitespace-nowrap
      select-none
      text-[10vw]
      font-black
      leading-none
      tracking-[-0.06em]
      text-white/[0.02]
    "
  >
    LEARN • GROW • SUCCEED
  </motion.div>

  {/* Reviews heading */}
 <Reveal delay={0.1}>
  <div className="relative z-10 w-full px-4 pt-20 text-center sm:px-6">

    {/* Badge */}
    <div
      className="
        mb-4
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        border
        border-white
        bg-black
        px-5
        py-3
      "
    >
      <FiStar size={14} className="text-white" />

      <span
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[0.2em]
          text-white
        "
      >
        Student Stories
      </span>
    </div>

    {/* Heading */}
  <div className="w-full flex justify-center">
 <h2
  className="
    w-full
    text-center
    text-3xl
    font-black
    tracking-[-0.04em]
    text-white
    sm:text-4xl
    lg:text-5xl
  "
>
  Reviews From{" "}
  <span className="text-violet-400">
    Other Learners
  </span>
</h2>
</div>

    {/* Description */}
    <p
      className="
        mx-auto
        mt-4
        max-w-2xl
        text-center
        text-sm
        leading-6
        text-zinc-400
        sm:text-base
      "
    >
      Real experiences from learners building skills,
      shipping projects and growing with StudyFlux.
    </p>

  </div>
</Reveal>

  {/* Review slider */}
  <Reveal delay={0.15}>
    <ReviewSlider />
  </Reveal>
</section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <FooterHome />
    </div>
  );
}

export default Home;