import { ACCOUNT_TYPE } from "../../../utils/constants";

import { useState } from "react";

import { toast } from "react-hot-toast";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { sendOTP } from "../../../services/operations/authAPI";

import { setSignupData } from "../../../Slices/authSlice";

import Tab from "../../Common/tab";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(
    ACCOUNT_TYPE.STUDENT
  );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log("================================");
    console.log("📝 SIGNUP FORM SUBMITTED");
    console.log("================================");

    // Prevent duplicate requests
    if (isSubmitting) {
      console.log(
        "⚠️ Submission already in progress"
      );

      return;
    }

    // Password validation
    if (password !== confirmPassword) {
      console.log("❌ Passwords do not match");

      toast.error("Passwords Do Not Match");

      return;
    }

    // Build signup data
    const signupData = {
      ...formData,

      email: formData.email
        .trim()
        .toLowerCase(),

      firstName: formData.firstName.trim(),

      lastName: formData.lastName.trim(),

      accountType,
    };

    console.log("📦 Signup data prepared:", {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      accountType: signupData.accountType,
    });

    try {
      setIsSubmitting(true);

      // Save signup data in Redux
      console.log(
        "💾 Saving signup data to Redux..."
      );

      dispatch(
        setSignupData(signupData)
      );

      console.log(
        "✅ Signup data saved to Redux"
      );

      /*
        IMPORTANT:
        sendOTP is a normal async function.

        Correct:
        await sendOTP(...)

        Wrong:
        dispatch(sendOTP(...))
      */

      console.log("📤 Calling sendOTP...");

      const success = await sendOTP(
        signupData.email,
        navigate
      );

      console.log(
        "📨 sendOTP result:",
        success
      );

      if (!success) {
        console.log(
          "❌ OTP sending failed"
        );

        return;
      }

      console.log(
        "🎉 OTP flow completed successfully"
      );

      /*
        Do NOT clear form here.

        Why?
        The component navigates to /verify-email.

        Keeping data untouched is safer if
        navigation fails for some reason.
      */
    } catch (error) {
      console.error(
        "❌ Signup form submission error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);

      console.log(
        "🏁 Signup submission finished"
      );

      console.log("================================");
    }
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },

    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="w-full">
      {/* Account Type Tab */}

      <Tab
        tabData={tabData}
        field={accountType}
        setField={setAccountType}
      />

      {/* Signup Form */}

      <form
        onSubmit={handleOnSubmit}
        className="flex w-full flex-col gap-y-4"
      >
        {/* First & Last Name */}

        <div className="flex flex-col gap-4 md:flex-row">
          <label className="w-full">
            <p className="mb-1 text-sm text-richblack-5">
              First Name{" "}

              <sup className="text-pink-200">
                *
              </sup>
            </p>

            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              disabled={isSubmitting}
              className="
                w-full
                rounded-md
                bg-richblack-800
                p-3
                text-richblack-5
                shadow-inner
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </label>

          <label className="w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Last Name{" "}

              <sup className="text-pink-200">
                *
              </sup>
            </p>

            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              disabled={isSubmitting}
              className="
                w-full
                rounded-md
                bg-richblack-800
                p-3
                text-richblack-5
                shadow-inner
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </label>
        </div>

        {/* Email */}

        <label className="w-full">
          <p className="mb-1 text-sm text-richblack-5">
            Email Address{" "}

            <sup className="text-pink-200">
              *
            </sup>
          </p>

          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            disabled={isSubmitting}
            className="
              w-full
              rounded-md
              bg-richblack-800
              p-3
              text-richblack-5
              shadow-inner
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </label>

        {/* Passwords */}

        <div className="flex flex-col gap-4 md:flex-row">
          {/* Password */}

          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Create Password{" "}

              <sup className="text-pink-200">
                *
              </sup>
            </p>

            <input
              required
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              disabled={isSubmitting}
              className="
                w-full
                rounded-md
                bg-richblack-800
                p-3
                pr-10
                text-richblack-5
                shadow-inner
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              disabled={isSubmitting}
              className="
                absolute
                right-3
                top-[38px]
                cursor-pointer
                disabled:cursor-not-allowed
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={24}
                  fill="#AFB2BF"
                />
              ) : (
                <AiOutlineEye
                  fontSize={24}
                  fill="#AFB2BF"
                />
              )}
            </button>
          </label>

          {/* Confirm Password */}

          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Confirm Password{" "}

              <sup className="text-pink-200">
                *
              </sup>
            </p>

            <input
              required
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              disabled={isSubmitting}
              className="
                w-full
                rounded-md
                bg-richblack-800
                p-3
                pr-10
                text-richblack-5
                shadow-inner
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              disabled={isSubmitting}
              className="
                absolute
                right-3
                top-[38px]
                cursor-pointer
                disabled:cursor-not-allowed
              "
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={24}
                  fill="#AFB2BF"
                />
              ) : (
                <AiOutlineEye
                  fontSize={24}
                  fill="#AFB2BF"
                />
              )}
            </button>
          </label>
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            mt-6
            rounded-md
            bg-yellow-50
            px-4
            py-2
            font-medium
            text-richblack-900
            transition
            hover:bg-yellow-200
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting
            ? "Sending OTP..."
            : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;