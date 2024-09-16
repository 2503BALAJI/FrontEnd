import React from "react";
import Mainimg from "../assets/Images/homeimmg.png";

const Home = () => {
  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      <img src={Mainimg} alt="Main" className="w-full h-full object-cover" />
      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 text-white p-4 md:p-8 rounded-lg max-w-2xl text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Unlock Unparalleled Growth Potential
          </h1>
          <p className="text-sm md:text-lg leading-relaxed">
            With our innovative solutions, designed to revolutionize the market
            and maximize your returns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
