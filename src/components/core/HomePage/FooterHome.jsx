import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Logo2 from "../../../assets/images/Logo2.png";

import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiCode,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

import {
  HiOutlineAcademicCap,
  HiOutlineSparkles,
} from "react-icons/hi2";

// =====================================================
// FOOTER DATA
// =====================================================

const footerSections = [
  {
    title: "Resources",
    icon: FiBookOpen,
    links: [
      "Articles",
      "Blog",
      "Cheat Sheets",
      "Code Challenges",
      "Docs",
      "Projects",
      "Videos",
      "Workspaces",
    ],
  },
  {
    title: "Learning",
    icon: FiLayers,
    links: [
      "Paid Memberships",
      "For Students",
      "Business Solutions",
      "Forums",
      "Chapters",
      "Events",
    ],
  },
  {
    title: "Subjects",
    icon: HiOutlineAcademicCap,
    links: [
      "Artificial Intelligence",
      "Cloud Computing",
      "Web Development",
      "JavaScript",
      "Advanced Python",
      "Data Structures",
      "Machine Learning",
      "Full Stack",
    ],
  },
  {
    title: "Languages",
    icon: FiCode,
    links: [
      "C",
      "C++",
      "Java",
      "Python",
      "JavaScript",
      "Go",
      "Kotlin",
      "PHP",
    ],
  },
  {
    title: "Career",
    icon: FiGlobe,
    links: [
      "Career Paths",
      "Interview Prep",
      "Full Catalog",
      "Beta Content",
      "Help Center",
    ],
  },
];

// =====================================================
// SOCIAL LINKS
// =====================================================

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://facebook.com",
  },
  {
    name: "Google",
    icon: FaGoogle,
    href: "https://google.com",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    href: "https://twitter.com",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com",
  },
];

// =====================================================
// ANIMATIONS
// =====================================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// =====================================================
// FOOTER COMPONENT
// =====================================================

