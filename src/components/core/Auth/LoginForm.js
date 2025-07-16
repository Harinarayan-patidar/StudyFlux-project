import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
import { toast } from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password, navigate);
    } catch (err) {
      setError("Invalid email or password.");
      toast.error("Invalid email or password.");
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 w-full max-w-md flex flex-col gap-y-5"
    >
      {/* Email Field */}
      <label className="w-full">
        <p className="mb-1 text-sm text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-md bg-richblack-800 p-3 text-sm text-richblack-5 outline-none"
        />
      </label>

      {/* Password Field */}
      <label className="w-full relative">
        <p className="mb-1 text-sm text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-md bg-richblack-800 p-3 pr-12 text-sm text-richblack-5 outline-none"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[39px] z-10 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={22} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 text-xs text-blue-100 text-right">Forgot Password?</p>
        </Link>
      </label>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 rounded-md bg-yellow-50 py-2 px-4 font-medium text-richblack-900 hover:bg-yellow-100 transition"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
