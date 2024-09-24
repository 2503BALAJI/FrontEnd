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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

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
    Address: "",
    AadharNumber: "",
    AadharCardFortUrl: null, // Changed to null for file
    AadharCardBackendUrl: null, // Changed to null for file
    ProfileUrl: null, // Changed to null for file
  });

  function changeHandler(event) {
    if (event.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.files[0], // Handle file input
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    }
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

      // Upload files and get download URLs
      const AadharCardFortUrl = await uploadFile(formData.AadharCardFortUrl, `aadhar_front/${userCredential.user.uid}`);
      const AadharCardBackendUrl = await uploadFile(formData.AadharCardBackendUrl, `aadhar_back/${userCredential.user.uid}`);
      const ProfileUrl = await uploadFile(formData.ProfileUrl, `profile/${userCredential.user.uid}`);

      // Save user data to Firestore under collection 'clientdata'
      const userDoc = doc(db, "clientdata", userCredential.user.uid);
      await setDoc(userDoc, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        uid: userCredential.user.uid,
        Address: formData.Address,
        AadharNumber: formData.AadharNumber,
        AadharCardFortUrl,
        AadharCardBackendUrl,
        ProfileUrl,
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

  const uploadFile = async (file, path) => {
    if (!file) return null;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="h-full  py-1 mt-36 flex items-center justify-center bg-gray-100"
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
              className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
            />
          </label>

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
              className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
            />
          </label>
        </div>

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
            className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
          />
        </label>

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
                className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
              />
              <span
                onClick={passwordHandler}
                className="absolute right-3 top-3 cursor-pointer pt-1"
              >
                {passVisible ? <IoEye /> : <IoEyeOff />}
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
                className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
              />
              <span
                onClick={passwordHandler}
                className="absolute right-3 top-3 cursor-pointer pt-1"
              >
                {passVisible ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </label>
        </div>

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
            className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
          />
        </label>

        {/* Address */}
        <label className="block mb-3">
          <span className="text-gray-600">Address</span>
          <input
            type="text"
            value={formData.Address}
            name="Address"
            placeholder="Enter Address"
            onChange={changeHandler}
            className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
          />
        </label>

        {/* Aadhar Number */}
        <label className="block mb-3">
          <span className="text-gray-600">Aadhar Number</span>
          <input
            type="text"
            value={formData.AadharNumber}
            name="AadharNumber"
            placeholder="Enter Aadhar Number"
            onChange={changeHandler}
            className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
          />
        </label>

        {/* Aadhar Card Front URL */}
        <label className="block mb-3">
          <span className="text-gray-600">Aadhar Card Front</span>
          <input
            type="file"
            accept="image/*"
            name="AadharCardFortUrl"
            onChange={changeHandler}
            className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
          />
        </label>

        {/* Aadhar Card Back URL */}
        <label className="block mb-3">
          <span className="text-gray-600">Aadhar Card Back</span>
          <input
            type="file"
            accept="image/*"
            name="AadharCardBackendUrl"
            onChange={changeHandler}
            className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
          />
        </label>

        {/* Profile URL */}
        <label className="block mb-3">
          <span className="text-gray-600">Profile Picture</span>
          <input
            type="file"
            accept="image/*"
            name="ProfileUrl"
            onChange={changeHandler}
            className="mt-1 w-full border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md p-2"
          />
        </label>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
