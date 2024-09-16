import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Contact_us from "./components/Contact_us";
import About_us from "./components/About_us";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import Projects from "./components/Projects";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen bg-[#f3f2f0]">
      {/* Include the Navbar */}
      <Navbar />

      {/* Add a top padding equivalent to the navbar height */}
      <div className="pt-16 min-h-screen bg-gray-100">
        {" "}
        {/* pt-16 ensures there's enough space below the fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact_us />} />
          <Route path="/about" element={<About_us />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/Project" element={<Projects />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
