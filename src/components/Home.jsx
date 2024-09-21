import React from "react";
import Mainimg from "../assets/Images/homeimmg.png";
import Vision from "./Vision";
import InvestmentOptions from "./InvestmentOptions";
import Contact_us from "./Contact_us";

const Home = () => {
  return (
    <>
      <div className="relative w-full h-[calc(100vh-64px)]">
        {/* Background Image */}
        <img
          src={Mainimg}
          alt="Main"
          className="w-full h-full object-cover"
          id="home"
        />

        {/* Text overlay on Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 text-white p-6 md:p-10 rounded-lg max-w-xl text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 overflow-hidden">
              Unlock Unparalleled Growth Potential
            </h1>
            <p className="text-sm md:text-lg leading-relaxed">
              Discover innovative solutions designed to revolutionize the real
              estate market and maximize your returns.
            </p>
          </div>
        </div>

        {/* Main Section */}
        
        <Vision />
        <InvestmentOptions />
        <Contact_us />

        
      </div>
    </>
  );
};

export default Home;
