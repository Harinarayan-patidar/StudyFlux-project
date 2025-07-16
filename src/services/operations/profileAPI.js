import { apiConnector } from "../apiconnector";
import { ProfileDetails } from "../apis";
import toast from "react-hot-toast";

// ✅ Get logged-in user details
export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      throw new Error("Token is missing");
    }

    const response = await apiConnector(
      "GET",
      ProfileDetails.USER_DETAILS,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    toast.error("Failed to fetch user details");
    throw error;
  }
};

// ✅ Update profile data (about, dob, gender, contact)
export const updateUserProfile = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await apiConnector(
      "PUT",
      ProfileDetails.UPDATE_USER_PROFILE,
      formData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success(response?.data?.message || "Profile updated");
    return response?.data?.profileDetails;
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    toast.error("Failed to update profile");
    throw error;
  }
};

// ✅ Upload or replace profile picture
// import { apiConnector } from "../apiconnector";
// import { ProfileDetails } from "../apis";
// import toast from "react-hot-toast";

export const updateProfilePicture = async (imageFile) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await apiConnector(
      "PUT",
      ProfileDetails.UPDATE_DISPLAY_PICTURE,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    if (response?.data?.success) {
      toast.success(response.data.message || "Profile picture updated successfully");
      return response.data.data; // ✅ contains updated user object
    } else {
      throw new Error("Server did not confirm success");
    }
  } catch (error) {
    console.error("❌ Error updating profile picture:", error);
    toast.error("Failed to update profile picture");
    throw error;
  }
};


// ✅ Delete user account
export const deleteAccount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to delete your account");
      throw new Error("Unauthorized");
    }

    const response = await apiConnector(
      "DELETE",
      ProfileDetails.DELETE_PROFILE,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success(response?.data?.message || "Account deleted successfully");
    return response?.data;
  } catch (error) {
    console.error("❌ Error deleting account:", error);
    toast.error("Failed to delete account");
    throw error;
  }
};
