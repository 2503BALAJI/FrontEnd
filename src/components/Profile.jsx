import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebaseconfig";
import { userAtom } from "../store";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import {  useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userUid = Cookies.get("userUid");
  const [user, setUser] = useAtom(userAtom);

  if (user === "out") {
    navigate("/login", { replace: true });
  }
  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "clientdata", userUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userUid]);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">User Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={userData.ProfileUrl}
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
          <strong>Address:</strong> {userData.Address}
        </p>
        <p>
          <strong>Aadhar Number:</strong> {userData.AadharNumber}
        </p>
      </div>

      {/* Aadhar Card Images */}
      <h2 className="text-xl font-semibold mb-2">Aadhar Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={userData.AadharCardFortUrl}
            alt="Aadhar Card Front"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Aadhar Card Front</h2>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={userData.AadharCardBackendUrl}
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
