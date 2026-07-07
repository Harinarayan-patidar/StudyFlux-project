import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
  matchPath,
} from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  LogIn,
  Menu,
  ShoppingCart,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";

import logoImg from "../../assets/images/logo.png";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { NavbarLinks } from "../../data/navbar-link";
import { Categories } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";
import { logout } from "../../services/operations/authAPI";
import { isTokenExpired } from "../../services/autoDeleteToken";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useSelector(
    (state) => state.auth
  );

  const { user } = useSelector(
    (state) => state.profile
  );

  const { totalItems } = useSelector(
    (state) => state.cart
  );

  const [subLinks, setSubLinks] =
    useState([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [catalogOpen, setCatalogOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const catalogRef = useRef(null);

  // =========================================
  // TOKEN EXPIRY
  // =========================================

  useEffect(() => {
    const checkToken = () => {
      const currentToken =
        localStorage.getItem("token");

      if (
        currentToken &&
        isTokenExpired(currentToken)
      ) {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    };

    checkToken();

    const interval = setInterval(
      checkToken,
      5000
    );

    return () =>
      clearInterval(interval);
  }, [dispatch]);

  // =========================================
  // FETCH CATEGORIES
  // =========================================

  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        const result =
          await apiConnector(
            "GET",
            Categories.CATEGORIES_API
          );

        setSubLinks(
          result?.data?.data || []
        );
      } catch (error) {
        console.error(
          "Could not fetch category links",
          error
        );
      }
    };

    fetchSubLinks();
  }, []);

  // =========================================
  // SCROLL EFFECT
  // =========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // =========================================
  // CLOSE MENU ON ROUTE CHANGE
  // =========================================

  useEffect(() => {
    setMenuOpen(false);
    setCatalogOpen(false);
  }, [location.pathname]);

  // =========================================
  // OUTSIDE CLICK
  // =========================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        catalogRef.current &&
        !catalogRef.current.contains(
          event.target
        )
      ) {
        setCatalogOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // =========================================
  // MOBILE BODY LOCK
  // =========================================

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // =========================================
  // ROUTE MATCH
  // =========================================

  const matchRoute = (route) => {
    if (!route) return false;

    return matchPath(
      {
        path: route,
        end: route === "/",
      },
      location.pathname
    );
  };

  const isCatalogActive =
    location.pathname.startsWith(
      "/catalog"
    );

  return (
    <>
      <motion.header
        initial={{
          y: -70,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          light-studyflux-navbar
          sticky
          top-0
          z-50
          w-full
          border-b
          !text-slate-800
          transition-all
          duration-300

          ${
            scrolled
              ? `
                border-slate-200/80
                bg-white/90
                shadow-[0_12px_40px_rgba(15,23,42,0.10)]
                backdrop-blur-2xl
              `
              : `
                border-slate-200/70
                bg-white/95
                backdrop-blur-xl
              `
          }
        `}
      >
        {/* =====================================
            ANIMATED TOP LINE
        ===================================== */}

        <motion.div
          animate={{
            backgroundPosition: [
              "0% 50%",
              "100% 50%",
              "0% 50%",
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
          className="
            absolute
            inset-x-0
            top-0
            h-[3px]
            bg-gradient-to-r
            from-cyan-400
            via-indigo-500
            to-violet-500
          "
        />

        {/* =====================================
            SOFT BACKGROUND
        ===================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <motion.div
            animate={{
              x: [0, 60, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -top-20
              left-[15%]
              h-36
              w-64
              rounded-full
              bg-indigo-300/20
              blur-[65px]
            "
          />

          <motion.div
            animate={{
              x: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-16
              -top-20
              h-36
              w-56
              rounded-full
              bg-cyan-300/20
              blur-[65px]
            "
          />
        </div>

        {/* =====================================
            MAIN NAV
        ===================================== */}

        <div
          className="
            relative
            mx-auto
            flex
            h-[72px]
            w-full
            max-w-[1500px]
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* =====================================
              LOGO
          ===================================== */}

          <motion.div
            whileHover={{
              scale: 1.025,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="shrink-0"
          >
            <Link
              to="/"
              className="
                flex
                items-center
                gap-2.5
                !text-slate-900
              "
            >
              <motion.div
                whileHover={{
                  rotate: [
                    0,
                    -6,
                    6,
                    0,
                  ],
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-indigo-100
                  bg-gradient-to-br
                  from-indigo-50
                  to-cyan-50
                  shadow-sm
                "
              >
                <img
                  src={logoImg}
                  alt="StudyFlux Logo"
                  className="
                    h-full
                    w-full
                    object-contain
                    p-1
                  "
                />
              </motion.div>

              <div
                className="
                  flex
                  items-center
                "
              >
                <span
                  className="
                    !text-xl
                    !font-black
                    tracking-[-0.04em]
                    !text-slate-900
                    sm:!text-2xl
                  "
                >
                  Study
                </span>

                <span
                  className="
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-cyan-600
                    bg-clip-text
                    !text-xl
                    !font-black
                    tracking-[-0.04em]
                    !text-transparent
                    sm:!text-2xl
                  "
                >
                  Flux
                </span>

                <motion.span
                  animate={{
                    rotate: [
                      0,
                      15,
                      -10,
                      0,
                    ],
                    scale: [
                      1,
                      1.15,
                      1,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="
                    ml-1
                    hidden
                    sm:block
                  "
                >
                  <Sparkles
                    size={11}
                    className="!text-indigo-500"
                  />
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* =====================================
              DESKTOP LINKS
          ===================================== */}

          <nav
            className="
              hidden
              items-center
              lg:flex
            "
          >
            <ul
              className="
                flex
                items-center
                gap-1
                rounded-2xl
                border
                border-slate-200
                bg-slate-50/80
                p-1
                shadow-sm
              "
            >
              {NavbarLinks.map(
                (link, index) => {
                  const isCatalog =
                    link.title ===
                    "Catalog";

                  const isActive =
                    isCatalog
                      ? isCatalogActive
                      : matchRoute(
                          link?.path
                        );

                  return (
                    <li
                      key={
                        link.path ||
                        link.title ||
                        index
                      }
                      className="relative"
                    >
                      {isCatalog ? (
                        <div
                          ref={catalogRef}
                          className="relative"
                          onMouseEnter={() =>
                            setCatalogOpen(
                              true
                            )
                          }
                          onMouseLeave={() =>
                            setCatalogOpen(
                              false
                            )
                          }
                        >
                          <motion.button
                            whileTap={{
                              scale: 0.96,
                            }}
                            onClick={() =>
                              setCatalogOpen(
                                (prev) =>
                                  !prev
                              )
                            }
                            className={`
                              relative
                              flex
                              items-center
                              gap-1.5
                              rounded-xl
                              px-4
                              py-2
                              !text-sm
                              !font-semibold
                              transition-colors

                              ${
                                isActive
                                  ? "!text-indigo-700"
                                  : "!text-slate-700 hover:!text-indigo-700"
                              }
                            `}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="navbar-active"
                                className="
                                  absolute
                                  inset-0
                                  rounded-xl
                                  border
                                  border-indigo-200
                                  bg-white
                                  shadow-sm
                                "
                              />
                            )}

                            <span
                              className="
                                relative
                                !text-inherit
                              "
                            >
                              {link.title}
                            </span>

                            <motion.span
                              animate={{
                                rotate:
                                  catalogOpen
                                    ? 180
                                    : 0,
                              }}
                              className="
                                relative
                                !text-inherit
                              "
                            >
                              <ChevronDown
                                size={14}
                              />
                            </motion.span>
                          </motion.button>

                          {/* =====================================
                              DESKTOP DROPDOWN
                          ===================================== */}

                          <AnimatePresence>
                            {catalogOpen && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  y: 12,
                                  scale: 0.96,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                }}
                                exit={{
                                  opacity: 0,
                                  y: 8,
                                  scale: 0.97,
                                }}
                                transition={{
                                  duration: 0.2,
                                }}
                                className="
                                  absolute
                                  left-1/2
                                  top-full
                                  z-[80]
                                  w-[300px]
                                  -translate-x-1/2
                                  pt-3
                                "
                              >
                                <div
                                  className="
                                    relative
                                    overflow-hidden
                                    rounded-[22px]
                                    border
                                    border-slate-200
                                    bg-white
                                    p-2
                                    shadow-[0_24px_70px_rgba(15,23,42,0.16)]
                                  "
                                >
                                  {/* Dropdown glow */}

                                  <div
                                    className="
                                      pointer-events-none
                                      absolute
                                      -right-12
                                      -top-12
                                      h-28
                                      w-28
                                      rounded-full
                                      bg-violet-200/50
                                      blur-[45px]
                                    "
                                  />

                                  {/* Header */}

                                  <div
                                    className="
                                      relative
                                      mb-2
                                      flex
                                      items-center
                                      gap-2
                                      border-b
                                      border-slate-100
                                      px-3
                                      py-2.5
                                    "
                                  >
                                    <BookOpen
                                      size={14}
                                      className="!text-indigo-600"
                                    />

                                    <span
                                      className="
                                        !text-[9px]
                                        !font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        !text-slate-500
                                      "
                                    >
                                      Explore Categories
                                    </span>
                                  </div>

                                  {/* Categories */}

                                  <div
                                    className="
                                      relative
                                      max-h-[320px]
                                      overflow-y-auto

                                      [&::-webkit-scrollbar]:w-[4px]
                                      [&::-webkit-scrollbar-thumb]:rounded-full
                                      [&::-webkit-scrollbar-thumb]:bg-indigo-200
                                    "
                                  >
                                    {subLinks.length ? (
                                      subLinks.map(
                                        (
                                          subLink,
                                          idx
                                        ) => (
                                          <motion.div
                                            key={
                                              subLink._id ||
                                              idx
                                            }
                                            initial={{
                                              opacity: 0,
                                              x: -8,
                                            }}
                                            animate={{
                                              opacity: 1,
                                              x: 0,
                                            }}
                                            transition={{
                                              delay:
                                                idx *
                                                0.035,
                                            }}
                                          >
                                            <Link
                                              to={`/catalog/${subLink._id}`}
                                              className="
                                                group
                                                flex
                                                items-center
                                                justify-between
                                                rounded-xl
                                                px-3
                                                py-2.5
                                                !text-xs
                                                !font-medium
                                                !text-slate-700
                                                transition-all
                                                hover:bg-indigo-50
                                                hover:!text-indigo-700
                                              "
                                            >
                                              <span
                                                className="
                                                  truncate
                                                  !text-inherit
                                                "
                                              >
                                                {
                                                  subLink.name
                                                }
                                              </span>

                                              <ArrowRight
                                                size={13}
                                                className="
                                                  !text-indigo-500
                                                  opacity-0
                                                  transition-all
                                                  group-hover:translate-x-1
                                                  group-hover:opacity-100
                                                "
                                              />
                                            </Link>
                                          </motion.div>
                                        )
                                      )
                                    ) : (
                                      <div
                                        className="
                                          px-3
                                          py-7
                                          text-center
                                          !text-xs
                                          !text-slate-500
                                        "
                                      >
                                        No courses found
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={link?.path}
                          className={`
                            relative
                            block
                            rounded-xl
                            px-4
                            py-2
                            !text-sm
                            !font-semibold
                            transition-colors

                            ${
                              isActive
                                ? "!text-indigo-700"
                                : "!text-slate-700 hover:!text-indigo-700"
                            }
                          `}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="navbar-active"
                              className="
                                absolute
                                inset-0
                                rounded-xl
                                border
                                border-indigo-200
                                bg-white
                                shadow-sm
                              "
                            />
                          )}

                          <span
                            className="
                              relative
                              !text-inherit
                            "
                          >
                            {link.title}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                }
              )}
            </ul>
          </nav>

          {/* =====================================
              DESKTOP ACTIONS
          ===================================== */}

          <div
            className="
              hidden
              shrink-0
              items-center
              gap-2
              lg:flex
            "
          >
            {/* Cart */}

            {user &&
              user?.accountType !==
                "Instructor" && (
                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.93,
                  }}
                >
                  <Link
                    to="/dashboard/cart"
                    className="
                      relative
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      !text-slate-700
                      shadow-sm
                      transition
                      hover:border-indigo-200
                      hover:bg-indigo-50
                      hover:!text-indigo-700
                    "
                  >
                    <ShoppingCart
                      size={17}
                    />

                    <AnimatePresence>
                      {totalItems > 0 && (
                        <motion.span
                          initial={{
                            scale: 0,
                          }}
                          animate={{
                            scale: 1,
                          }}
                          exit={{
                            scale: 0,
                          }}
                          className="
                            absolute
                            -right-1.5
                            -top-1.5
                            flex
                            min-h-[18px]
                            min-w-[18px]
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-white
                            bg-gradient-to-r
                            from-amber-300
                            to-orange-400
                            px-1
                            !text-[8px]
                            !font-black
                            !text-slate-900
                          "
                        >
                          {totalItems > 99
                            ? "99+"
                            : totalItems}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              )}

            {/* Login / Signup */}

            {!token ? (
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <Link
                    to="/login"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-2.5
                      !text-xs
                      !font-semibold
                      !text-slate-700
                      shadow-sm
                      transition
                      hover:border-indigo-200
                      hover:bg-indigo-50
                      hover:!text-indigo-700
                    "
                  >
                    <LogIn size={14} />

                    <span className="!text-inherit">
                      Log in
                    </span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -2,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <Link
                    to="/signup"
                    className="
                      relative
                      flex
                      items-center
                      gap-1.5
                      overflow-hidden
                      rounded-xl
                      bg-gradient-to-r
                      from-indigo-600
                      to-violet-600
                      px-4
                      py-2.5
                      !text-xs
                      !font-bold
                      !text-white
                      shadow-lg
                      shadow-indigo-500/20
                    "
                  >
                    <motion.span
                      animate={{
                        x: [
                          "-150%",
                          "250%",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                      }}
                      className="
                        absolute
                        inset-y-0
                        w-8
                        skew-x-[-20deg]
                        bg-gradient-to-r
                        from-transparent
                        via-white/30
                        to-transparent
                      "
                    />

                    <UserPlus
                      size={14}
                      className="relative"
                    />

                    <span
                      className="
                        relative
                        !text-white
                      "
                    >
                      Sign up
                    </span>
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="ml-1">
                <ProfileDropDown />
              </div>
            )}
          </div>

          {/* =====================================
              MOBILE ACTIONS
          ===================================== */}

          <div
            className="
              flex
              items-center
              gap-2
              lg:hidden
            "
          >
            {/* Cart */}

            {user &&
              user?.accountType !==
                "Instructor" && (
                <Link
                  to="/dashboard/cart"
                  className="
                    relative
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    !text-slate-700
                    shadow-sm
                  "
                >
                  <ShoppingCart
                    size={17}
                  />

                  {totalItems > 0 && (
                    <span
                      className="
                        absolute
                        -right-1
                        -top-1
                        flex
                        min-h-[17px]
                        min-w-[17px]
                        items-center
                        justify-center
                        rounded-full
                        bg-amber-300
                        px-1
                        !text-[8px]
                        !font-black
                        !text-slate-900
                      "
                    >
                      {totalItems > 99
                        ? "99+"
                        : totalItems}
                    </span>
                  )}
                </Link>
              )}

            {/* Hamburger */}

            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                setMenuOpen(
                  (prev) => !prev
                )
              }
              aria-label="Toggle navigation menu"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                !text-slate-800
                shadow-sm
              "
            >
              <AnimatePresence
                mode="wait"
              >
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    className="!text-slate-800"
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    className="!text-slate-800"
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* =====================================
          MOBILE MENU
      ===================================== */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}

            <motion.button
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMenuOpen(false)
              }
              aria-label="Close navigation menu"
              className="
                fixed
                inset-0
                top-[72px]
                z-40
                bg-slate-900/20
                backdrop-blur-sm
                lg:hidden
              "
            />

            {/* Panel */}

            <motion.div
              initial={{
                opacity: 0,
                y: -18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                light-studyflux-navbar
                fixed
                left-0
                right-0
                top-[72px]
                z-50
                max-h-[calc(100vh-72px)]
                overflow-y-auto
                border-b
                border-slate-200
                bg-white/98
                px-4
                py-5
                !text-slate-800
                shadow-[0_25px_70px_rgba(15,23,42,0.16)]
                backdrop-blur-2xl
                lg:hidden
              "
            >
              <nav>
                <ul className="space-y-2">
                  {NavbarLinks.map(
                    (link, index) => {
                      const isCatalog =
                        link.title ===
                        "Catalog";

                      const isActive =
                        isCatalog
                          ? isCatalogActive
                          : matchRoute(
                              link?.path
                            );

                      return (
                        <motion.li
                          key={
                            link.path ||
                            link.title ||
                            index
                          }
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              index *
                              0.05,
                          }}
                        >
                          {isCatalog ? (
                            <div
                              className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                              "
                            >
                              <button
                                onClick={() =>
                                  setCatalogOpen(
                                    (prev) =>
                                      !prev
                                  )
                                }
                                className="
                                  flex
                                  w-full
                                  items-center
                                  justify-between
                                  px-4
                                  py-3.5
                                  !text-left
                                "
                              >
                                <span
                                  className={`
                                    !text-sm
                                    !font-semibold

                                    ${
                                      isActive
                                        ? "!text-indigo-700"
                                        : "!text-slate-700"
                                    }
                                  `}
                                >
                                  {
                                    link.title
                                  }
                                </span>

                                <motion.span
                                  animate={{
                                    rotate:
                                      catalogOpen
                                        ? 180
                                        : 0,
                                  }}
                                  className="!text-slate-600"
                                >
                                  <ChevronDown
                                    size={16}
                                  />
                                </motion.span>
                              </button>

                              <AnimatePresence
                                initial={false}
                              >
                                {catalogOpen && (
                                  <motion.div
                                    initial={{
                                      height: 0,
                                      opacity: 0,
                                    }}
                                    animate={{
                                      height:
                                        "auto",
                                      opacity: 1,
                                    }}
                                    exit={{
                                      height: 0,
                                      opacity: 0,
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div
                                      className="
                                        space-y-1
                                        border-t
                                        border-slate-200
                                        bg-white
                                        p-2
                                      "
                                    >
                                      {subLinks.length ? (
                                        subLinks.map(
                                          (
                                            subLink,
                                            idx
                                          ) => (
                                            <Link
                                              key={
                                                subLink._id ||
                                                idx
                                              }
                                              to={`/catalog/${subLink._id}`}
                                              className="
                                                flex
                                                items-center
                                                justify-between
                                                rounded-xl
                                                px-3
                                                py-3
                                                !text-xs
                                                !font-medium
                                                !text-slate-700
                                                transition
                                                hover:bg-indigo-50
                                                hover:!text-indigo-700
                                              "
                                            >
                                              <span
                                                className="
                                                  truncate
                                                  !text-inherit
                                                "
                                              >
                                                {
                                                  subLink.name
                                                }
                                              </span>

                                              <ArrowRight
                                                size={
                                                  12
                                                }
                                                className="!text-indigo-500"
                                              />
                                            </Link>
                                          )
                                        )
                                      ) : (
                                        <div
                                          className="
                                            px-3
                                            py-4
                                            text-center
                                            !text-xs
                                            !text-slate-500
                                          "
                                        >
                                          No courses found
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              to={
                                link?.path
                              }
                              className={`
                                flex
                                items-center
                                rounded-2xl
                                border
                                px-4
                                py-3.5
                                !text-sm
                                !font-semibold
                                transition

                                ${
                                  isActive
                                    ? `
                                      border-indigo-200
                                      bg-indigo-50
                                      !text-indigo-700
                                    `
                                    : `
                                      border-slate-200
                                      bg-white
                                      !text-slate-700
                                      hover:bg-slate-50
                                    `
                                }
                              `}
                            >
                              <span className="!text-inherit">
                                {
                                  link.title
                                }
                              </span>

                              {isActive && (
                                <motion.span
                                  layoutId="mobile-active-dot"
                                  className="
                                    ml-auto
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-indigo-500
                                    shadow-[0_0_10px_rgba(99,102,241,0.45)]
                                  "
                                />
                              )}
                            </Link>
                          )}
                        </motion.li>
                      );
                    }
                  )}
                </ul>
              </nav>

              {/* =====================================
                  MOBILE AUTH
              ===================================== */}

              <div
                className="
                  mt-5
                  border-t
                  border-slate-200
                  pt-5
                "
              >
                {!token ? (
                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >
                    <Link
                      to="/login"
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        !text-xs
                        !font-semibold
                        !text-slate-700
                        shadow-sm
                      "
                    >
                      <LogIn size={14} />

                      <span className="!text-inherit">
                        Log in
                      </span>
                    </Link>

                    <Link
                      to="/signup"
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-indigo-600
                        to-violet-600
                        px-4
                        py-3
                        !text-xs
                        !font-bold
                        !text-white
                        shadow-lg
                        shadow-indigo-500/20
                      "
                    >
                      <UserPlus
                        size={14}
                      />

                      <span className="!text-white">
                        Sign up
                      </span>
                    </Link>
                  </div>
                ) : (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      p-3
                      !text-slate-800
                    "
                  >
                    <p
                      className="
                        mb-2
                        !text-[9px]
                        !font-bold
                        uppercase
                        tracking-[0.18em]
                        !text-slate-500
                      "
                    >
                      Your Account
                    </p>

                    <ProfileDropDown />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;