import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(false);
  const [error, setError] = useState(""); // Track error messages

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Check if the user is already logged in
  useEffect(() => {
    const savedUid = Cookies.get("userUid");
    if (savedUid) {
      navigate("/profile");
    }
  }, [navigate]);

  // Handle form field changes
  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // Toggle password visibility
  const passwordHandler = () => {
    setPassVisible(!passVisible);
  };

  // Handle form submission
  const submitHandler = async (event) => {
    event.preventDefault();
    setError(""); // Reset the error state
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", formData);
      const { success, uid, message } = response.data;
  
      if (success) {
        // Store user information in cookies
        Cookies.set("userUid", uid, { expires: 7 });
        Cookies.set("userEmail", formData.email, { expires: 7 });
        navigate("/profile", { replace: true });
      } else {
        setError(message || "Failed to log in. Please try again.");
      }
    } catch (error) {
      // Check if the error has a response with status and message
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message || "Invalid email or password.");
      } else {
        setError("An error occurred while logging in. Please try again later.");
      }
    }
  };
  

  return (
    <form onSubmit={submitHandler}>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
          <h2 className="font-bold text-2xl text-gray-800 mb-4">Sign In</h2>
          <p className="text-left mb-5 text-gray-600">
            Welcome back to Legacy Land Investment
          </p>

          {/* Email Input */}
          <label className="w-full">
            <p className="text-sm text-gray-700 mb-2">
              Email Address <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="email"
              value={formData.email}
              name="email"
              placeholder="Enter Email Address"
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 mb-4"
            />
          </label>

          {/* Password Input */}
          <label className="w-full">
            <p className="text-sm text-gray-700 mb-2">
              Password <sup className="text-red-500">*</sup>
            </p>
            <div className="relative">
              <input
                required
                type={passVisible ? "text" : "password"}
                value={formData.password}
                name="password"
                placeholder="Enter Password"
                onChange={changeHandler}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
              <span
                onClick={passwordHandler}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {passVisible ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </label>

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <NavLink to="/forgotPass" className="text-blue-600">
              Forgot password?
            </NavLink>
          </div>

          {/* Display Error Message */}
          {error && (
            <p className="text-red-500 mt-4 bg-red-100 p-2 rounded-md text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md mt-6 hover:bg-blue-600 transition"
          >
            Sign In
          </button>

          {/* Redirect to Signup */}
          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
