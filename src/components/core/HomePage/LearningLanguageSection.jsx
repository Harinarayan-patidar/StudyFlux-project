import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Plan_your_lessons from "../../../assets/images/Plan_your_lessons.png";
import Know_your_progress from "../../../assets/images/Know_your_progress.png";
import Compare_with_others from "../../../assets/images/Compare_with_others.png";

import {
  FiArrowUpRight,
  FiBarChart2,
  FiCheck,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

// ======================================================
// DATA
// ======================================================

const learningCards = [
  {
    number: "01",
    label: "Track",
    title: "Know your progress",
    description:
      "See exactly how far you have come with clear milestones and visual learning insights.",
    image: Know_your_progress,
    icon: FiBarChart2,
    accent: "violet",
  },
  {
    number: "02",
    label: "Compare",
    title: "Grow with others",
    description:
      "Understand your learning pace, discover new benchmarks and keep your momentum alive.",
    image: Compare_with_others,
    icon: FiTrendingUp,
    accent: "cyan",
  },
  {
    number: "03",
    label: "Plan",
    title: "Plan your lessons",
    description:
      "Turn ambitious goals into a focused learning path built around your own schedule.",
    image: Plan_your_lessons,
    icon: FiTarget,
    accent: "fuchsia",
  },
];

const accentStyles = {
  violet: {
    icon: "text-violet-400",
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    badge: "text-violet-300",
    line: "from-violet-500",
    glow: "bg-violet-600/15",
    hoverBorder: "hover:border-violet-500/30",
  },

  cyan: {
    icon: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-500/20",
    badge: "text-cyan-300",
    line: "from-cyan-500",
    glow: "bg-cyan-500/15",
    hoverBorder: "hover:border-cyan-500/30",
  },

  fuchsia: {
    icon: "text-fuchsia-400",
    iconBg: "bg-fuchsia-500/10",
    iconBorder: "border-fuchsia-500/20",
    badge: "text-fuchsia-300",
    line: "from-fuchsia-500",
    glow: "bg-fuchsia-600/15",
    hoverBorder: "hover:border-fuchsia-500/30",
  },
};

// ======================================================
// LEARNING CARD
// ======================================================

function LearningCard({ card, index }) {
  const Icon = card.icon;
  const styles = accentStyles[card.accent];

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 70,
        rotateX: 8,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[#090909]
        transition-colors
        duration-500
        ${styles.hoverBorder}
      `}
    >
      {/* Background grid */}
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
          backgroundSize: "30px 30px",
        }}
      />

      {/* Hover glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          opacity-0
          blur-[100px]
          transition-opacity
          duration-700
          group-hover:opacity-100
          ${styles.glow}
        `}
      />

      {/* Top accent line */}
      <div
        className={`
          absolute
          left-8
          right-8
          top-0
          h-px
          bg-gradient-to-r
          ${styles.line}
          via-transparent
          to-transparent
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        `}
      />

      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              ${styles.iconBg}
              ${styles.iconBorder}
            `}
          >
            <Icon
              size={17}
              className={styles.icon}
            />
          </div>

          <span
            className="
              text-4xl
              font-black
              tracking-[-0.08em]
              text-white/[0.06]
            "
          >
            {card.number}
          </span>
        </div>

        {/* Image area */}
        <div
          className="
            relative
            mt-6
            flex
            h-[230px]
            items-center
            justify-center
            overflow-hidden
            rounded-[22px]
            border
            border-white/[0.06]
            bg-gradient-to-b
            from-white/[0.04]
            to-transparent

            sm:h-[260px]
          "
        >
          {/* Image glow */}
          <div
            className={`
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-40
              w-40
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              blur-[80px]
              ${styles.glow}
            `}
          />

          <motion.img
            src={card.image}
            alt={card.title}
            whileHover={{
              scale: 1.08,
              rotate: index === 1 ? 2 : -2,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
              h-[200px]
              w-auto
              max-w-[90%]
              object-contain

              sm:h-[230px]
            "
          />

          {/* Floating dot */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              delay: index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
              absolute
              right-5
              top-5
              h-2
              w-2
              rounded-full
              ${styles.iconBg}
            `}
          />
        </div>

        {/* Content */}
        <div className="mt-6">
          <p
            className={`
              text-[9px]
              font-black
              uppercase
              tracking-[0.2em]
              ${styles.badge}
            `}
          >
            {card.label}
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-black
              tracking-[-0.03em]
              text-white

              sm:text-2xl
            "
          >
            {card.title}
          </h3>

          <p
            className="
              mt-3
              text-xs
              leading-6
              text-zinc-500

              sm:text-sm
            "
          >
            {card.description}
          </p>
        </div>

        {/* Bottom indicator */}
        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            border-t
            border-white/[0.06]
            pt-4
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
              size={10}
              className="text-emerald-400"
            />
          </span>

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-zinc-600
            "
          >
            Built for focused learning
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

function LearningLanguageSection() {
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
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
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
          bg-violet-600/10
          blur-[150px]
        "
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 17,
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
          bg-cyan-500/[0.08]
          blur-[150px]
        "
      />

      {/* =================================================
          GIANT MOVING BACKGROUND TEXT
      ================================================= */}

      <motion.div
        initial={{
          x: "-12%",
        }}
        whileInView={{
          x: "2%",
        }}
        viewport={{
          once: false,
          amount: 0.1,
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
          text-[13vw]
          font-black
          leading-none
          tracking-[-0.08em]
          text-white/[0.025]
        "
      >
        LEARN • TRACK • GROW
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
        {/* =================================================
            SECTION HEADER
        ================================================= */}

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
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            flex
            max-w-4xl
            flex-col
            items-center
            text-center
          "
        >
          {/* Eyebrow */}
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
              Smarter Learning System
            </span>
          </div>

          {/* Heading */}
        <h2
  className="
    mt-7
    text-4xl
    font-black
    leading-[1.05]
    tracking-[-0.055em]
    text-white
    sm:text-5xl
    lg:text-6xl
  "
>
  Your learning.
  <br />

  <span className="text-violet-400">
    Your rhythm.
  </span>{" "}

  <span className="text-cyan-400">
    Your edge.
  </span>
</h2>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-zinc-500

              sm:text-base
              sm:leading-8
            "
          >
            A smarter way to plan lessons, understand your
            progress and stay motivated by learning alongside
            a growing community.
          </p>
        </motion.div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-5

            md:grid-cols-2
            lg:mt-20
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {learningCards.map((card, index) => (
            <LearningCard
              key={card.title}
              card={card}
              index={index}
            />
          ))}
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

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
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mt-14
            flex
            flex-col
            items-center
            justify-between
            gap-6
            rounded-[28px]
            border
            border-white/[0.08]
            bg-white/[0.025]
            p-6

            sm:flex-row
            sm:p-8
          "
        >
          {/* CTA text */}
          <div className="text-center sm:text-left">
            <p
              className="
                text-lg
                font-black
                tracking-[-0.025em]
                text-white

                sm:text-xl
              "
            >
              Ready to learn with direction?
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-5
                text-zinc-600

                sm:text-sm
              "
            >
              Build skills with structure, clarity and momentum.
            </p>
          </div>

          {/* CTA button */}
          <motion.div
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="shrink-0"
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
                shadow-[0_15px_50px_rgba(255,255,255,0.07)]
                transition-all
                duration-300

                hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)]
              "
            >
              Start learning

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
        </motion.div>
      </div>
    </section>
  );
}

export default LearningLanguageSection;