function FooterHome() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        m-0
        w-full
        max-w-none
        overflow-hidden
        border-t
        border-white/10
        bg-black
        p-0
        text-white
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
          z-0
          opacity-50
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
          backgroundSize: "44px 44px",
        }}
      />

      {/* =================================================
          ANIMATED VIOLET GLOW
      ================================================= */}

      <motion.div
        animate={{
          x: [0, 80, 20, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-40
          top-0
          z-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-violet-600/15
          blur-[130px]
        "
      />

      {/* =================================================
          ANIMATED CYAN GLOW
      ================================================= */}

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          z-0
          h-[430px]
          w-[430px]
          rounded-full
          bg-cyan-500/10
          blur-[140px]
        "
      />

      {/* =================================================
          BACKGROUND STUDYFLUX TEXT
      ================================================= */}

      <motion.div
        animate={{
          x: ["-2%", "2%", "-2%"],
          opacity: [0.018, 0.045, 0.018],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-6
          z-0
          -translate-x-1/2
          select-none
          whitespace-nowrap

          text-[14vw]
          font-black
          leading-none
          tracking-[-0.08em]
          text-violet-400

          sm:text-[12vw]
          md:text-[10vw]
          lg:text-[8vw]
        "
      >
        STUDYFLUX
      </motion.div>

      {/* =================================================
          MAIN CONTENT
          NO TOP MARGIN
          NO X MARGIN
          NO OUTER PADDING
      ================================================= */}

      <div
        className="
          relative
          z-10
          m-0
          w-full
          max-w-none
          p-0
        "
      >
        {/* =================================================
            FULL WIDTH CTA SECTION
        ================================================= */}

        <motion.section
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            relative
            m-0
            w-full
            overflow-hidden
            border-b
            border-white/10
            bg-zinc-950/70

            px-5
            py-10

            sm:px-8
            sm:py-12

            md:px-12

            lg:px-16
            lg:py-14

            xl:px-20

            2xl:px-24
          "
        >
          {/* CTA glow */}

          <motion.div
            animate={{
              x: [-100, 250, -100],
              opacity: [0.06, 0.18, 0.06],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              -top-24
              h-56
              w-56
              rounded-full
              bg-violet-600
              blur-[100px]
            "
          />

          {/* CTA inner row */}

          <div
            className="
              relative
              z-10
              flex
              w-full
              flex-col
              gap-8

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* CTA Left */}

            <div className="max-w-2xl">
              {/* Badge */}

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                className="
                  mb-4
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
                  <HiOutlineSparkles
                    size={12}
                    className="text-violet-400"
                  />
                </motion.span>

                <span
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-violet-300
                  "
                >
                  Keep Learning
                </span>
              </motion.div>

              {/* Heading */}

              <h2
                className="
                  text-2xl
                  font-black
                  leading-tight
                  tracking-[-0.045em]
                  text-white

                  sm:text-3xl
                  lg:text-4xl
                "
              >
                Build skills that move{" "}
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
                  with you.
                </span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-4
                  max-w-xl
                  text-xs
                  leading-6
                  text-zinc-500

                  sm:text-sm
                "
              >
                Learn, practice, build and keep your momentum
                alive with StudyFlux.
              </p>
            </div>

            {/* CTA Button */}

            <motion.div
              whileHover={{
                y: -4,
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
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-white
                  px-6
                  py-4
                  text-xs
                  font-black
                  text-black
                  shadow-[0_18px_50px_rgba(255,255,255,0.08)]
                  transition-all
                  duration-300

                  hover:shadow-[0_20px_60px_rgba(139,92,246,0.18)]
                "
              >
                Start Learning

                <FiArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* =================================================
            FOOTER LINKS AREA
        ================================================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            grid
            w-full
            grid-cols-2
            gap-x-5
            gap-y-10
            border-b
            border-white/10

            px-5
            py-12

            sm:grid-cols-3
            sm:px-8

            md:gap-x-8
            md:px-12

            lg:grid-cols-[1.35fr_repeat(5,1fr)]
            lg:px-16
            lg:py-16

            xl:px-20

            2xl:px-24
          "
        >
          {/* =================================================
              BRAND COLUMN
          ================================================= */}

          <motion.div
            variants={fadeUp}
            className="
              col-span-2

              sm:col-span-3

              lg:col-span-1
              lg:pr-6
            "
          >
            {/* Logo */}

            <Link
              to="/"
              className="
                group
                inline-flex
                items-center
                gap-3
              "
            >
              <motion.div
                whileHover={{
                  rotate: 7,
                  scale: 1.06,
                }}
                className="
                  relative
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-violet-500/25
                  bg-violet-500/10
                  shadow-[0_0_30px_rgba(139,92,246,0.12)]
                "
              >
                {/* Rotating glow */}

                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                    absolute
                    inset-[-50%]
                    bg-gradient-to-r
                    from-transparent
                    via-violet-500/20
                    to-transparent
                  "
                />

                <img
                  src={Logo2}
                  alt="StudyFlux logo"
                  className="
                    relative
                    z-10
                    h-7
                    w-7
                    object-contain
                  "
                />
              </motion.div>

              <div>
                <h2
                  className="
                    text-xl
                    font-black
                    tracking-[-0.055em]
                    text-white
                  "
                >
                  Study
                  <span
                    className="
                      bg-gradient-to-r
                      from-violet-400
                      to-cyan-400
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Flux
                  </span>
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-zinc-600
                  "
                >
                  Learn • Build • Grow
                </p>
              </div>
            </Link>

            {/* Brand Description */}

            <p
              className="
                mt-5
                max-w-xs
                text-xs
                leading-6
                text-zinc-500
              "
            >
              A modern learning platform built for curious
              minds, practical skills and meaningful progress.
            </p>

            {/* Contact */}

            <div className="mt-5 space-y-3">
              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-[10px]
                  text-zinc-600
                "
              >
                <FiMail
                  size={13}
                  className="text-violet-400"
                />

                <span>Learn with StudyFlux</span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-[10px]
                  text-zinc-600
                "
              >
                <FiMapPin
                  size={13}
                  className="text-cyan-400"
                />

                <span>Built in India</span>
              </div>
            </div>

            {/* Social Links */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{
                      y: -4,
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.93,
                    }}
                    className="
                      group
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-zinc-500
                      transition-all
                      duration-300

                      hover:border-violet-500/30
                      hover:bg-violet-500/10
                      hover:text-violet-300
                    "
                  >
                    <Icon
                      size={14}
                      className="
                        transition-transform
                        duration-300

                        group-hover:scale-110
                      "
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* =================================================
              LINK COLUMNS
          ================================================= */}

          {footerSections.map((section) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                variants={fadeUp}
                className="min-w-0"
              >
                {/* Heading */}

                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-violet-500/15
                      bg-violet-500/[0.07]
                    "
                  >
                    <Icon
                      size={12}
                      className="text-violet-400"
                    />
                  </div>

                  <h3
                    className="
                      text-[11px]
                      font-black
                      text-zinc-200
                    "
                  >
                    {section.title}
                  </h3>
                </div>

                {/* Links */}

                <ul className="space-y-3">
                  {section.links.map((item) => (
                    <li key={item}>
                      <motion.a
                        href="#"
                        whileHover={{
                          x: 4,
                        }}
                        className="
                          group
                          inline-flex
                          items-center
                          gap-1.5
                          text-[10px]
                          font-medium
                          text-zinc-600
                          transition-colors
                          duration-300

                          hover:text-violet-300
                        "
                      >
                        <span
                          className="
                            h-1
                            w-1
                            rounded-full
                            bg-zinc-800
                            transition-all
                            duration-300

                            group-hover:bg-violet-400
                            group-hover:shadow-[0_0_8px_rgba(139,92,246,0.8)]
                          "
                        />

                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-5

            px-5
            py-7

            sm:px-8

            md:flex-row
            md:items-center
            md:justify-between
            md:px-12

            lg:px-16

            xl:px-20

            2xl:px-24
          "
        >
          {/* Policy Links */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2

              md:justify-start
            "
          >
            {[
              "Privacy Policy",
              "Cookie Policy",
              "Terms",
            ].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{
                  y: -2,
                }}
                className="
                  text-[9px]
                  font-bold
                  text-zinc-600
                  transition-colors

                  hover:text-violet-300
                "
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-1.5
              text-center
              text-[9px]
              font-medium
              text-zinc-600

              md:justify-end
            "
          >
            <span>Made with</span>

            <motion.span
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaHeart
                size={10}
                className="text-rose-500"
              />
            </motion.span>

            <span>by</span>

            <span
              className="
                font-black
                text-zinc-400
              "
            >
              Harinarayan
            </span>

            <span className="text-zinc-700">
              •
            </span>

            <span>
              © {currentYear} StudyFlux
            </span>
          </motion.div>
        </div>
      </div>

      {/* =================================================
          BOTTOM ANIMATED GRADIENT
      ================================================= */}

      <motion.div
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
        className="
          h-[2px]
          w-full
          bg-gradient-to-r
          from-violet-500
          via-fuchsia-500
          to-cyan-500
          bg-[length:200%_200%]
          opacity-70
        "
      />
    </footer>
  );
}

export default FooterHome;