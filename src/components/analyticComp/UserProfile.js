import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { updateProfilePicture } from "../../services/operations/profileAPI";
import { setUserProfile } from "../../Slices/profileSlice";

function UserProfile() {
  const profile = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await updateProfilePicture(file); // ✅ fixed logic
      dispatch(setUserProfile(response.data));
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to update profile picture.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-center text-red-500 mt-10">
        No profile data found.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-6 py-12 font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10"
      >
        {/* Left: Profile Image */}
        <div className="w-full md:w-[30%] flex flex-col items-center gap-4">
          <img
            src={profile.image || "/default-avatar.png"}
            alt="Profile"
            className="w-48 h-48 rounded-full border-4 border-cyan-400 object-cover shadow-[0_0_20px_#00ffff80]"
          />
          <button
            onClick={() => inputRef.current.click()}
            disabled={loading}
            className="mt-3 px-4 py-1 bg-yellow-400 text-black text-sm font-medium rounded hover:bg-yellow-300 transition"
          >
            {loading ? "Uploading..." : "Change Image"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Right: Profile Details */}
        <div className="w-full md:w-[70%] space-y-6">
          <h1 className="text-4xl font-bold text-cyan-300 drop-shadow-[0_0_20px_#00ffffaa] mb-4">
            My Profile
          </h1>

          <div className="space-y-4 text-lg">
            {[
              ["Name", `${profile.firstName} ${profile.lastName}`],
              ["Email", profile.email],
              ["Role", profile.accountType],
              ["Gender", profile.additionalDetails?.gender || "Not specified"],
              ["Date of Birth", profile.additionalDetails?.dateOfBirth
                ? new Date(profile.additionalDetails.dateOfBirth).toLocaleDateString()
                : "Not specified"],
              ["Contact Number", profile.additionalDetails?.contactNumber || "Not specified"],
              ["About", profile.additionalDetails?.about || "Not provided"],
            ].map(([label, value], idx) => (
              <div
                key={idx}
                className="border border-cyan-500 rounded-md p-3 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_#00ffff20]"
              >
                <span className="text-cyan-400 font-semibold">{label}:</span>{" "}
                <span className="text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserProfile;
