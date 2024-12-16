import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";

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
    address: "",
    aadharNumber: "",
    aadharCardFront: null,  // Changed to file
    aadharCardBack: null,   //Changed to file
    profilePicture: null,   // Changed to file
  });

  function changeHandler(event) {
    const { name, value, files } = event.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Assign file if present, otherwise assign value
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
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post("http://127.0.0.1:5000/signup", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        navigate("/", { replace: true });
      } else {
        setError(response.data.message || "Failed to register. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="h-full py-1 mt-36 flex items-center justify-center bg-gray-100"
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
              value={formData.aadharNumber}
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
              name="aadharCardFront"
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
              name="aadharCardBack" 
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
               name="profilePicture"
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
