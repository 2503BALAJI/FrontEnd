import React, { useState } from 'react';
import FaqData from './FaqData'; // Assuming your FaqData is structured as before

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track which question is open

  const toggleQuestion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if already open
    } else {
      setOpenIndex(index); // Open the clicked question
    }
  };

  return (
<div 
  className="w-11/12 mb-5 mx-auto p-6 bg-white rounded-xl shadow-md"
  id={"question"}
>
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 overflow-hidden">
    Your Questions, Our Answers
  </h2>

  {/* Map function to iterate over FAQ data */}
  {FaqData.map((faq, index) => (
    <div 
      key={index} 
      className="border rounded-lg mb-4 w-full sm:w-[90%] md:w-[75%] lg:w-[800px] mx-auto"
    >
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-md"
        onClick={() => toggleQuestion(index)}
      >
        {/* Question text */}
        <span className="text-base md:text-lg font-semibold">
          {faq.question}
        </span>

        {/* Dropdown arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Answer section shown when question is open */}
      {openIndex === index && (
        <div className="p-4 bg-gray-50 text-gray-700">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  ))}
</div>

  );
};

export default Question;
