import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import {
  FiMail,
  FiPhone,
  FiUser,
  FiCheckCircle,
  FiCopy,
  FiBookOpen,
  FiAward,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function InstructorHeader({ instructor }) {
  /* =======================================================
     SAFE DATA FIRST
     No hook is called conditionally
  ======================================================= */

  const safeInstructor = instructor || {};

  const details =
    safeInstructor.additionalDetails || {};

  /* =======================================================
     FULL NAME
  ======================================================= */

  const fullName = [
    safeInstructor.firstName,
    safeInstructor.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  /* =======================================================
     PROFILE COMPLETENESS
  ======================================================= */

  const profileFields = [
    safeInstructor.firstName,
    safeInstructor.lastName,
    safeInstructor.email,
    safeInstructor.image,
    details.about,
    details.contactNumber,
    details.gender,
    details.dateOfBirth,
  ];

  const completedFields =
    profileFields.filter((field) => {
      return (
        field !== undefined &&
        field !== null &&
        String(field).trim() !== ""
      );
    }).length;

  const profileCompleteness = Math.round(
    (completedFields / profileFields.length) * 100
  );

  /* =======================================================
     FORMAT DATE OF BIRTH
  ======================================================= */

  let formattedDateOfBirth =
    "Not specified";

  if (details.dateOfBirth) {
    const date = new Date(
      details.dateOfBirth
    );

    if (!Number.isNaN(date.getTime())) {
      formattedDateOfBirth =
        date.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );
    }
  }

  /* =======================================================
     COPY EMAIL
  ======================================================= */

  const handleCopyEmail = async () => {
    if (!safeInstructor.email) {
      toast.error(
        "Email address not available"
      );

      return;
    }

    try {
      await navigator.clipboard.writeText(
        safeInstructor.email
      );

      toast.success(
        "Email copied to clipboard"
      );
    } catch (error) {
      console.error(
        "❌ Failed to copy email:",
        error
      );

      toast.error(
        "Unable to copy email"
      );
    }
  };

  /* =======================================================
     SAFE RETURN
     This can now happen after all calculations
  ======================================================= */

  if (!instructor) {
    return null;
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#0B0F19]
        shadow-2xl
      "
    >
      {/* ===================================================
          BACKGROUND GLOWS
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
          -left-20
          h-72
          w-72
          rounded-full
          bg-yellow-400/[0.08]
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-56
          w-56
          -translate-x-1/2
          rounded-full
          bg-violet-500/[0.05]
          blur-[100px]
        "
      />

      {/* ===================================================
          TOP COVER
      =================================================== */}

      <div
        className="
          relative
          h-32
          overflow-hidden
          border-b
          border-white/[0.06]
          sm:h-36
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-cyan-500/15
            via-violet-500/[0.08]
            to-yellow-400/10
          "
        />

        {/* Grid texture */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.12]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.15) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.15) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "32px 32px",
          }}
        />

        {/* Floating decoration */}

        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-8
            top-6
            hidden
            h-20
            w-20
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            sm:block
          "
        />

        <motion.div
          animate={{
            y: [0, 7, 0],
            rotate: [0, -4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-24
            top-16
            hidden
            h-10
            w-10
            rounded-xl
            border
            border-yellow-400/20
            bg-yellow-400/[0.08]
            backdrop-blur-xl
            md:block
          "
        />

        {/* Instructor label */}

        <motion.div
          variants={itemVariants}
          className="
            absolute
            left-5
            top-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-black/25
            px-3
            py-1.5
            text-xs
            font-semibold
            text-white/75
            backdrop-blur-xl
            sm:left-6
          "
        >
          <FiBookOpen
            className="text-cyan-300"
          />

          Instructor Profile
        </motion.div>
      </div>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div
        className="
          relative
          z-10
          px-4
          pb-5
          sm:px-6
          sm:pb-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            xl:flex-row
            xl:items-end
            xl:justify-between
          "
        >
          {/* =================================================
              LEFT PROFILE AREA
          ================================================= */}

          <div
            className="
              flex
              min-w-0
              flex-col
              gap-5
              md:flex-row
              md:items-end
            "
          >
            {/* AVATAR */}

            <motion.div
              variants={itemVariants}
              className="
                relative
                -mt-14
                w-fit
                flex-shrink-0
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  rounded-3xl
                  bg-cyan-400/20
                  blur-xl
                  transition-all
                  duration-500
                  group-hover:bg-cyan-400/30
                "
              />

              <motion.img
                whileHover={{
                  scale: 1.035,
                  rotate: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                }}
                src={
                  safeInstructor.image ||
                  "/default-avatar.png"
                }
                alt={
                  fullName ||
                  "Instructor"
                }
                className="
                  relative
                  h-28
                  w-28
                  rounded-3xl
                  border-4
                  border-[#0B0F19]
                  object-cover
                  shadow-2xl
                  sm:h-32
                  sm:w-32
                "
              />

              {/* Account indicator */}

              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 300,
                }}
                title="Instructor account"
                className="
                  absolute
                  -bottom-1
                  -right-1
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-[#0B0F19]
                  bg-emerald-400
                "
              >
                <FiCheckCircle
                  size={13}
                  className="text-black"
                />
              </motion.div>
            </motion.div>

            {/* NAME AND BIO */}

            <motion.div
              variants={itemVariants}
              className="
                min-w-0
                md:pb-1
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <h1
                  className="
                    break-words
                    text-2xl
                    font-bold
                    tracking-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  {fullName ||
                    "Instructor"}
                </h1>

                <motion.span
                  whileHover={{
                    scale: 1.04,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-yellow-400/20
                    bg-yellow-400/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-yellow-300
                  "
                >
                  <FiAward size={13} />

                  Instructor
                </motion.span>
              </div>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-white/55
                  sm:text-[15px]
                "
              >
                {details.about ||
                  "Build, teach, and track course performance from one place."}
              </p>

              {/* QUICK METADATA */}

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <MiniBadge
                  icon={FiUser}
                  text={
                    details.gender ||
                    "Gender not specified"
                  }
                />

                <MiniBadge
                  icon={FiCalendar}
                  text={
                    formattedDateOfBirth
                  }
                />

                {details.city && (
                  <MiniBadge
                    icon={FiMapPin}
                    text={details.city}
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* =================================================
              RIGHT CONTACT AREA
          ================================================= */}

          <motion.div
            variants={itemVariants}
            className="
              grid
              w-full
              gap-3
              sm:grid-cols-2
              xl:w-auto
              xl:min-w-[430px]
            "
          >
            <ContactCard
              icon={FiMail}
              label="Email Address"
              value={
                safeInstructor.email ||
                "Not specified"
              }
              action={
                safeInstructor.email
                  ? {
                      icon: FiCopy,
                      label: "Copy email",
                      onClick:
                        handleCopyEmail,
                    }
                  : null
              }
              iconClass="text-cyan-300"
              iconBg="bg-cyan-400/10"
            />

            <ContactCard
              icon={FiPhone}
              label="Contact Number"
              value={
                details.contactNumber ||
                "Not specified"
              }
              iconClass="text-emerald-300"
              iconBg="bg-emerald-400/10"
            />
          </motion.div>
        </div>

        {/* =================================================
            PROFILE COMPLETENESS
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="
            mt-6
            border-t
            border-white/[0.07]
            pt-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
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
                "
              >
                <p
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Profile completeness
                </p>

                <span
                  className="
                    rounded-full
                    bg-white/[0.06]
                    px-2
                    py-0.5
                    text-xs
                    font-bold
                    text-cyan-300
                  "
                >
                  {profileCompleteness}%
                </span>
              </div>

              <p
                className="
                  mt-1
                  text-xs
                  text-white/35
                "
              >
                Complete your instructor details
                for a stronger profile.
              </p>
            </div>

            <div
              className="
                w-full
                sm:max-w-[280px]
              "
            >
              <div
                className="
                  h-2
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
                    width: `${profileCompleteness}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.35,
                    ease: "easeOut",
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-400
                    to-violet-400
                  "
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  icon: Icon,
  label,
  value,
  action,
  iconClass = "text-white",
  iconBg = "bg-white/10",
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className="
        group/contact
        min-w-0
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.035]
        p-3
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/15
        hover:bg-white/[0.055]
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
            h-10
            w-10
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

        <div className="min-w-0 flex-1">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white/35
            "
          >
            {label}
          </p>

          <p
            title={value}
            className="
              mt-1
              truncate
              text-sm
              font-semibold
              text-white
            "
          >
            {value}
          </p>
        </div>

        {action && (
          <motion.button
            type="button"
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={action.onClick}
            title={action.label}
            className="
              flex
              h-8
              w-8
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-white/[0.08]
              bg-white/[0.04]
              text-white/40
              transition-colors
              hover:border-cyan-400/20
              hover:bg-cyan-400/10
              hover:text-cyan-300
            "
          >
            <action.icon size={14} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   MINI BADGE
========================================================= */

function MiniBadge({
  icon: Icon,
  text,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        inline-flex
        max-w-full
        items-center
        gap-1.5
        rounded-full
        border
        border-white/[0.07]
        bg-white/[0.035]
        px-3
        py-1.5
        text-xs
        text-white/55
      "
    >
      <Icon
        size={12}
        className="
          flex-shrink-0
          text-white/40
        "
      />

      <span className="truncate">
        {text}
      </span>
    </motion.div>
  );
}

export default InstructorHeader;