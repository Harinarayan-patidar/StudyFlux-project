import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CreditCard,
  Loader2,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";

import { removeFromCart } from "../Slices/cartSlice";
import { getCourseDetails } from "../services/operations/courseAPI";
import { buyCourse } from "../services/operations/studentfeaturesApI";

// =====================================
// ANIMATION VARIANTS
// =====================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// =====================================
// SAFE LOCAL STORAGE USER
// =====================================

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    return null;
  }
};

// =====================================
// CART PAGE
// =====================================

function CartPage() {
  const { cart, totalItems } = useSelector(
    (state) => state.cart
  );

  const tokenFromRedux = useSelector(
    (state) => state.auth.token
  );

  const userFromRedux = useSelector(
    (state) => state.profile.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const token =
    localStorage.getItem("token") || tokenFromRedux;

  const user =
    getStoredUser() || userFromRedux;

  // =====================================
  // FETCH COURSE DETAILS
  // =====================================

  useEffect(() => {
    let isMounted = true;

    const fetchCourseDetails = async () => {
      if (!cart || cart.length === 0) {
        if (isMounted) {
          setCourseDetails([]);
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);

        const details = await Promise.all(
          cart.map(async (item) => {
            try {
              const response = await getCourseDetails(item._id);

              return response?.success
                ? response.data
                : null;
            } catch (error) {
              console.error(
                `Failed to fetch course ${item._id}:`,
                error
              );

              return null;
            }
          })
        );

        if (isMounted) {
          setCourseDetails(details.filter(Boolean));
        }
      } catch (error) {
        console.error(
          "Failed to fetch cart course details:",
          error
        );

        toast.error("Could not load cart details");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourseDetails();

    return () => {
      isMounted = false;
    };
  }, [cart]);

  // =====================================
  // TOTAL PRICE
  // =====================================

  const totalPrice = useMemo(() => {
    return courseDetails.reduce(
      (acc, course) =>
        acc + Number(course?.price || 0),
      0
    );
  }, [courseDetails]);

  // =====================================
  // REMOVE COURSE
  // =====================================

  const handleRemove = (courseId) => {
    setRemovingId(courseId);

    setTimeout(() => {
      dispatch(removeFromCart(courseId));
      setRemovingId(null);

      toast.success("Course removed from cart");
    }, 250);
  };

  // =====================================
  // BUY NOW
  // =====================================

  const handleBuyNow = async () => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (!user) {
      toast.error("User information not found");
      return;
    }

    try {
      setBuying(true);

      const courses = cart.map(
        (item) => item._id
      );

      await buyCourse(
        courses,
        token,
        user,
        navigate,
        dispatch
      );
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("Unable to start payment");
    } finally {
      setBuying(false);
    }
  };

  // =====================================
  // LOADING UI
  // =====================================

  if (loading) {
    return (
      <div
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-black
          text-white
        "
      >
        {/* Background Grid */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
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

        {/* Glow */}

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            h-[320px]
            w-[320px]
            rounded-full
            bg-violet-600/20
            blur-[110px]
          "
        />

        {/* Loader */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative
            z-10
            flex
            flex-col
            items-center
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[22px]
              border
              border-violet-500/20
              bg-violet-500/10
              shadow-[0_0_40px_rgba(139,92,246,0.15)]
              backdrop-blur-xl
            "
          >
            <Loader2
              size={26}
              className="
                animate-spin
                text-violet-400
              "
            />
          </div>

          <p
            className="
              mt-5
              text-sm
              font-bold
              text-zinc-300
            "
          >
            Loading your cart
          </p>

          <p
            className="
              mt-1
              text-xs
              text-zinc-600
            "
          >
            Gathering your learning journey...
          </p>
        </motion.div>
      </div>
    );
  }

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
        {/* Grid */}

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

        {/* Violet Glow */}

        <motion.div
          animate={{
            x: [0, 70, 20, 0],
            y: [0, 40, -20, 0],
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

        {/* Cyan Glow */}

        <motion.div
          animate={{
            x: [0, -60, 10, 0],
            y: [0, 80, 20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-40
            top-[30%]
            h-[460px]
            w-[460px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
        />

        {/* Bottom Glow */}

        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 30, 0],
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
          BACKGROUND CART TEXT
      ===================================== */}

      <motion.div
        animate={{
          x: ["-3%", "3%", "-3%"],
          opacity: [0.025, 0.05, 0.025],
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
          top-12
          z-0
          -translate-x-1/2
          whitespace-nowrap
          select-none

          text-[18vw]
          sm:text-[15vw]
          md:text-[12vw]
          lg:text-[10vw]

          font-black
          leading-none
          tracking-[-0.08em]
          text-violet-400
        "
      >
        YOUR CART
      </motion.div>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
          py-14
          sm:px-8
          sm:py-20
          lg:px-10
          lg:py-24
        "
      >
        {/* =====================================
            TOP NAVIGATION
        ===================================== */}

        <motion.button
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          whileHover={{
            x: -4,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() => navigate("/")}
          className="
            group
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-2
            text-xs
            font-bold
            text-zinc-400
            backdrop-blur-xl
            transition-colors
            hover:border-violet-500/30
            hover:text-white
          "
        >
          <ArrowLeft
            size={14}
            className="
              transition-transform
              group-hover:-translate-x-1
            "
          />

          Continue Exploring
        </motion.button>

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="
            mt-10
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* Left */}

          <motion.div variants={fadeUp}>
            <div
              className="
                mb-5
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
                Your Learning Collection
              </span>
            </div>

            <h1
              className="
                text-4xl
                font-black
                leading-[0.95]
                tracking-[-0.06em]
                text-white
                sm:text-5xl
                md:text-6xl
              "
            >
              Ready to start
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
                something great?
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-zinc-500
                sm:text-base
              "
            >
              Review your selected courses, fine-tune your
              learning stack and continue when you are ready.
            </p>
          </motion.div>

          {/* Items Badge */}

          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -4,
            }}
            className="
              flex
              w-fit
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-zinc-950/80
              px-5
              py-4
              shadow-[0_20px_60px_rgba(0,0,0,0.4)]
              backdrop-blur-xl
            "
          >
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
              <ShoppingBag
                size={19}
                className="text-violet-400"
              />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-zinc-600
                "
              >
                Cart Items
              </p>

              <p
                className="
                  mt-1
                  text-lg
                  font-black
                  text-white
                "
              >
                {totalItems}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* =====================================
            EMPTY CART
        ===================================== */}

        {courseDetails.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              relative
              mt-16
              overflow-hidden
              rounded-[36px]
              border
              border-white/10
              bg-zinc-950/70
              px-6
              py-20
              text-center
              shadow-[0_30px_90px_rgba(0,0,0,0.5)]
              backdrop-blur-xl
            "
          >
            {/* Empty Glow */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[300px]
                w-[300px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-violet-600/10
                blur-[100px]
              "
            />

            <div className="relative z-10">
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-[26px]
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  shadow-[0_0_50px_rgba(139,92,246,0.12)]
                "
              >
                <ShoppingBag
                  size={30}
                  className="text-violet-400"
                />
              </motion.div>

              <h2
                className="
                  mt-7
                  text-2xl
                  font-black
                  tracking-[-0.04em]
                  text-white
                  sm:text-3xl
                "
              >
                Your cart is waiting.
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-md
                  text-sm
                  leading-7
                  text-zinc-500
                "
              >
                Add a course and begin building your next
                learning chapter.
              </p>

              <motion.button
                whileHover={{
                  y: -3,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() => navigate("/")}
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-white
                  px-5
                  py-3
                  text-xs
                  font-black
                  text-black
                  shadow-[0_18px_50px_rgba(255,255,255,0.08)]
                "
              >
                Explore Courses

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* =====================================
              CART CONTENT
          ===================================== */

          <div
            className="
              mt-14
              grid
              grid-cols-1
              gap-8
              lg:grid-cols-[1fr_360px]
              xl:grid-cols-[1fr_390px]
            "
          >
            {/* =====================================
                LEFT COURSE LIST
            ===================================== */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {/* Section Label */}

              <motion.div
                variants={fadeUp}
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-violet-400
                    "
                  >
                    Selected Courses
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-zinc-600
                    "
                  >
                    {courseDetails.length} course
                    {courseDetails.length !== 1 ? "s" : ""} ready
                    for checkout
                  </p>
                </div>
              </motion.div>

              {/* Cards */}

              <AnimatePresence mode="popLayout">
                {courseDetails.map((course, index) => (
                  <motion.article
                    layout
                    key={course._id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      x: -40,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-white/10
                      bg-zinc-950/75
                      p-3
                      shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                      backdrop-blur-xl
                      transition-colors
                      hover:border-violet-500/30
                    "
                  >
                    {/* Card Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-44
                        w-44
                        rounded-full
                        bg-violet-600/10
                        blur-[60px]
                        transition-all
                        duration-500
                        group-hover:bg-violet-600/20
                      "
                    />

                    <div
                      className="
                        relative
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-center
                      "
                    >
                      {/* Thumbnail */}

                      <div
                        className="
                          relative
                          h-[190px]
                          w-full
                          shrink-0
                          overflow-hidden
                          rounded-[22px]
                          sm:h-[150px]
                          sm:w-[220px]
                        "
                      >
                        <motion.img
                          whileHover={{
                            scale: 1.07,
                          }}
                          transition={{
                            duration: 0.6,
                          }}
                          src={course.thumbnail}
                          alt={course.courseName}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                        {/* Overlay */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-transparent
                            to-transparent
                          "
                        />

                        {/* Course Number */}

                        <div
                          className="
                            absolute
                            left-3
                            top-3
                            rounded-full
                            border
                            border-white/15
                            bg-black/60
                            px-3
                            py-1.5
                            text-[8px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-white
                            backdrop-blur-xl
                          "
                        >
                          Course {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Course Info */}

                      <div
                        className="
                          min-w-0
                          flex-1
                          px-2
                          pb-2
                          sm:px-1
                          sm:py-2
                        "
                      >
                        <div
                          className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-start
                            sm:justify-between
                          "
                        >
                          <div className="min-w-0">
                            <div
                              className="
                                mb-2
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <BookOpen
                                size={12}
                                className="text-violet-400"
                              />

                              <span
                                className="
                                  text-[9px]
                                  font-black
                                  uppercase
                                  tracking-[0.16em]
                                  text-violet-400
                                "
                              >
                                StudyFlux Course
                              </span>
                            </div>

                            <h2
                              className="
                                line-clamp-2
                                text-lg
                                font-black
                                leading-tight
                                tracking-[-0.035em]
                                text-white
                                sm:text-xl
                              "
                            >
                              {course.courseName}
                            </h2>

                            {course.courseDescription && (
                              <p
                                className="
                                  mt-2
                                  line-clamp-2
                                  text-xs
                                  leading-5
                                  text-zinc-500
                                "
                              >
                                {course.courseDescription}
                              </p>
                            )}
                          </div>

                          {/* Price */}

                          <div
                            className="
                              shrink-0
                              sm:text-right
                            "
                          >
                            <p
                              className="
                                text-[8px]
                                font-black
                                uppercase
                                tracking-[0.15em]
                                text-zinc-600
                              "
                            >
                              Price
                            </p>

                            <p
                              className="
                                mt-1
                                bg-gradient-to-r
                                from-emerald-400
                                to-cyan-400
                                bg-clip-text
                                text-xl
                                font-black
                                text-transparent
                              "
                            >
                              ₹{Number(course.price || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Bottom */}

                        <div
                          className="
                            mt-5
                            flex
                            items-center
                            justify-between
                            border-t
                            border-white/10
                            pt-4
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-[9px]
                              font-semibold
                              text-zinc-600
                            "
                          >
                            <CheckCircle2
                              size={12}
                              className="text-emerald-400"
                            />

                            Ready for checkout
                          </div>

                          <motion.button
                            whileHover={{
                              scale: 1.05,
                            }}
                            whileTap={{
                              scale: 0.93,
                            }}
                            disabled={removingId === course._id}
                            onClick={() =>
                              handleRemove(course._id)
                            }
                            className="
                              group/remove
                              flex
                              h-9
                              items-center
                              gap-2
                              rounded-xl
                              border
                              border-rose-500/20
                              bg-rose-500/10
                              px-3
                              text-[9px]
                              font-black
                              text-rose-400
                              transition-colors
                              hover:border-rose-500/40
                              hover:bg-rose-500/15
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            {removingId === course._id ? (
                              <Loader2
                                size={13}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2
                                size={13}
                                className="
                                  transition-transform
                                  group-hover/remove:rotate-6
                                "
                              />
                            )}

                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* =====================================
                CHECKOUT SUMMARY
            ===================================== */}

            <motion.aside
              initial={{
                opacity: 0,
                x: 35,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                lg:sticky
                lg:top-24
                lg:h-fit
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/10
                  bg-zinc-950/85
                  p-6
                  shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                  backdrop-blur-2xl
                "
              >
                {/* Checkout Glow */}

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.12, 0.22, 0.12],
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
                    h-56
                    w-56
                    rounded-full
                    bg-violet-600
                    blur-[90px]
                  "
                />

                <div className="relative z-10">
                  {/* Header */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                          text-violet-400
                        "
                      >
                        Order Summary
                      </p>

                      <h2
                        className="
                          mt-1
                          text-xl
                          font-black
                          tracking-[-0.04em]
                          text-white
                        "
                      >
                        Checkout
                      </h2>
                    </div>

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
                      <ReceiptText
                        size={19}
                        className="text-violet-400"
                      />
                    </div>
                  </div>

                  {/* Summary Rows */}

                  <div
                    className="
                      mt-7
                      space-y-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          text-xs
                          text-zinc-500
                        "
                      >
                        Courses
                      </span>

                      <span
                        className="
                          text-xs
                          font-bold
                          text-zinc-300
                        "
                      >
                        {courseDetails.length}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          text-xs
                          text-zinc-500
                        "
                      >
                        Subtotal
                      </span>

                      <span
                        className="
                          text-xs
                          font-bold
                          text-zinc-300
                        "
                      >
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          text-xs
                          text-zinc-500
                        "
                      >
                        Platform fee
                      </span>

                      <span
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          text-emerald-400
                        "
                      >
                        Free
                      </span>
                    </div>
                  </div>

                  {/* Divider */}

                  <div
                    className="
                      my-6
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-white/15
                      to-transparent
                    "
                  />

                  {/* Total */}

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.18em]
                          text-zinc-600
                        "
                      >
                        Total Amount
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-zinc-500
                        "
                      >
                        Inclusive checkout
                      </p>
                    </div>

                    <motion.p
                      key={totalPrice}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        bg-gradient-to-r
                        from-emerald-400
                        via-cyan-400
                        to-violet-400
                        bg-clip-text
                        text-2xl
                        font-black
                        tracking-[-0.04em]
                        text-transparent
                      "
                    >
                      ₹{totalPrice.toFixed(2)}
                    </motion.p>
                  </div>

                  {/* Buy Button */}

                  <motion.button
                    whileHover={
                      !buying
                        ? {
                            y: -3,
                            scale: 1.015,
                          }
                        : {}
                    }
                    whileTap={
                      !buying
                        ? {
                            scale: 0.97,
                          }
                        : {}
                    }
                    onClick={handleBuyNow}
                    disabled={buying}
                    className="
                      group
                      relative
                      mt-7
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      overflow-hidden
                      rounded-2xl
                      bg-white
                      px-5
                      py-4
                      text-xs
                      font-black
                      text-black
                      shadow-[0_18px_55px_rgba(255,255,255,0.09)]
                      transition-opacity
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {/* Shine */}

                    {!buying && (
                      <motion.span
                        animate={{
                          x: ["-180%", "300%"],
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
                          w-20
                          rotate-12
                          bg-gradient-to-r
                          from-transparent
                          via-violet-300/50
                          to-transparent
                        "
                      />
                    )}

                    {buying ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />

                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} />

                        Buy Now

                        <ArrowRight
                          size={15}
                          className="
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />
                      </>
                    )}
                  </motion.button>

                  {/* Security */}

                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-2
                      gap-2
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-3
                        py-3
                      "
                    >
                      <LockKeyhole
                        size={13}
                        className="text-emerald-400"
                      />

                      <span
                        className="
                          text-[8px]
                          font-bold
                          text-zinc-500
                        "
                      >
                        Secure Payment
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-3
                        py-3
                      "
                    >
                      <ShieldCheck
                        size={13}
                        className="text-cyan-400"
                      />

                      <span
                        className="
                          text-[8px]
                          font-bold
                          text-zinc-500
                        "
                      >
                        Protected
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Momentum Card */}

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  mt-4
                  flex
                  items-center
                  gap-3
                  rounded-[22px]
                  border
                  border-amber-500/15
                  bg-amber-500/[0.06]
                  px-4
                  py-4
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-amber-500/10
                  "
                >
                  <Zap
                    size={16}
                    className="text-amber-400"
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-black
                      text-zinc-300
                    "
                  >
                    Build the momentum
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      leading-4
                      text-zinc-600
                    "
                  >
                    One course can start a surprisingly large journey.
                  </p>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;