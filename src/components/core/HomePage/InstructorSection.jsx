import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Instructor from "../../../assets/images/Instructor.png";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheck,
  FiGlobe,
  FiPlay,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

// ======================================================
// DATA
// ======================================================

const benefits = [
  {
    icon: FiGlobe,
    text: "Teach globally",
  },
  {
    icon: FiTrendingUp,
    text: "Grow your audience",
  },
  {
    icon: FiZap,
    text: "Build your brand",
  },
];

const miniStats = [
  {
    value: "10K+",
    label: "Active learners",
  },
  {
    value: "50+",
    label: "Expert courses",
  },
];

// ======================================================
// FLOATING CARD
// ======================================================

function FloatingCard({
  children,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

function InstructorSection() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        py-20
        sm:py-24
        lg:py-32
      "
    >
      {/* =================================================
          BACKGROUND GRID
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(139, 92, 246, 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(139, 92, 246, 0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "46px 46px",
        }}
      />

      {/* =================================================
          BACKGROUND GLOWS
      ================================================= */}

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-40
          top-[20%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-violet-600/15
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-cyan-500/10
          blur-[150px]
        "
      />

      {/* =================================================
          GIANT BACKGROUND TEXT
      ================================================= */}

      <motion.div
        initial={{
          x: "-8%",
        }}
        whileInView={{
          x: "3%",
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 1.5,
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
        TEACH • INSPIRE • GROW
      </motion.div>

      {/* =================================================
          MAIN CONTAINER
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
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-16
            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT IMAGE EXPERIENCE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -70,
              rotate: -2,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotate: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[580px]
            "
          >
            {/* =============================================
                OUTER ROTATING ORBIT
            ============================================== */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute
                -inset-8
                hidden
                rounded-[50px]
                border
                border-dashed
                border-violet-500/15
                sm:block
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-[-5px]
                  h-2.5
                  w-2.5
                  -translate-x-1/2
                  rounded-full
                  bg-violet-400
                  shadow-[0_0_20px_rgba(167,139,250,0.9)]
                "
              />

              <span
                className="
                  absolute
                  bottom-[-5px]
                  right-[20%]
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_20px_rgba(34,211,238,0.9)]
                "
              />
            </motion.div>

            {/* =============================================
                IMAGE CARD
            ============================================== */}

            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[34px]
                border
                border-white/10
                bg-zinc-950
                p-2
                shadow-[0_40px_120px_rgba(0,0,0,0.65)]
              "
            >
              {/* Gradient border glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-violet-500/20
                  via-transparent
                  to-cyan-500/15
                  opacity-60
                "
              />

              {/* Image wrapper */}

              <div
                className="
                  relative
                  min-h-[380px]
                  overflow-hidden
                  rounded-[28px]
                  bg-gradient-to-br
                  from-zinc-900
                  to-black

                  sm:min-h-[480px]
                "
              >
                {/* Image */}

                <motion.img
                  src={Instructor}
                  alt="StudyFlux instructor"
                  whileHover={{
                    scale: 1.035,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    h-full
                    min-h-[380px]
                    w-full
                    object-cover
                    object-center

                    sm:min-h-[480px]
                  "
                />

                {/* Dark overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/10
                    to-transparent
                  "
                />

                {/* Purple glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -left-20
                    bottom-0
                    h-64
                    w-64
                    rounded-full
                    bg-violet-600/20
                    blur-[90px]
                  "
                />

                {/* Bottom caption */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    flex
                    items-end
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-violet-300
                      "
                    >
                      Creator Program
                    </p>

                    <p
                      className="
                        mt-1
                        text-lg
                        font-black
                        tracking-tight
                        text-white
                      "
                    >
                      Your knowledge matters.
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-black/50
                      backdrop-blur-xl
                    "
                  >
                    <FiPlay
                      size={15}
                      className="ml-0.5 text-white"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* =============================================
                FLOATING STUDENTS CARD
            ============================================== */}

            <FloatingCard
              delay={0}
              className="
                absolute
                -right-2
                top-[12%]
                hidden
                sm:block
                lg:-right-10
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/80
                  p-3
                  shadow-[0_20px_60px_rgba(0,0,0,0.5)]
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
                      rounded-xl
                      border
                      border-cyan-500/20
                      bg-cyan-500/10
                    "
                  >
                    <FiUsers
                      size={16}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-black
                        text-white
                      "
                    >
                      10K+
                    </p>

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-zinc-600
                      "
                    >
                      Learners
                    </p>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* =============================================
                FLOATING COURSE CARD
            ============================================== */}

            <FloatingCard
              delay={1}
              className="
                absolute
                -bottom-7
                left-2
                hidden
                sm:block
                lg:-left-8
              "
            >
              <div
                className="
                  min-w-[180px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/85
                  p-4
                  shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-2">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-violet-500/10
                    "
                  >
                    <FiBookOpen
                      size={13}
                      className="text-violet-400"
                    />
                  </div>

                  <span
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-zinc-500
                    "
                  >
                    New Course
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    text-xs
                    font-black
                    text-white
                  "
                >
                  Share what you know.
                </p>

                <div
                  className="
                    mt-3
                    h-1
                    overflow-hidden
                    rounded-full
                    bg-white/5
                  "
                >
                  <motion.div
                    initial={{
                      width: "0%",
                    }}
                    whileInView={{
                      width: "78%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-violet-500
                      to-cyan-400
                    "
                  />
                </div>
              </div>
            </FloatingCard>
          </motion.div>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              w-full
              flex-col
              items-center
              text-center

              lg:items-start
              lg:text-left
            "
          >
            {/* =============================================
                EYEBROW
            ============================================== */}

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
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
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
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-violet-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-violet-400
                  "
                />
              </span>

              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-violet-300
                "
              >
                StudyFlux Creator Program
              </span>
            </motion.div>

            {/* =============================================
                HEADING
            ============================================== */}

            <h2
              className="
                mt-7
                max-w-2xl
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.055em]
                text-white

                sm:text-5xl
                lg:text-6xl
                xl:text-[68px]
              "
            >
              Don&apos;t just
              <br />

              <span className="text-zinc-600">
                learn the future.
              </span>

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
                Teach it.
              </span>
            </h2>

            {/* =============================================
                DESCRIPTION
            ============================================== */}

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-zinc-500

                sm:text-base
                sm:leading-8
              "
            >
              Turn your expertise into meaningful learning
              experiences. Create practical courses, reach
              curious minds worldwide and build a teaching
              brand that grows with you.
            </p>

            {/* =============================================
                BENEFIT PILLS
            ============================================== */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                justify-center
                gap-2

                lg:justify-start
              "
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.text}
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
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + index * 0.1,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/[0.08]
                      bg-white/[0.035]
                      px-3
                      py-2
                    "
                  >
                    <Icon
                      size={12}
                      className="text-violet-400"
                    />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-zinc-400
                      "
                    >
                      {benefit.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* =============================================
                MINI STATS
            ============================================== */}

            <div
              className="
                mt-8
                grid
                w-full
                max-w-lg
                grid-cols-2
                gap-3
              "
            >
              {miniStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
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
                    duration: 0.5,
                    delay: 0.35 + index * 0.1,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-4
                    text-left
                    transition-colors
                    duration-300

                    hover:border-violet-500/20
                    hover:bg-violet-500/[0.04]
                  "
                >
                  <p
                    className="
                      text-xl
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
                      tracking-[0.12em]
                      text-zinc-600
                    "
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* =============================================
                CTA AREA
            ============================================== */}

            <div
              className="
                mt-9
                flex
                w-full
                flex-col
                items-center
                gap-4

                sm:flex-row
                lg:justify-start
              "
            >
              {/* Main CTA */}

              <motion.div
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  to="/signup"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-black
                    text-black
                    shadow-[0_15px_50px_rgba(255,255,255,0.08)]
                    transition-all
                    duration-300

                    hover:shadow-[0_20px_60px_rgba(139,92,246,0.22)]
                  "
                >
                  Start teaching today

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-white
                      transition-transform
                      duration-300

                      group-hover:rotate-45
                    "
                  >
                    <FiArrowUpRight size={14} />
                  </span>
                </Link>
              </motion.div>

              {/* Secondary micro text */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  text-zinc-600
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-500/10
                  "
                >
                  <FiCheck
                    size={11}
                    className="text-emerald-400"
                  />
                </span>

                Free to get started
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default InstructorSection;