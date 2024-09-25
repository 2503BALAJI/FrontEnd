import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../Firebase/Firebaseconfig";

const auth = getAuth(app);

const ForgotPass = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // First attempt to sign in with the email (without password to check if the email exists)
      await signInWithEmailAndPassword(auth, formData.email, "dummyPassword");
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        // If wrong password, email exists and proceed with sending reset email
        try {
          await sendPasswordResetEmail(auth, formData.email);
          setSuccess(
            "Password reset email sent successfully. Check your inbox!"
          );
        } catch (resetError) {
          setError("Failed to send reset email. Please try again.");
        }
      } else {
        setError("Email not registered. Please check your email address.");
      }
    }

    setLoading(false);
  };

  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Re-create your password for Legacy Land Investment.
        </p>

        {/* Email Input */}
        <label className="block mb-4">
          <span className="text-gray-700">Email Address</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            required
            placeholder="Enter your email address"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
          />
        </label>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={() => navigate("/Login")}
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
