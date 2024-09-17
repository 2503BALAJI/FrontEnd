import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white h-screen p-5">
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <ul className="space-y-4">
          <li>
            <a
              href="#home"
              className="hover:bg-gray-700 block py-2 px-4 rounded"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:bg-gray-700 block py-2 px-4 rounded"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#reports"
              className="hover:bg-gray-700 block py-2 px-4 rounded"
            >
              Reports
            </a>
          </li>
          <li>
            <a
              href="#settings"
              className="hover:bg-gray-700 block py-2 px-4 rounded"
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold mb-8">
          Welcome to the Dashboard
        </h1>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold">Total Projects</h2>
            <p className="mt-4 text-2xl">24</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold">Active Users</h2>
            <p className="mt-4 text-2xl">15</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold">Pending Tasks</h2>
            <p className="mt-4 text-2xl">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
