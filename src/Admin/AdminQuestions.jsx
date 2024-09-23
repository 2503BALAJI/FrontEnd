import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebaseconfig"; // Import your Firebase config
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editing, setEditing] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  useEffect(() => {
    // Fetching data from Firebase Firestore
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      const questionsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsList);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const handleAddQuestion = async () => {
    if (newQuestion && newAnswer) {
      await addDoc(collection(db, "questions"), {
        question: newQuestion,
        answer: newAnswer,
      });
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const handleUpdateQuestion = async (id) => {
    const questionDoc = doc(db, "questions", id);
    await updateDoc(questionDoc, {
      question: editQuestion,
      answer: editAnswer,
    });
    setEditing(null);
  };

  const handleDeleteQuestion = async (id) => {
    const questionDoc = doc(db, "questions", id);
    await deleteDoc(questionDoc);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className=" bg-white py-10 px-6">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
        Admin Panel - Questions & Answers
      </h1>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Add New Question
        </h2>
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

      <div className="grid grid-cols-1 gap-8">
        {questions.map((question) => (
          <div key={question.id} className="bg-white shadow-lg rounded-lg p-4">
            {editing === question.id ? (
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
                  onClick={() => handleUpdateQuestion(question.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
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
                  onClick={() => {
                    setEditing(question.id);
                    setEditQuestion(question.question);
                    setEditAnswer(question.answer);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuestions;
