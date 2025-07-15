import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../../services/operations/profileAPI";
import { MdArrowDropDownCircle } from "react-icons/md";
import SidebarMenu from "../../Common/SidebarMenu"; // Ensure SidebarMenu is a default export
import { setUserProfile } from "../../../Slices/profileSlice"; // Import your Redux action

function ProfileDropDown() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      // Inside fetchProfile()
try {
  const data = await getUserDetails();
  setProfile(data);
  dispatch(setUserProfile(data)); // store it in Redux
} catch (err) {
  setError("Failed to load profile.");
}


      try {
        const data = await getUserDetails();
        setProfile(data);
        console.log("Profile data:", data);
      } catch (err) {
        setError("Failed to load profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (!token) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (

     

    <div>
      
      <div
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={toggleSidebar}
      >
        <img
          src={profile?.data.image}
          className="w-10 h-10 rounded-full"
          alt="User"
        />
        <MdArrowDropDownCircle size={24} />
      </div>

      <div
       className={`fixed top-16 left-0 h-full z-50 bg-gray-400 text-richblack-900 font-bold shadow-lg w-64 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
       }`}
      >
           <SidebarMenu />
       </div>

    </div>
  );
}

export default ProfileDropDown;
