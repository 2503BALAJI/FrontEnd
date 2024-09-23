import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        {/* Animated 404 Text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-800 animate-bounce">404</h1>
          <svg
            className="absolute top-0 left-0 w-full h-full text-gray-300"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M41.5,-41.4C54.5,-27.8,65.1,-13.9,66.7,1.7C68.3,17.4,60.8,34.7,47.8,46.3C34.7,57.8,17.4,63.7,0.2,63.5C-17.1,63.3,-34.1,56.9,-44.9,45.3C-55.6,33.6,-60.2,16.8,-60.1,-0.2C-60,-17.3,-55.2,-34.6,-44.5,-48.2C-33.9,-61.8,-17,-71.8,-1,-70.8C15.1,-69.8,30.1,-57.9,41.5,-41.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        
        {/* Error Message */}
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mt-6">
          Oops! Page not found
        </p>
        <p className="text-gray-500 mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:-translate-y-1"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
