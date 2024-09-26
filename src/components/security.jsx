import React from 'react';
import { motion } from 'framer-motion'; // Animation library for React

const Security = () => {
  return (
    <div className="h-[90%] flex items-center justify-center bg-gray-100">
      {/* Container for the content */}
      <motion.div
        className="w-11/12 sm:w-2/3 lg:w-1/2 bg-white shadow-lg rounded-lg text-center p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Icon or Image placeholder */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
        >
          <svg
            className="w-20 h-20 text-blue-500 mx-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
            />
          </svg>
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Advanced Security Features
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Our team is working hard to implement advanced security measures to ensure your investments are always safe and secure. Stay tuned for updates!
        </p>

        {/* Coming Soon Animation */}
        <motion.div
          className="bg-blue-500 text-white px-6 py-2 inline-block rounded-full shadow-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          Coming Soon...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Security;
