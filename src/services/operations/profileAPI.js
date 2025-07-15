import { apiConnector } from "../apiconnector"; // adjust path as needed
import { ProfileDetails } from "../apis";         // adjust path as needed

export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token"); // or from cookies/context/etc.
    console.log("Token from localStorage:", token);
    if (!token) {
      throw new Error("Token is missing. Please log in.");
    }

    const response = await apiConnector(
      "GET",
      ProfileDetails.USER_DETAILS,
      null,
      {
        Authorization: `Bearer ${token}`, // send token in header
      }
    );

    return response?.data;
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    throw error;
  }
};
