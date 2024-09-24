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
    <div className="min-h-screen py-10 px-6 flex flex-col items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        User Management
      </h1>

      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-32 w-32"></div>
        </div>
      ) : usersData.length > 0 ? (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">
                  First Name
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">
                  Last Name
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">
                  Phone Number
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">
                  Account Created
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700 border-b">
                    {user.firstName || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b">
                    {user.lastName || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b">
                    {user.email || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b">
                    {user.phoneNumber || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b">
                    {user.createdAt
                      ? new Date(
                          user.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-md shadow-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-4 py-2 rounded-md text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
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
