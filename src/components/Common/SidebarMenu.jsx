import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  FiUser,
  FiBookOpen,
  FiPlusCircle,
  FiGrid,
  FiSettings,
  FiLogOut,
  FiBarChart2,
  FiFolderPlus,
} from "react-icons/fi";

import { IoMdClose } from "react-icons/io";

import {
  logout,
} from "../../services/operations/authAPI";

const SidebarMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // GET USER FROM LOCAL STORAGE
  // =====================================================

  let user = null;

  try {
    const storedUser =
      localStorage.getItem("user");

    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error(
      "❌ Failed to parse user from localStorage:",
      error
    );
  }

  console.log(
    "👤 Sidebar User:",
    user
  );

  console.log(
    "🎭 Sidebar Account Type:",
    user?.accountType
  );

  // =====================================================
  // ACTIVE ROUTE CHECK
  // =====================================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // =====================================================
  // CLOSE SIDEBAR AFTER NAVIGATION ON MOBILE
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
    console.log(
      "🚪 Logout started..."
    );

    dispatch(
      logout(navigate, dispatch)
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log(
      "✅ Local storage cleared"
    );

    navigate("/login");
  };

  // =====================================================
  // COMMON MENU STYLE
  // =====================================================

  const menuItemStyles = {
    button: ({ active }) => ({
      padding: "12px 20px",

      color: active
        ? "#fef9c3"
        : "#facc15",

      fontWeight: "500",

      backgroundColor: active
        ? "#1e293b"
        : "transparent",

      borderLeft: active
        ? "4px solid #facc15"
        : "4px solid transparent",

      transition:
        "all 0.2s ease",

      "&:hover": {
        backgroundColor: "#1f2937",
        color: "#fde047",
      },
    }),
  };

  return (
    <Sidebar
      className="
        z-20
        h-full
        min-h-screen
        w-[250px]
        bg-black
        text-yellow-300
        flex
        flex-col
        justify-between
      "
      rootStyles={{
        backgroundColor: "#000000",
      }}
    >
      <div>
        {/* ============================================= */}
        {/* SIDEBAR HEADER */}
        {/* ============================================= */}

        <div
          className="
            px-5
            py-6
            border-b
            border-richblack-700
          "
        >
          <h2
            className="
              text-xl
              font-bold
              text-yellow-300
            "
          >
            StudyFlux
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-richblack-400
            "
          >
            {user?.accountType
              ? `${user.accountType} Panel`
              : "Dashboard"}
          </p>
        </div>

        {/* ============================================= */}
        {/* MENU */}
        {/* ============================================= */}

        <Menu
          menuItemStyles={
            menuItemStyles
          }
        >
          {/* ========================================= */}
          {/* INSTRUCTOR DASHBOARD */}
          {/* ========================================= */}

          {user?.accountType ===
            "Instructor" && (
            <MenuItem
              active={isActive(
                "/dashboard/instructor-profile"
              )}
              icon={
                <FiBarChart2
                  size={19}
                />
              }
              component={
                <Link
                  to="/dashboard/instructor-profile"
                  onClick={
                    handleNavigation
                  }
                />
              }
            >
              Instructor Dashboard
            </MenuItem>
          )}

          {/* ========================================= */}
          {/* MY PROFILE */}
          {/* ========================================= */}

          <MenuItem
            active={isActive(
              "/dashboard/my-profile"
            )}
            icon={
              <FiUser size={19} />
            }
            component={
              <Link
                to="/dashboard/my-profile"
                onClick={
                  handleNavigation
                }
              />
            }
          >
            My Profile
          </MenuItem>

          {/* ========================================= */}
          {/* STUDENT ONLY */}
          {/* ========================================= */}

          {user?.accountType ===
            "Student" && (
            <MenuItem
              active={isActive(
                "/dashboard/enrolled-courses"
              )}
              icon={
                <FiBookOpen
                  size={19}
                />
              }
              component={
                <Link
                  to="/dashboard/enrolled-courses"
                  onClick={
                    handleNavigation
                  }
                />
              }
            >
              Enrolled Courses
            </MenuItem>
          )}

          {/* ========================================= */}
          {/* INSTRUCTOR ONLY */}
          {/* ========================================= */}

          {user?.accountType ===
            "Instructor" && (
            <MenuItem
              active={isActive(
                "/dashboard/createcourses"
              )}
              icon={
                <FiPlusCircle
                  size={19}
                />
              }
              component={
                <Link
                  to="/dashboard/createcourses"
                  onClick={
                    handleNavigation
                  }
                />
              }
            >
              Create Courses
            </MenuItem>
          )}

          {/* ========================================= */}
          {/* ADMIN ONLY */}
          {/* ========================================= */}

          {user?.accountType ===
            "Admin" && (
            <MenuItem
              active={isActive(
                "/dashboard/createCategory"
              )}
              icon={
                <FiFolderPlus
                  size={19}
                />
              }
              component={
                <Link
                  to="/dashboard/createCategory"
                  onClick={
                    handleNavigation
                  }
                />
              }
            >
              Create Category
            </MenuItem>
          )}

          {/* ========================================= */}
          {/* ALL COURSES */}
          {/* ========================================= */}

          <MenuItem
            active={isActive(
              "/dashboard/AllCourses"
            )}
            icon={
              <FiGrid size={19} />
            }
            component={
              <Link
                to="/dashboard/AllCourses"
                onClick={
                  handleNavigation
                }
              />
            }
          >
            All Courses
          </MenuItem>

          {/* ========================================= */}
          {/* SETTINGS */}
          {/* ========================================= */}

          <MenuItem
            active={isActive(
              "/dashboard/setting"
            )}
            icon={
              <FiSettings
                size={19}
              />
            }
            component={
              <Link
                to="/dashboard/setting"
                onClick={
                  handleNavigation
                }
              />
            }
          >
            Setting
          </MenuItem>

          {/* ========================================= */}
          {/* LOGOUT */}
          {/* ========================================= */}

          <MenuItem
            icon={
              <FiLogOut
                size={19}
              />
            }
            onClick={
              handleLogout
            }
            style={{
              color: "#f87171",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/* ============================================= */}
      {/* MOBILE CLOSE BUTTON */}
      {/* ============================================= */}

      <div
        className="
          md:hidden
          px-4
          py-3
        "
      >
        <button
          onClick={onClose}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            text-black
            bg-yellow-400
            hover:bg-yellow-300
            transition
            duration-200
            font-semibold
            py-2
            rounded-md
            shadow-md
          "
        >
          <IoMdClose
            size={20}
          />

          Close Sidebar
        </button>
      </div>
    </Sidebar>
  );
};

export default SidebarMenu;