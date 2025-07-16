import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  updateUserProfile,
  updateProfilePicture,
  deleteAccount,
} from "../services/operations/profileAPI";

export default function Setting() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    about: "",
    contactNumber: "",
    gender: "",
  });

  // Load user details
  useEffect(() => {
    (async () => {
      try {
        const user = await getUserDetails();
        setUserData(user);
        setFormData({
          dateOfBirth: user?.additionalDetails?.dateOfBirth
            ? user.additionalDetails.dateOfBirth.split("T")[0]
            : "",
          about: user?.additionalDetails?.about || "",
          contactNumber: user?.additionalDetails?.contactNumber || "",
          gender: user?.additionalDetails?.gender || "",
        });
        setPreview(user?.image);
      } catch (err) {
        toast.error("Unable to load profile");
      }
    })();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleProfileSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      ...formData,
      dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth).toISOString()
        : "",
    };
    await updateUserProfile(payload);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error("Profile update failed");
  }
};


  const handleImageUpload = async () => {
    if (!image) return toast.error("Please select an image first");
    try {
      const updatedUser = await updateProfilePicture(image);
      setPreview(updatedUser.image);
      toast.success("Image updated");
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleAccountDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await deleteAccount();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold text-cyan-300 drop-shadow-[0_0_20px_#00ffcc]"
        >
          Settings
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          Manage your profile, upload a new avatar, or delete your account completely.
        </motion.p>

        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.3}
          scale={1.02}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          className="w-full mt-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="bg-white/10 border border-cyan-500 rounded-2xl px-8 py-6 text-base md:text-lg text-gray-200 backdrop-blur-lg shadow-[0_0_50px_#00ffff30]"
          >
            <div className="flex flex-col items-center gap-4">
              <img
                src={preview || "https://via.placeholder.com/150"}
                alt="profile"
                className="rounded-full w-32 h-32 object-cover border-2 border-cyan-400"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm"
              />
              <button
                onClick={handleImageUpload}
                className="mt-2 px-4 py-2 bg-yellow-500 text-black hover:bg-cyan-600  rounded"
              >
                Upload Image
              </button>
            </div>
          </motion.div>
        </Tilt>

        <motion.form
          onSubmit={handleProfileSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 w-full md:w-[90%] lg:w-[80%] bg-white/5 backdrop-blur-md border border-cyan-400 p-10 rounded-3xl shadow-[0_0_30px_#00ffff50] text-left space-y-6"
        >
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-300 rounded-md px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-300 rounded-md px-4 py-2 text-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-300 rounded-md px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-cyan-300 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-300 rounded-md px-4 py-2 text-white resize-none"
            />
          </div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md"
            >
              Update Profile
            </motion.button>
          </div>
        </motion.form>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAccountDelete}
          className="mt-10 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md"
        >
          Delete Account
        </motion.button>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 1 }}
          className="mt-16 text-sm text-gray-500"
        >
          Manage your personal information safely and securely — StudyFlux
        </motion.p>
      </div>
    </div>
  );
}
