import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { sendOTP, signup } from "../services/operations/authAPI";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import Spinner from "../components/Spinner";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    await signup(
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate
    );
  };

  return (
    <div className="text-white flex items-center justify-center flex-col h-[calc(100vh-56px)]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-[330px] flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Verify Email</h1>
          <p className="mb-4 text-[13px] leading-1 text-[#9e9ea0]">
            A verification code has been sent to you. Enter the code below.
          </p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="text-white">-</span>}
              inputStyle={{
                width: "40px", // Adjust individual input width
                height: "40px", // Adjust individual input height
                margin: "0 5px", // Spacing between inputs
                fontSize: "18px", // Font size of the OTP digits
                borderRadius: "8px", // Slightly rounded corners for the input fields
                border: "1px solid #333", // A subtle border
                backgroundColor: "#161D29", // A darker background for the input fields
                color: "#F1F2F3", // Light text color for the OTP digits
              }}
              containerStyle={{
                justifyContent: "space-between", // Distribute inputs evenly
                margin: "20px 0", // Margin around the whole OTP input group
              }}
              renderInput={(props) => <input {...props} />} // Simplified renderInput
            />
            <button
              type="submit"
              className="w-full hover:bg-[#f4d744] active:scale-[0.95] transition-all duration-200 bg-[#FFD60A] text-richblack-900 mt-8 rounded-lg font-semibold text-xs p-3"
            >
              Verify Email
            </button>
          </form>

          <div className="flex mt-2 justify-between items-center">
            <Link
              className="flex text-richblack-25 justify-center items-center"
              to="/login"
            >
              <IoIosArrowRoundBack fontSize={25} />
              <p className="text-xs font-semibold">Back to login</p>
            </Link>

            <button
              className="flex gap-1 text-[#47A5C5] justify-center items-center"
              onClick={() => sendOTP(signupData.email, navigate)}
            >
              <FaClockRotateLeft fontSize={15} />
              <p className="text-xs font-semibold">Resend it</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;