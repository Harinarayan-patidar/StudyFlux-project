import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

import {
  FiUser,
  FiBookOpen,
  FiPlusCircle,
  FiGrid,
  FiSettings,
  FiLogOut,
  FiBarChart2,
  FiFolderPlus,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import {
  HiOutlineSparkles,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

import { logout } from "../../services/operations/authAPI";

// =====================================================
// MENU CONFIGURATION
// =====================================================

const getMenuItems = (accountType) => {
  const items = [];

  if (accountType === "Instructor") {
    items.push({
      label: "Instructor Dashboard",
      path: "/dashboard/instructor-profile",
      icon: FiBarChart2,
    });
  }

  items.push({
    label: "My Profile",
    path: "/dashboard/my-profile",
    icon: FiUser,
  });

  if (accountType === "Student") {
    items.push({
      label: "Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      icon: FiBookOpen,
    });
  }

  if (accountType === "Instructor") {
    items.push({
      label: "Create Courses",
      path: "/dashboard/createcourses",
      icon: FiPlusCircle,
    });
  }

  if (accountType === "Admin") {
    items.push({
      label: "Create Category",
      path: "/dashboard/createCategory",
      icon: FiFolderPlus,
    });
  }

  items.push(
    {
      label: "All Courses",
      path: "/dashboard/AllCourses",
      icon: FiGrid,
    },
    {
      label: "Settings",
      path: "/dashboard/setting",
      icon: FiSettings,
    }
  );

  return items;
};

// =====================================================
// SIDEBAR MENU
// =====================================================

const SidebarMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // REDUX USER
  // =====================================================

  const reduxUser = useSelector(
    (state) => state.profile?.user
  );

  // =====================================================
  // SAFE LOCAL STORAGE USER
  // =====================================================

  let storedUser = null;

  try {
    const rawUser = localStorage.getItem("user");

    storedUser = rawUser
      ? JSON.parse(rawUser)
      : null;
  } catch (error) {
    console.error(
      "Failed to parse sidebar user:",
      error
    );
  }

  const user = storedUser || reduxUser;

  const menuItems = getMenuItems(
    user?.accountType
  );

  // =====================================================
  // ACTIVE ROUTE
  // =====================================================

  const isActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    dispatch(
      logout(navigate, dispatch)
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    if (onClose) {
      onClose();
    }
  };

  // =====================================================
  // USER HELPERS
  // =====================================================

  const fullName = [
    user?.firstName,
    user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const displayName =
    fullName || "StudyFlux User";

  const role =
    user?.accountType || "Member";

  const initials = [
    user?.firstName?.[0],
    user?.lastName?.[0],
  ]
    .filter(Boolean)
    .join("")
    .toUpperCase() || "SF";

  return (
    <aside
      className="
        relative
        flex
        h-full
        min-h-screen
        w-[280px]
        shrink-0
        flex-col
        overflow-hidden
        border-r
        border-white/10
        bg-black
        text-white
      "
    >
      {/* =====================================
          BACKGROUND GRID
      ===================================== */}

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
          backgroundSize: "36px 36px",
        }}
      />

      {/* =====================================
          ANIMATED BACKGROUND GLOWS
      ===================================== */}

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-24
          top-10
          z-0
          h-52
          w-52
          rounded-full
          bg-violet-600/15
          blur-[80px]
        "
      />

      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, -45, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-20
          z-0
          h-52
          w-52
          rounded-full
          bg-cyan-500/10
          blur-[85px]
        "
      />

      {/* =====================================
          FAINT BACKGROUND TEXT
      ===================================== */}

      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.025, 0.055, 0.025],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-20
          top-[44%]
          z-0
          rotate-90
          whitespace-nowrap
          select-none
          text-6xl
          font-black
          tracking-[-0.07em]
          text-violet-400
        "
      >
        STUDYFLUX
      </motion.div>

      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-1
          flex-col
        "
      >
        {/* =====================================
            BRAND HEADER
        ===================================== */}

        <div
          className="
            border-b
            border-white/10
            px-5
            pb-5
            pt-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            {/* Brand */}

            <Link
              to="/"
              onClick={handleNavigation}
              className="
                group
                flex
                items-center
                gap-3
              "
            >
              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.07,
                }}
                whileTap={{
                  scale: 0.94,
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
                  border-violet-500/25
                  bg-violet-500/10
                  shadow-[0_0_30px_rgba(139,92,246,0.12)]
                "
              >
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
                    inset-[-40%]
                    bg-gradient-to-r
                    from-transparent
                    via-violet-500/20
                    to-transparent
                  "
                />

                <HiOutlineAcademicCap
                  size={22}
                  className="
                    relative
                    z-10
                    text-violet-300
                  "
                />
              </motion.div>

              <div>
                <h2
                  className="
                    text-lg
                    font-black
                    tracking-[-0.05em]
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
                  Learning Platform
                </p>
              </div>
            </Link>

            {/* Mobile Close */}

            <motion.button
              whileHover={{
                rotate: 90,
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                text-zinc-400
                transition-colors
                hover:border-violet-500/30
                hover:text-white
                md:hidden
              "
            >
              <FiX size={17} />
            </motion.button>
          </div>
        </div>

        {/* =====================================
            USER PROFILE CARD
        ===================================== */}

        <div className="px-4 pt-5">
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
              duration: 0.55,
            }}
            whileHover={{
              y: -3,
            }}
            className="
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-white/10
              bg-zinc-950/80
              p-3
              shadow-[0_18px_50px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
            "
          >
            {/* User Card Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-28
                w-28
                rounded-full
                bg-violet-600/15
                blur-[45px]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-3
              "
            >
              {/* Avatar */}

              <div
                className="
                  relative
                  h-11
                  w-11
                  shrink-0
                "
              >
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={displayName}
                    className="
                      h-full
                      w-full
                      rounded-2xl
                      border
                      border-violet-500/30
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-violet-500/25
                      bg-gradient-to-br
                      from-violet-500/20
                      to-cyan-500/10
                      text-xs
                      font-black
                      text-violet-300
                    "
                  >
                    {initials}
                  </div>
                )}

                {/* Online dot */}

                <motion.span
                  animate={{
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    -bottom-0.5
                    -right-0.5
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-zinc-950
                    bg-emerald-400
                  "
                />
              </div>

              {/* User Info */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate
                    text-xs
                    font-black
                    text-white
                  "
                >
                  {displayName}
                </p>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <HiOutlineSparkles
                    size={10}
                    className="text-violet-400"
                  />

                  <span
                    className="
                      truncate
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-zinc-600
                    "
                  >
                    {role} Panel
                  </span>
                </div>
              </div>

              <FiChevronRight
                size={14}
                className="text-zinc-700"
              />
            </div>
          </motion.div>
        </div>

        {/* =====================================
            NAVIGATION LABEL
        ===================================== */}

        <div
          className="
            px-6
            pb-2
            pt-7
          "
        >
          <p
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.22em]
              text-zinc-700
            "
          >
            Workspace
          </p>
        </div>

        {/* =====================================
            NAVIGATION ITEMS
        ===================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            pb-5

            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-violet-500/20
          "
        >
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <motion.div
                  key={item.path}
                  initial={{
                    opacity: 0,
                    x: -18,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.08 * index,
                    duration: 0.4,
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={handleNavigation}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      gap-3
                      overflow-hidden
                      rounded-2xl
                      px-3
                      py-3
                      transition-all
                      duration-300

                      ${
                        active
                          ? `
                            border
                            border-violet-500/25
                            bg-violet-500/10
                            text-white
                            shadow-[0_10px_35px_rgba(139,92,246,0.08)]
                          `
                          : `
                            border
                            border-transparent
                            text-zinc-500
                            hover:border-white/10
                            hover:bg-white/[0.04]
                            hover:text-white
                          `
                      }
                    `}
                  >
                    {/* Active Background Glow */}

                    {active && (
                      <motion.div
                        layoutId="sidebarActiveGlow"
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-violet-500/10
                          via-violet-500/[0.04]
                          to-transparent
                        "
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Active Left Indicator */}

                    {active && (
                      <motion.span
                        layoutId="sidebarActiveIndicator"
                        className="
                          absolute
                          left-0
                          top-1/2
                          h-6
                          w-[3px]
                          -translate-y-1/2
                          rounded-r-full
                          bg-gradient-to-b
                          from-violet-400
                          to-cyan-400
                          shadow-[0_0_14px_rgba(139,92,246,0.7)]
                        "
                      />
                    )}

                    {/* Icon */}

                    <motion.div
                      whileHover={{
                        rotate: active ? 0 : 6,
                        scale: 1.08,
                      }}
                      className={`
                        relative
                        z-10
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300

                        ${
                          active
                            ? `
                              border
                              border-violet-500/25
                              bg-violet-500/15
                              text-violet-300
                            `
                            : `
                              border
                              border-white/[0.06]
                              bg-white/[0.03]
                              text-zinc-600
                              group-hover:border-violet-500/20
                              group-hover:bg-violet-500/10
                              group-hover:text-violet-300
                            `
                        }
                      `}
                    >
                      <Icon size={16} />
                    </motion.div>

                    {/* Label */}

                    <span
                      className={`
                        relative
                        z-10
                        min-w-0
                        flex-1
                        truncate
                        text-[11px]

                        ${
                          active
                            ? "font-black"
                            : "font-semibold"
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    {/* Arrow */}

                    <FiChevronRight
                      size={13}
                      className={`
                        relative
                        z-10
                        transition-all
                        duration-300

                        ${
                          active
                            ? `
                              translate-x-0
                              text-violet-400
                              opacity-100
                            `
                            : `
                              -translate-x-1
                              text-zinc-700
                              opacity-0
                              group-hover:translate-x-0
                              group-hover:opacity-100
                            `
                        }
                      `}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* =====================================
            BOTTOM SECTION
        ===================================== */}

        <div
          className="
            border-t
            border-white/10
            p-4
          "
        >
          {/* Mini Upgrade / Learning Card */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="
              relative
              mb-3
              overflow-hidden
              rounded-[20px]
              border
              border-violet-500/15
              bg-violet-500/[0.06]
              p-3
            "
          >
            <motion.div
              animate={{
                x: [-30, 50, -30],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                -top-10
                h-24
                w-24
                rounded-full
                bg-violet-500
                blur-[45px]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-3
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
                  bg-violet-500/10
                "
              >
                <Zap
                  size={15}
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
                  Keep learning
                </p>

                <p
                  className="
                    mt-0.5
                    text-[8px]
                    leading-4
                    text-zinc-600
                  "
                >
                  Small steps. Serious momentum.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Logout */}

          <motion.button
            whileHover={{
              x: 3,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleLogout}
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              border-transparent
              px-3
              py-3
              text-left
              text-rose-400
              transition-all
              duration-300
              hover:border-rose-500/20
              hover:bg-rose-500/[0.07]
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
                border
                border-rose-500/15
                bg-rose-500/[0.07]
                transition-all
                duration-300
                group-hover:bg-rose-500/15
              "
            >
              <FiLogOut size={16} />
            </div>

            <span
              className="
                flex-1
                text-[11px]
                font-black
              "
            >
              Logout
            </span>

            <FiChevronRight
              size={13}
              className="
                -translate-x-1
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0
                group-hover:opacity-100
              "
            />
          </motion.button>

          {/* Mobile Close Button */}

          <motion.button
            whileTap={{
              scale: 0.97,
            }}
            onClick={onClose}
            className="
              mt-3
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              py-3
              text-[10px]
              font-black
              text-zinc-400
              transition-colors
              hover:border-violet-500/30
              hover:text-white
              md:hidden
            "
          >
            <FiX size={15} />
            Close Sidebar
          </motion.button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;