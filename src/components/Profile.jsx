import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userUid = Cookies.get("userUid");

  useEffect(() => {
    if (!userUid) {
      navigate("/login", { replace: true });
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/profile?uid=${userUid}`);
          if (response.data.success) {
            setUserData(response.data.data);
          } else {
            console.error("Failed to fetch user data:", response.data.message);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [userUid, navigate]);

  if (loading) return <div className="text-center">Loading...</div>;

  if (!userData) return <div className="text-center">User data not found!</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">User Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={userData.profilePictureUrl}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
        />
      </div>

      {/* User Information */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p>
          <strong>First Name:</strong> {userData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {userData.lastName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {userData.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {userData.address}
        </p>
        <p>
          <strong>Aadhar Number:</strong> {userData.aadharNumber}
        </p>
      </div>

      {/* Aadhar Card Images */}
      <h2 className="text-xl font-semibold mb-2">Aadhar Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={userData.aadharCardFrontUrl}
            alt="Aadhar Card Front"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Aadhar Card Front</h2>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={userData.aadharCardBackUrl}
            alt="Aadhar Card Back"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Aadhar Card Back</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
