import React from "react";
import { motion } from "framer-motion";

import {
  FiStar,
  FiMessageSquare,
  FiBarChart2,
} from "react-icons/fi";

function RatingDistribution({
  distribution = {},
  totalReviews = 0,
}) {
  const rows = [5, 4, 3, 2, 1];

  /* =======================================================
     SAFE VALUES
  ======================================================= */

  const safeTotalReviews =
    Number(totalReviews) || 0;

  const getCount = (rating) => {
    return (
      Number(
        distribution?.[rating] ??
        distribution?.[String(rating)] ??
        0
      ) || 0
    );
  };

  /* =======================================================
     CALCULATE AVERAGE RATING
  ======================================================= */

  const weightedTotal = rows.reduce(
    (sum, rating) => {
      return (
        sum +
        rating * getCount(rating)
      );
    },
    0
  );

  const calculatedReviews = rows.reduce(
    (sum, rating) => {
      return sum + getCount(rating);
    },
    0
  );

  /*
    Prefer actual distribution count.

    This protects the UI if totalReviews
    from backend and distribution become
    temporarily inconsistent.
  */

  const effectiveTotal =
    calculatedReviews > 0
      ? calculatedReviews
      : safeTotalReviews;

  const averageRating =
    calculatedReviews > 0
      ? weightedTotal /
        calculatedReviews
      : 0;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="
        relative
        h-full
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#0B0F19]
        p-5
        shadow-2xl
        sm:p-6
      "
    >
      {/* ===================================================
          BACKGROUND GLOW
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-yellow-400/10
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-52
          w-52
          rounded-full
          bg-orange-400/[0.06]
          blur-[90px]
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
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-yellow-400/20
              bg-yellow-400/10
              text-yellow-300
            "
          >
            <FiStar size={20} />
          </motion.div>

          <div>
            <h2
              className="
                text-lg
                font-bold
                text-white
                sm:text-xl
              "
            >
              Rating Distribution
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-white/45
              "
            >
              How students rate your courses
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================
          SUMMARY
      =================================================== */}

      <div
        className="
          relative
          z-10
          mt-6
          grid
          grid-cols-2
          gap-3
        "
      >
        {/* Average rating */}

        <motion.div
          whileHover={{
            y: -3,
          }}
          className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <FiStar
              className="
                text-yellow-300
              "
              size={16}
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-white/40
              "
            >
              Average
            </span>
          </div>

          <p
            className="
              mt-3
              text-2xl
              font-bold
              text-white
            "
          >
            {averageRating.toFixed(1)}

            <span
              className="
                ml-1
                text-sm
                font-medium
                text-white/35
              "
            >
              / 5
            </span>
          </p>
        </motion.div>

        {/* Total reviews */}

        <motion.div
          whileHover={{
            y: -3,
          }}
          className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <FiMessageSquare
              className="
                text-cyan-300
              "
              size={16}
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-white/40
              "
            >
              Reviews
            </span>
          </div>

          <p
            className="
              mt-3
              text-2xl
              font-bold
              text-white
            "
          >
            {effectiveTotal}
          </p>
        </motion.div>
      </div>

      {/* ===================================================
          DISTRIBUTION BARS
      =================================================== */}

      <div
        className="
          relative
          z-10
          mt-6
          space-y-4
        "
      >
        {rows.map(
          (rating, index) => {
            const count =
              getCount(rating);

            const percentage =
              effectiveTotal > 0
                ? (count /
                    effectiveTotal) *
                  100
                : 0;

            return (
              <motion.div
                key={rating}
                initial={{
                  opacity: 0,
                  x: -14,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    0.12 +
                    index * 0.07,
                }}
                className="
                  grid
                  grid-cols-[48px_minmax(0,1fr)_55px]
                  items-center
                  gap-3
                "
              >
                {/* Rating label */}

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <span
                    className="
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    {rating}
                  </span>

                  <FiStar
                    size={14}
                    className="
                      text-yellow-300
                    "
                  />
                </div>

                {/* Progress track */}

                <div
                  className="
                    relative
                    h-2.5
                    overflow-hidden
                    rounded-full
                    bg-white/[0.08]
                  "
                >
                  {/* Small visible marker
                      when count is zero */}

                  {percentage === 0 && (
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-[3px]
                        rounded-full
                        bg-white/15
                      "
                    />
                  )}

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width:
                        `${percentage}%`,
                    }}
                    transition={{
                      duration: 0.9,
                      delay:
                        0.2 +
                        index * 0.08,
                      ease: "easeOut",
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-yellow-500
                      via-yellow-300
                      to-amber-200
                      shadow-[0_0_12px_rgba(250,204,21,0.35)]
                    "
                  />
                </div>

                {/* Count */}

                <div
                  className="
                    text-right
                  "
                >
                  <span
                    className="
                      text-sm
                      font-semibold
                      text-white/75
                    "
                  >
                    {count}
                  </span>

                  <span
                    className="
                      ml-1
                      hidden
                      text-[10px]
                      text-white/30
                      sm:inline
                    "
                  >
                    {Math.round(
                      percentage
                    )}
                    %
                  </span>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

      {/* ===================================================
          EMPTY STATE MESSAGE
      =================================================== */}

      {effectiveTotal === 0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
            relative
            z-10
            mt-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              flex-shrink-0
              items-center
              justify-center
              rounded-xl
              bg-yellow-400/10
              text-yellow-300
            "
          >
            <FiBarChart2 size={16} />
          </div>

          <div>
            <p
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              No ratings yet
            </p>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-white/40
              "
            >
              Rating distribution will appear
              when students review your courses.
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

export default RatingDistribution;