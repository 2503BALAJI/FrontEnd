import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebaseconfig"; // Import your Firebase config
import { collection, onSnapshot } from "firebase/firestore";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from Firebase Firestore
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="h-20"></div> {/* Spacer for navbar */}
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
        Real Estate Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <img
              src={project.imageUrl} // Assuming your Firebase data has an imageUrl field
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {project.name}
              </h2>
              <p className="text-gray-600">{project.location}</p>
            </div>
            {hoveredProject && hoveredProject.id === project.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">
                  {project.name}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
