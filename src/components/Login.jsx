import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase/Firebaseconfig";
import { useSetAtom } from "jotai";
import { userAtom } from "../store"; // Adjust the import based on your file structure
import Cookies from "js-cookie"; // Add js-cookie package

const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const [passVisible, setPassVisible] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedUid = Cookies.get("userUid");
    if (savedUid) {
      // If the user is already logged in, navigate to profile
      navigate("/profile");
    }
  }, [navigate]);

  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const passwordHandler = () => {
    setPassVisible(!passVisible);
  };

  const submitHandler = async (event) => {
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
      const user = userCredential.user;

      // Store user uid and email in cookies
      Cookies.set("userUid", user.uid, { expires: 7 });
      Cookies.set("userEmail", formData.email, { expires: 7 });

      // Update state with user data
      setUser({ uid: user.uid, email: formData.email });

      // Navigate to profile page on successful login
      navigate("/profile", { replace: true });
    } catch (error) {
      handleAuthError(error.code);
    }
  };

  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/user-not-found":
        setError("User not found. Please check your email.");
        break;
      case "auth/invalid-email":
        setError("Invalid email address. Please enter a valid email.");
        break;
      case "auth/too-many-requests":
        setError("Too many failed attempts. Please try again later.");
        break;
      default:
        setError("Failed to log in. Please try again.");
        break;
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

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md mt-6 hover:bg-blue-600 transition"
          >
            Sign In
          </button>

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
