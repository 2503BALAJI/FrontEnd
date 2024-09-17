import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const ClientLayout = ({ children }) => {
  return (
    <div className="w-screen bg-[#f3f2f0]">
      {/* Include the Navbar */}
      <Navbar />

      {/* Add a top padding equivalent to the navbar height */}
      <div className="pt-16 min-h-screen bg-gray-100">{children}</div>
    </div>
  );
};

export default ClientLayout;
