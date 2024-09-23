import React from "react";
import { useNavigate } from "react-router-dom";
import frameImg from "../assets/Images/frame.png";

// Reusable InvestmentCard component
const InvestmentCard = ({ title, imgUrl, onClick, altText }) => {
  return (
    <div
      className="flex flex-col items-center text-center cursor-pointer group transition-transform transform hover:scale-105 mb-5 "
      onClick={onClick}
    >
      <div className="w-64 h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-lg shadow-lg overflow-hidden">
        <img
          src={imgUrl}
          alt={altText}
          className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-80"
          onError={(e) => (e.target.src = { frameImg })} // Placeholder image on error
        />
      </div>
      <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
};

const InvestmentOptions = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Invest with us...",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1Ol48s5GK8aeC0ilc-6e5hypRp0MQWKtvQ&s",
      onClick: () => navigate("/Projects"),
      altText: "Invest with Us",
    },
    {
      title: "Your Investment Security!",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXLv9FLSmKIoLo3jGdFdELKoR4ZYP3DuwvoQ&s",
      onClick: () => navigate("/security"),
      altText: "Investment Security",
    },
    {
      title: "Testimony",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_P5A4KNdYAXzNgwDgyR994qwi4ydsqQBBQ&s",
      onClick: () => navigate("/testimony"),
      altText: "Testimony",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center space-x-4 md:space-x-10 pt-20 py-10 ">
      {cardData.map((card, index) => (
        <InvestmentCard
          key={index}
          title={card.title}
          imgUrl={card.imgUrl}
          onClick={card.onClick}
          altText={card.altText}
        />
      ))}
    </div>
  );
};

export default InvestmentOptions;
