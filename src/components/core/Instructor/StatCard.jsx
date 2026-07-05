import React from "react";
import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiActivity,
} from "react-icons/fi";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.48,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   ACCENT CONFIG
========================================================= */

const accentConfig = {
  cyan: {
    iconText:
      "text-cyan-300",

    iconBg:
      "bg-cyan-400/10",

    iconBorder:
      "border-cyan-400/20",

    glow:
      "bg-cyan-400/10",

    progress:
      "bg-cyan-400",

    badge:
      "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",

    hoverBorder:
      "hover:border-cyan-400/25",
  },

  violet: {
    iconText:
      "text-violet-300",

    iconBg:
      "bg-violet-400/10",

    iconBorder:
      "border-violet-400/20",

    glow:
      "bg-violet-400/10",

    progress:
      "bg-violet-400",

    badge:
      "border-violet-400/20 bg-violet-400/10 text-violet-300",

    hoverBorder:
      "hover:border-violet-400/25",
  },

  emerald: {
    iconText:
      "text-emerald-300",

    iconBg:
      "bg-emerald-400/10",

    iconBorder:
      "border-emerald-400/20",

    glow:
      "bg-emerald-400/10",

    progress:
      "bg-emerald-400",

    badge:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",

    hoverBorder:
      "hover:border-emerald-400/25",
  },

  yellow: {
    iconText:
      "text-yellow-300",

    iconBg:
      "bg-yellow-400/10",

    iconBorder:
      "border-yellow-400/20",

    glow:
      "bg-yellow-400/10",

    progress:
      "bg-yellow-400",

    badge:
      "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",

    hoverBorder:
      "hover:border-yellow-400/25",
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  secondaryText,
  icon: Icon,
  accent = "cyan",
  progress = null,
  progressLabel = null,
}) {
  /* =======================================================
     SAFE ACCENT
  ======================================================= */

  const theme =
    accentConfig[accent] ||
    accentConfig.cyan;

  /* =======================================================
     SAFE PROGRESS
  ======================================================= */

  const hasProgress =
    progress !== null &&
    progress !== undefined;

  const safeProgress =
    hasProgress
      ? Math.min(
          100,
          Math.max(
            0,
            Number(progress) || 0
          )
        )
      : 0;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
      className={`
        group
        relative
        min-w-0
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.08]
        bg-[#0B0F19]
        p-5
        shadow-xl
        transition-colors
        duration-300
        ${theme.hoverBorder}
      `}
    >
      {/* ===================================================
          BACKGROUND GLOW
      =================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          blur-[70px]
          transition-all
          duration-500
          group-hover:scale-125
          ${theme.glow}
        `}
      />

      {/* Subtle top shine */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
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
          items-start
          justify-between
          gap-3
        "
      >
        {/* Icon */}

        <motion.div
          whileHover={{
            rotate: 7,
            scale: 1.08,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
          className={`
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            ${theme.iconBg}
            ${theme.iconBorder}
          `}
        >
          {Icon && (
            <Icon
              size={21}
              className={
                theme.iconText
              }
            />
          )}
        </motion.div>

        {/* Activity badge */}

        <div
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            px-2.5
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            ${theme.badge}
          `}
        >
          <FiActivity size={11} />

          Live
        </div>
      </div>

      {/* ===================================================
          TITLE
      =================================================== */}

      <div
        className="
          relative
          z-10
          mt-5
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.12em]
            text-white/40
          "
        >
          {title}
        </p>

        {/* Main value */}

        <motion.h3
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.18,
            duration: 0.4,
          }}
          title={String(value)}
          className="
            mt-2
            truncate
            text-2xl
            font-bold
            tracking-tight
            text-white
            sm:text-3xl
          "
        >
          {value}
        </motion.h3>
      </div>

      {/* ===================================================
          SUBTITLE
      =================================================== */}

      <div
        className="
          relative
          z-10
          mt-4
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div className="min-w-0">
          <p
            className="
              truncate
              text-sm
              font-medium
              text-white/65
            "
          >
            {subtitle}
          </p>

          {secondaryText && (
            <p
              className="
                mt-1
                truncate
                text-xs
                text-white/30
              "
            >
              {secondaryText}
            </p>
          )}
        </div>

        <motion.div
          whileHover={{
            x: 2,
            y: -2,
          }}
          className="
            flex
            h-8
            w-8
            flex-shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-white/[0.07]
            bg-white/[0.035]
            text-white/30
            transition-colors
            group-hover:text-white/60
          "
        >
          <FiArrowUpRight
            size={14}
          />
        </motion.div>
      </div>

      {/* ===================================================
          PROGRESS SECTION
      =================================================== */}

      {hasProgress && (
        <div
          className="
            relative
            z-10
            mt-5
            border-t
            border-white/[0.06]
            pt-4
          "
        >
          <div
            className="
              mb-2
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-[11px]
                font-medium
                text-white/35
              "
            >
              {progressLabel ||
                "Progress"}
            </span>

            <span
              className="
                text-[11px]
                font-bold
                text-white/70
              "
            >
              {Math.round(
                safeProgress
              )}
              %
            </span>
          </div>

          <div
            className="
              h-1.5
              overflow-hidden
              rounded-full
              bg-white/[0.07]
            "
          >
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${safeProgress}%`,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut",
              }}
              className={`
                h-full
                rounded-full
                ${theme.progress}
              `}
            />
          </div>
        </div>
      )}

      {/* ===================================================
          NO PROGRESS DECORATION
      =================================================== */}

      {!hasProgress && (
        <div
          className="
            relative
            z-10
            mt-5
            border-t
            border-white/[0.06]
            pt-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className={`
                h-2
                w-2
                rounded-full
                ${theme.progress}
              `}
            />

            <span
              className="
                text-[11px]
                font-medium
                text-white/35
              "
            >
              Current dashboard data
            </span>
          </div>
        </div>
      )}
    </motion.article>
  );
}

export default StatCard;