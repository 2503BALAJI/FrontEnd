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
import { v4 as uuidv4 } from "uuid";
import ClipLoader from "react-spinners/ClipLoader";

const ProjectAdd = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    description: "",
    imageFile: null,
  });
  const [selectedProject, setSelectedProject] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    imageFile: null,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding project: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProject = async () => {
    if (
      !selectedProject.name ||
      !selectedProject.location ||
      !selectedProject.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    const updatedData = {
      name: selectedProject.name,
      location: selectedProject.location,
      description: selectedProject.description,
    };

    if (selectedProject.imageFile) {
      const imageRef = ref(storage, `projects/${uuidv4()}`);
      await uploadBytes(imageRef, selectedProject.imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      updatedData.imageUrl = imageUrl;
    }

    try {
      await updateDoc(doc(db, "projects", selectedProject.id), updatedData);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating project: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

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
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md"
        >
          Add New Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4A90E2" loading={loading} size={50} />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500">No data found</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                <p className="text-sm text-gray-700 mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setSelectedProject({
                        id: project.id,
                        name: project.name,
                        location: project.location,
                        description: project.description,
                        imageUrl: project.imageUrl,
                      });
                      setShowUpdateModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
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

      {showAddModal && (
        <Modal
          title="Add New Project"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProject}
          submitting={submitting}
          project={newProject}
          setProject={setNewProject}
        />
      )}

      {showUpdateModal && (
        <Modal
          title="Update Project"
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdateProject}
          submitting={submitting}
          project={selectedProject}
          setProject={setSelectedProject}
          isUpdate={true}
        />
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
            currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const Modal = ({
  title,
  onClose,
  onSubmit,
  submitting,
  project,
  setProject,
  isUpdate = false,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          className="border p-2 mb-3 w-full rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={project.location}
          onChange={(e) => setProject({ ...project, location: e.target.value })}
          className="border p-2 mb-3 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          className="border p-2 mb-3 w-full rounded"
        />
        <input
          type="file"
          onChange={(e) =>
            setProject({ ...project, imageFile: e.target.files[0] })
          }
          className="border p-2 mb-3 w-full rounded"
        />
        {isUpdate && (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
        )}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
