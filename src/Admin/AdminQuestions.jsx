import React, { useState, useEffect } from "react";

// Question Form Component
const QuestionForm = ({ onAddQuestion }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddQuestion = () => {
    if (newQuestion && newAnswer) {
      onAddQuestion(newQuestion, newAnswer);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold text-gray-800">Add New Question</h2>
      <input
        type="text"
        placeholder="Question"
        className="mt-2 p-2 border rounded w-full"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        className="mt-2 p-2 border rounded w-full"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
      />
      <button
        onClick={handleAddQuestion}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>
    </div>
  );
};

// Question Item Component
const QuestionItem = ({ question, onEdit, onDelete, editing, onSave, onCancel }) => {
  const [editQuestion, setEditQuestion] = useState(question.question);
  const [editAnswer, setEditAnswer] = useState(question.answer);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {editing === question._id ? (
        <div>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
          />
          <button
            onClick={() => onSave(question._id, editQuestion, editAnswer)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {question.question}
          </h2>
          <p className="text-gray-600 mt-2">{question.answer}</p>
          <button
            onClick={() => onEdit(question._id)}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(question._id)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

// Main Admin Panel Component
const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // Fetch questions from Flask API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/questions");
        const data = await response.json();
        if (data.success) {
          setQuestions(data.data);
        } else {
          console.error("Error fetching questions:", data.message);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Add a new question via Flask API
  const handleAddQuestion = async (newQuestion, newAnswer) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      const data = await response.json();
      if (data.success) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          { id: data._id, question: newQuestion, answer: newAnswer },
        ]);
      } else {
        console.error("Error adding question:", data.message);
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Update an existing question via Flask API
  const handleUpdateQuestion = async (id, question, answer) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });
      const data = await response.json();
      if (data.success) {
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q._id === id ? { ...q, question, answer } : q
          )
        );
        setEditing(null);
      } else {
        console.error("Error updating question:", data.message);
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  // Delete a question via Flask API
  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/questions/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question._id !== id)
        );
      } else {
        console.error("Error deleting question:", data.message);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-10 px-6">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
        Admin Panel - Questions & Answers
      </h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <div className="grid grid-cols-1 gap-8">
        {questions.map((question) => (
          <QuestionItem
            key={question._id}
            question={question}
            onEdit={(id) => setEditing(id)}
            onDelete={handleDeleteQuestion}
            editing={editing}
            onSave={handleUpdateQuestion}
            onCancel={() => setEditing(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminQuestions;
