import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../../services/operations/profileAPI";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { setUserProfile } from "../../../Slices/profileSlice";

function ProfileDropDown() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserDetails();
        setProfile(data);
        dispatch(setUserProfile(data));
      } catch (err) {
        setError("Failed to load profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!token || loading) return null;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleLogout = () => {
    dispatch(logout(navigate, dispatch));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={profile?.image || "/default-avatar.png"}
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          alt="User"
        />
        <MdArrowDropDownCircle size={24} />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
              setIsDropdownOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
