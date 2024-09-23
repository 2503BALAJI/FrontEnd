import React from "react";
import Navbar from "../components/Navbar";

const ClientLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-[#f3f2f0] overflow-auto">
      {/* Include the Navbar */}
      <Navbar />

      {/* Content area with padding to avoid overlap with fixed navbar */}
      <div className="pt-20  bg-gray-100 h-full">
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
