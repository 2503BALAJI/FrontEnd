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
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 sm:p-8 lg:p-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-10">
        User Management
      </h1>

      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-24 w-24 sm:h-32 sm:w-32"></div>
        </div>
      ) : usersData.length > 0 ? (
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
          {/* Display as table for medium and larger devices */}
          <div className="hidden md:block">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
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
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-md shadow-sm transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Display as cards for small devices */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex flex-col space-y-2">
                  <div className="text-gray-700">
                    <span className="font-semibold">First Name: </span>
                    {user.firstName || "N/A"}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Last Name: </span>
                    {user.lastName || "N/A"}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Email: </span>
                    {user.email || "N/A"}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Phone Number: </span>
                    {user.phoneNumber || "N/A"}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Account Created: </span>
                    {user.createdAt
                      ? new Date(
                          user.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-md shadow-sm transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 w-full mt-8">
          No user data available.
        </p>
      )}
    </div>
  );
};

export default AdminPanel;
