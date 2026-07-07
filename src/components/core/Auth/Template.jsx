import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

import Spinner from "../../Spinner";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({
  title,
  description1,
  description2,
  image,
  formType,
}) {
  const [loading] = useState(false);

  const isSignup = formType === "signup";

  const benefits = [
    "Structured learning paths",
    "Track your course progress",
    "Learn from expert instructors",
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Grid */}

        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(139, 92, 246, 0.055) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(139, 92, 246, 0.055) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Top gradient */}

        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />

        {/* Violet glow */}

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
            -left-40
            top-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-violet-600/15
            blur-[130px]
          "
        />

        {/* Cyan glow */}

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
            blur-[140px]
          "
        />

        {/* Bottom glow */}

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
          BACKGROUND STUDYFLUX TEXT
      ===================================== */}

      <motion.div
        animate={{
          x: ["-2%", "2%", "-2%"],
          opacity: [0.025, 0.055, 0.025],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[5%]
          z-0
          -translate-x-1/2
          whitespace-nowrap
          select-none

          text-[15vw]
          sm:text-[13vw]
          md:text-[11vw]
          lg:text-[9vw]

          font-black
          leading-none
          tracking-[-0.08em]
          text-violet-400
        "
      >
        STUDYFLUX
      </motion.div>

      {/* =====================================
          MAIN CONTAINER
      ===================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          items-center
          px-5
          py-10
          sm:px-8
          lg:px-10
          lg:py-14
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-center
            xl:gap-16
          "
        >
          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <motion.section
            initial={{
              opacity: 0,
              x: -45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
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
                delay: 0.2,
              }}
              whileHover={{
                scale: 1.03,
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
                  size={13}
                  className="text-violet-400"
                />
              </motion.span>

              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-violet-300
                "
              >
                {isSignup
                  ? "Join the StudyFlux Community"
                  : "Welcome Back to StudyFlux"}
              </span>
            </motion.div>

            {/* Title */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.8,
              }}
              className="
                max-w-2xl
                text-4xl
                font-black
                leading-[0.96]
                tracking-[-0.06em]
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[62px]
              "
            >
              {title}
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.7,
              }}
              className="
                mt-7
                max-w-xl
                text-sm
                leading-7
                text-zinc-400
                sm:text-base
              "
            >
              {description1}
            </motion.p>

            {/* Highlight description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
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
                mt-2
                max-w-xl
                bg-gradient-to-r
                from-violet-400
                via-fuchsia-400
                to-cyan-400
                bg-clip-text
                text-sm
                font-bold
                leading-7
                text-transparent
                sm:text-base
              "
            >
              {description2}
            </motion.p>

            {/* Benefits */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.7,
              }}
              className="mt-8 space-y-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.75 + index * 0.1,
                  }}
                  whileHover={{
                    x: 5,
                  }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-emerald-500/20
                      bg-emerald-500/10
                    "
                  >
                    <CheckCircle2
                      size={13}
                      className="text-emerald-400"
                    />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-zinc-400
                      sm:text-sm
                    "
                  >
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Mini Stats */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1,
                duration: 0.7,
              }}
              className="
                mt-9
                grid
                max-w-lg
                grid-cols-3
                gap-3
              "
            >
              {[
                {
                  icon: BookOpen,
                  value: "10+",
                  label: "Paths",
                },
                {
                  icon: GraduationCap,
                  value: "50+",
                  label: "Lessons",
                },
                {
                  icon: Zap,
                  value: "24/7",
                  label: "Access",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    whileHover={{
                      y: -5,
                      borderColor: "rgba(139,92,246,0.4)",
                    }}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      p-3
                      backdrop-blur-xl
                    "
                  >
                    <Icon
                      size={14}
                      className="text-violet-400"
                    />

                    <p
                      className="
                        mt-3
                        text-sm
                        font-black
                        text-white
                      "
                    >
                      {item.value}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-zinc-600
                      "
                    >
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* =====================================
              RIGHT AUTH CARD
          ===================================== */}

          <motion.section
            initial={{
              opacity: 0,
              x: 50,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full"
          >
            {/* Floating AI Card */}

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 0, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -left-6
                top-16
                z-30
                hidden
                items-center
                gap-3
                rounded-2xl
                border
                border-violet-500/20
                bg-zinc-950/95
                px-4
                py-3
                shadow-[0_20px_60px_rgba(139,92,246,0.16)]
                backdrop-blur-xl
                xl:flex
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-500/10
                "
              >
                <BrainCircuit
                  size={16}
                  className="text-violet-400"
                />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-black
                    text-white
                  "
                >
                  AI Learning
                </p>

                <p className="text-[8px] text-zinc-600">
                  Smarter study tools
                </p>
              </div>
            </motion.div>

            {/* Floating Security Card */}

            <motion.div
              animate={{
                y: [0, 9, 0],
                x: [0, 4, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-4
                bottom-16
                z-30
                hidden
                items-center
                gap-3
                rounded-2xl
                border
                border-emerald-500/20
                bg-zinc-950/95
                px-4
                py-3
                shadow-[0_20px_60px_rgba(16,185,129,0.12)]
                backdrop-blur-xl
                xl:flex
              "
            >
              <ShieldCheck
                size={17}
                className="text-emerald-400"
              />

              <div>
                <p
                  className="
                    text-[9px]
                    font-black
                    text-white
                  "
                >
                  Secure Account
                </p>

                <p className="text-[8px] text-zinc-600">
                  Protected access
                </p>
              </div>
            </motion.div>

            {/* Main card */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[34px]
                border
                border-white/10
                bg-zinc-950/85
                p-4
                shadow-[0_35px_100px_rgba(0,0,0,0.6)]
                backdrop-blur-2xl
                sm:p-5
              "
            >
              {/* Animated card glow */}

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.12, 0.25, 0.12],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-60
                  w-60
                  rounded-full
                  bg-violet-600
                  blur-[100px]
                "
              />

              {/* Image */}

              <div
                className="
                  relative
                  h-[180px]
                  overflow-hidden
                  rounded-[26px]
                  sm:h-[210px]
                  md:h-[230px]
                "
              >
                <motion.img
                  whileHover={{
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  src={image}
                  alt="StudyFlux learning"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                  loading="lazy"
                />

                {/* Image overlays */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/10" />

                {/* Image badge */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/15
                    bg-black/60
                    px-3
                    py-2
                    backdrop-blur-xl
                  "
                >
                  <GraduationCap
                    size={13}
                    className="text-violet-300"
                  />

                  <span
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-white
                    "
                  >
                    Learn • Build • Grow
                  </span>
                </div>

                {/* Rating badge */}

                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                    absolute
                    bottom-4
                    right-4
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-black/60
                    px-3
                    py-2
                    backdrop-blur-xl
                  "
                >
                  <Star
                    size={12}
                    fill="currentColor"
                    className="text-amber-400"
                  />

                  <span
                    className="
                      text-[9px]
                      font-black
                      text-white
                    "
                  >
                    4.9
                  </span>
                </motion.div>
              </div>

              {/* =====================================
                  FORM AREA
              ===================================== */}

              <div
                className="
                  relative
                  z-10
                  px-1
                  pb-2
                  pt-6
                  sm:px-3
                "
              >
                {/* Form heading */}

                <div className="mb-5">
                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-violet-400
                    "
                  >
                    {isSignup
                      ? "Create Account"
                      : "Account Access"}
                  </p>

                  <h2
                    className="
                      mt-2
                      text-2xl
                      font-black
                      tracking-[-0.04em]
                      text-white
                    "
                  >
                    {isSignup
                      ? "Join StudyFlux"
                      : "Welcome back"}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-zinc-500
                    "
                  >
                    {isSignup
                      ? "Create your account and begin your learning journey."
                      : "Continue from where your learning journey paused."}
                  </p>
                </div>

                {/* EXISTING FORM */}

                <div
                  className="
                    [&_label]:text-zinc-300

                    [&_input]:border-white/10
                    [&_input]:bg-black/60
                    [&_input]:text-white
                    [&_input]:outline-none
                    [&_input]:transition-all
                    [&_input]:duration-300

                    [&_input::placeholder]:text-zinc-600

                    [&_input:focus]:border-violet-500/60
                    [&_input:focus]:ring-2
                    [&_input:focus]:ring-violet-500/10

                    [&_select]:border-white/10
                    [&_select]:bg-black/60
                    [&_select]:text-white

                    [&_textarea]:border-white/10
                    [&_textarea]:bg-black/60
                    [&_textarea]:text-white
                  "
                >
                  {isSignup ? (
                    <SignupForm />
                  ) : (
                    <LoginForm />
                  )}
                </div>

                {/* Trust footer */}

                <div
                  className="
                    mt-6
                    flex
                    flex-col
                    gap-3
                    border-t
                    border-white/10
                    pt-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={13}
                      className="text-emerald-400"
                    />

                    <span
                      className="
                        text-[8px]
                        font-bold
                        text-zinc-600
                      "
                    >
                      Secure authentication
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={9}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                    ))}

                    <span
                      className="
                        ml-1
                        text-[8px]
                        font-bold
                        text-zinc-600
                      "
                    >
                      Learner focused
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

export default Template;