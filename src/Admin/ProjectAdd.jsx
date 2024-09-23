import { useState, useEffect } from "react";
import { db, storage } from "../Firebase/Firebaseconfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // For unique file names

const ProjectAdd = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    description: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const projectsPerPage = 10;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddProject = async () => {
    if (
      !newProject.name ||
      !newProject.location ||
      !newProject.description ||
      !newProject.imageFile
    ) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    setSubmitting(true);

    const imageRef = ref(storage, `projects/${uuidv4()}`);
    await uploadBytes(imageRef, newProject.imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    const projectData = {
      name: newProject.name,
      location: newProject.location,
      description: newProject.description,
      imageUrl,
    };

    try {
      await addDoc(collection(db, "projects"), projectData);
      setNewProject({
        name: "",
        location: "",
        description: "",
        imageFile: null,
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding project: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProject = async (id, updatedProject) => {
    try {
      await updateDoc(doc(db, "projects", id), updatedProject);
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  // Pagination Logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Real Estate Projects
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add New Project
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <div key={project.id} className="border p-4 rounded-lg shadow-sm">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-32 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                <p className="text-sm text-gray-700">{project.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      handleUpdateProject(project.id, {
                        ...project,
                        name: "Updated Name", // Example update
                      })
                    }
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Location"
              value={newProject.location}
              onChange={(e) =>
                setNewProject({ ...newProject, location: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="border p-2 mb-2 w-full h-24"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProject({ ...newProject, imageFile: e.target.files[0] })
              }
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black p-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                disabled={submitting}
                className={`p-2 rounded ${
                  submitting ? "bg-blue-300" : "bg-blue-500 text-white"
                }`}
              >
                {submitting ? "Submitting..." : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAdd;

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`mx-1 px-4 py-2 rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
