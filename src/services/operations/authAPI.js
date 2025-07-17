import {apiConnector} from '../apiconnector';
import { Authentication } from "../apis";
import { toast } from "react-hot-toast";

import { isTokenExpired } from "../autoDeleteToken"; // Import your token expiration utility


// Extract the API endpoints
const { SIGNUP_API, LOGIN_API, SEND_OTP_API,
     RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API } = Authentication;

// const {USER_DETAILS } = ProfileDetails;

// Sending OTP
export const sendOTP = async (email, navigate) => {
    try {
        // Start loading
        toast.loading("Sending OTP...");
        console.log("Sending OTP to email:", email);

        const response = await apiConnector("POST", SEND_OTP_API, {
            email, checkUserPresent: true
        });

        // Close loading and handle response
        toast.dismiss();

        if (!response) {
            console.log("OTP is not sent");
            toast.error("Failed to send OTP");
        } else {
            console.log("send OTP API response is:", response);
            toast.success("OTP sent successfully");
               // ✅ Redirect to OTP screen
                navigate("/verify-email")
                
        }
    } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Error sending OTP");
    }
};

// Signup function
export const signup = async (accountType, firstName, lastName, email, password,
    confirmPassword, otp, navigate) => {
    try {
        // Start loading
        toast.loading("Signing up...");

        const response = await apiConnector("POST", SIGNUP_API, {
            email, password, confirmPassword, otp, firstName, lastName, accountType
        });

        // Close loading and handle response
        toast.dismiss();

        if (!response) {
            console.log("Signup API response not found");
            toast.error("Signup failed");
            return { success: false };
        }

        console.log("SIGNUP API response:", response);
        toast.success("Signup successful");
        navigate("/login");
    } catch (error) {
        console.log("SIGNUP API ERROR:", error);
        toast.error("Signup failed");
        navigate("/signup");
    }
};

// Login function
export const login = async (email, password, navigate, dispatch) => {
    try {
        // Start loading
        const token = localStorage.getItem("token");
if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.error("Session expired, please log in again.");
    navigate("/login");
}

      console.log("Token in login function:", token); // Check the token value
      
     // jjdjhdj

        toast.loading("Logging in...");

        const response = await apiConnector("POST", LOGIN_API, { email, password });
        toast.dismiss();

        if (!response) {
            console.log("Login API response not found");
            toast.error("Login failed");
            return { success: false };
        }

        

        // const userImage = response.data?.user?.image
        //     ? response.data.user.image
        //     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

        // Dispatch user data and token (assuming you're using Redux)
      //   dispatch(setUser({ ...response.data.user, image: userImage }));
        localStorage.setItem("token", response.data.token); 
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("Login successful");
        console.log("✅ Navigating to /dashboard/my-profile");
        navigate("/dashboard/my-profile");
    

    } catch (error) {
        toast.error("Login failed");
        console.log("LOGIN API ERROR:", error);
    }
};

// Logout function
export const logout = (navigate, dispatch) => {
    return (dispatch) => {
      //   dispatch(setToken(null));
      //   dispatch(setUser(null));
      //   dispatch(resetCart());

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out");
        navigate("/");
    };
};

// Get Password Reset Token
export const getPasswordRestToken = async (email, setEmailSent) => {
    try {
        // Start loading
        toast.loading("Sending reset password email...");

        const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, { email });

        // Close loading
        toast.dismiss();

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Reset email sent");
        setEmailSent(true);
    } catch (error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Failed to send email for resetting password");
    }
};

// Reset Password function
export const resetPassword = async (password, confirmPassword, token) => {
    try {
        // Start loading
        toast.loading("Resetting password...");

        const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

        // Close loading
        toast.dismiss();

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Password reset successfully");
    } catch (error) {
        console.log("RESET PASSWORD Error", error);
        toast.error("Unable to reset password");
    }
};


