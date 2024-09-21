import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { app } from "../Firebase/Firebaseconfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = () => {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with first name and last name
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Save user data to Firestore under collection 'clientdata'
      const userDoc = doc(db, "clientdata", userCredential.user.uid);
      await setDoc(userDoc, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        uid: userCredential.user.uid,
      });

      // Redirect to login page or another screen
      navigate("/", { replace: true });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use!");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak!");
      } else {
        setError("Failed to register. Please try again.");
      }
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="h-full py-1 flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white rounded-lg shadow-lg px-4 py-2 w-full max-w-lg md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Sign Up</h2>
        <p className="mb-4 text-gray-600">
          Create your account for Legacy Land Investment.
        </p>

        <div className="flex gap-4">
          <label className="block mb-2">
            <span className="text-gray-600">
              First Name <sup className="text-pink-500">*</sup>
            </span>
            <input
              required
              type="text"
              value={formData.firstName}
              name="firstName"
              placeholder="Enter First Name"
              onChange={changeHandler}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
          </label>

          {/* Last Name */}
          <label className="block mb-3">
            <span className="text-gray-600">
              Last Name <sup className="text-pink-500">*</sup>
            </span>
            <input
              required
              type="text"
              value={formData.lastName}
              name="lastName"
              placeholder="Enter Last Name"
              onChange={changeHandler}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
          </label>
        </div>
        {/* First Name */}

        {/* Email */}
        <label className="block mb-3">
          <span className="text-gray-600">
            Email Address <sup className="text-pink-500">*</sup>
          </span>
          <input
            required
            type="email"
            value={formData.email}
            name="email"
            placeholder="Enter Email Address"
            onChange={changeHandler}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </label>

        {/* Password and Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <label className="block">
            <span className="text-gray-600">
              Password <sup className="text-pink-500">*</sup>
            </span>
            <div className="relative">
              <input
                required
                type={passVisible ? "text" : "password"}
                value={formData.password}
                name="password"
                placeholder="Enter Password"
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
              <span
                onClick={passwordHandler}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {passVisible ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </label>

          <label className="block">
            <span className="text-gray-600">
              Confirm Password <sup className="text-pink-500">*</sup>
            </span>
            <div className="relative">
              <input
                required
                type={passVisible ? "text" : "password"}
                value={formData.confirmPassword}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
              <span
                onClick={passwordHandler}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {passVisible ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </label>
        </div>

        {/* Phone Number */}
        <label className="block mb-3">
          <span className="text-gray-600">
            Phone Number <sup className="text-pink-500">*</sup>
          </span>
          <input
            required
            type="tel"
            value={formData.phoneNumber}
            name="phoneNumber"
            placeholder="Enter Phone Number"
            onChange={changeHandler}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </label>

        {/* Terms and Conditions */}
        <label className="flex items-center mb-2">
          <input type="checkbox" required className="mr-2" />
          <span className="text-gray-600">
            I agree to the Terms and Conditions
          </span>
        </label>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition"
        >
          Sign Up
        </button>

        <div className="mt-2 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="block h-px bg-gray-300 w-full"></span>
            <span className="px-4 text-gray-500">OR</span>
            <span className="block h-px bg-gray-300 w-full"></span>
          </div>
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/Login", { replace: true })}
              className="text-indigo-500 underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
