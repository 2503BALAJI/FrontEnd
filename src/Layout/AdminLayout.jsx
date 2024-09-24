import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", link: "/admin/Dashboard" },
    { name: "Add Video", link: "/admin/AdminPanelVideo" },
    { name: "Add Project", link: "/admin/Project" },
    { name: "Add Question", link: "/admin/Questions" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 md:justify-center">
          <div className="text-2xl font-bold">Admin Dashboard</div>
          <button
            className="text-white md:hidden"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
        </div>
        <ul className="space-y-4 p-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        {/* Header with Hamburger Menu */}
        <header className="p-4 bg-white shadow-md md:hidden flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 focus:outline-none"
            aria-label="Open sidebar"
          >
            <FiMenu size={24} />
          </button>
          <div className="text-xl font-semibold">Admin Dashboard</div>
        </header>

        {/* Adjusted Main Content Area */}
        <main className="flex-1 p-6 bg-white overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
