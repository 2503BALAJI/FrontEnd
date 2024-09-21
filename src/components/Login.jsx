import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../Firebase/Firebaseconfig";

const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function passwordHandler() {
    setPassVisible(!passVisible);
  }

  async function submitHandler(event) {
    event.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Navigate to dashboard or home page on successful login
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Detailed error handling
      switch (error.code) {
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/user-not-found":
          setError("User not found.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        default:
          setError("Failed to log in. Please try again.");
          break;
      }
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
          <h2 className="font-bold text-2xl text-gray-800 mb-4">Sign In</h2>
          <p className="text-left mb-5 text-gray-600">
            Welcome back to Legacy Land Investment
          </p>

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

          <div className="text-right mt-2">
            <NavLink to="/forgotPass" className="text-blue-600">
              Forgot password?
            </NavLink>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md mt-6 hover:bg-blue-600 transition"
          >
            Sign In
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/SignUp")}
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
