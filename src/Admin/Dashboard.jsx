import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebaseconfig"; // Adjust import based on your Firebase config location
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const AdminPanel = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clientdata"));
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsersData(fetchedUsers);
      } catch (error) {
        console.error("Error fetching client data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "clientdata", id));
      setUsersData(usersData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  return (
    <div className="min-h-screen py-10 px-6 flex flex-col items-center">
      <h1 className="text-4xl text-center font-bold text-gray-900 mb-10">
        User Data
      </h1>

      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : usersData.length > 0 ? (
        <div className="w-full max-w-5xl">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 text-gray-800 border">First Name</th>
                <th className="py-2 text-gray-800 border">Last Name</th>
                <th className="py-2 text-gray-800 border">Email</th>
                <th className="py-2 text-gray-800 border">Phone Number</th>
                <th className="py-2 text-gray-800 border">Account Created</th>
                <th className="py-2 text-gray-800 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 text-center text-gray-600 border">
                    {user.firstName || "N/A"}
                  </td>
                  <td className="py-2 text-center text-gray-600 border">
                    {user.lastName || "N/A"}
                  </td>
                  <td className="py-2 text-center text-gray-600 border">
                    {user.email || "N/A"}
                  </td>
                  <td className="py-2 text-center text-gray-600 border">
                    {user.phoneNumber || "N/A"}
                  </td>
                  <td className="py-2 text-center text-gray-600 border">
                    {user.createdAt
                      ? new Date(
                          user.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-2 text-center text-gray-600 border">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 w-full">
          No user data available.
        </p>
      )}
    </div>
  );
};

export default AdminPanel;
