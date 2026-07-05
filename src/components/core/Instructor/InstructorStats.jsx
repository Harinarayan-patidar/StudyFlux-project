import React from "react";
import { motion } from "framer-motion";

import {
  FiBookOpen,
  FiUsers,
  FiDollarSign,
  FiStar,
} from "react-icons/fi";

import StatCard from "./StatCard";

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
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function InstructorStats({ stats = {} }) {
  /* =======================================================
     CURRENCY FORMATTER
  ======================================================= */

  const formatCurrency = (value = 0) => {
    const numericValue =
      Number(value) || 0;

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(numericValue);
  };

  /* =======================================================
     SAFE VALUES
  ======================================================= */

  const totalCourses =
    Number(stats?.totalCourses) || 0;

  const publishedCourses =
    Number(stats?.publishedCourses) || 0;

  const uniqueStudents =
    Number(stats?.uniqueStudents) || 0;

  const totalEnrollments =
    Number(stats?.totalEnrollments) || 0;

  const estimatedRevenue =
    Number(stats?.estimatedRevenue) || 0;

  const averageRating =
    Number(stats?.averageRating) || 0;

  const totalReviews =
    Number(stats?.totalReviews) || 0;

  /* =======================================================
     CALCULATED VALUES
  ======================================================= */

  const publishedPercentage =
    totalCourses > 0
      ? Math.round(
          (publishedCourses /
            totalCourses) *
            100
        )
      : 0;

  const averageEnrollmentsPerStudent =
    uniqueStudents > 0
      ? (
          totalEnrollments /
          uniqueStudents
        ).toFixed(1)
      : "0.0";

  const ratingPercentage =
    Math.min(
      100,
      Math.max(
        0,
        (averageRating / 5) * 100
      )
    );

  /* =======================================================
     CARD CONFIGURATION
  ======================================================= */

  const cards = [
    {
      title: "Total Courses",
      value: totalCourses,
      subtitle: `${publishedCourses} published`,
      secondaryText: `${publishedPercentage}% live`,
      icon: FiBookOpen,

      accent: "cyan",

      progress:
        publishedPercentage,

      progressLabel:
        "Published courses",
    },

    {
      title: "Unique Students",
      value: uniqueStudents,
      subtitle: `${totalEnrollments} total enrollments`,
      secondaryText: `${averageEnrollmentsPerStudent} avg. enrollments`,
      icon: FiUsers,

      accent: "violet",

      progress: null,

      progressLabel: null,
    },

    {
      title: "Estimated Revenue",
      value: formatCurrency(
        estimatedRevenue
      ),
      subtitle:
        "Price × enrollments",
      secondaryText:
        "Estimated earnings",
      icon: FiDollarSign,

      accent: "emerald",

      progress: null,

      progressLabel: null,
    },

    {
      title: "Average Rating",
      value: `${averageRating.toFixed(
        1
      )} / 5`,
      subtitle: `${totalReviews} reviews`,
      secondaryText:
        totalReviews > 0
          ? "Student feedback"
          : "No reviews yet",
      icon: FiStar,

      accent: "yellow",

      progress:
        ratingPercentage,

      progressLabel:
        "Rating score",
    },
  ];

  /* =======================================================
     UI
  ======================================================= */

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        2xl:grid-cols-4
      "
    >
      {cards.map(
        (card, index) => (
          <StatCard
            key={card.title}
            {...card}
            index={index}
          />
        )
      )}
    </motion.section>
  );
}

export default InstructorStats;