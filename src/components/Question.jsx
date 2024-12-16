import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for making HTTP requests

const Question = () => {
  const [questions, setQuestions] = useState([]); // State to store questions
  const [openIndex, setOpenIndex] = useState(null); // Track which question is open

  useEffect(() => {
    // Fetching data from Flask API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/questions");
        if (response.data.success) {
          setQuestions(response.data.data); // Set questions from API response
        } else {
          console.error("Failed to fetch questions: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open state
  };

  return (
    <div
      className="w-11/12 mb-5 mx-auto h-full my-4 p-6 bg-white rounded-xl shadow-md"
      id={"question"}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 overflow-hidden">
        Your Questions, Our Answers
      </h2>

      {/* Map function to iterate over questions */}
      {questions.map((faq, index) => (
        <div
          key={faq._id} // Use _id as key from API response
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
              className={`h-5 w-5 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
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
