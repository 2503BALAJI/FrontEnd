import { useState, useEffect } from "react";
import { db, storage } from "../Firebase/Firebaseconfig"; // Adjust the import based on your firebase configuration
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
    returnPercentage: "",
    minInvestment: "",
    maxInvestment: "",
    startDate: "",
    predictedEndDate: "",
    workingTime: "",
    contactNumber: "",
    contactSchedule: "",
  });
  const [selectedProject, setSelectedProject] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    imageFile: null,
    imageUrl: "",
    returnPercentage: "",
    minInvestment: "",
    maxInvestment: "",
    startDate: "",
    predictedEndDate: "",
    workingTime: "",
    contactNumber: "",
    contactSchedule: "",
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
    if (!newProject.imageFile) {
      alert("Please select an image file.");
      return;
    }

    setSubmitting(true);
    try {
      // Step 1: Upload the file to Firebase Storage
      const imageRef = ref(storage, `projects/${newProject.imageFile.name}`);
      await uploadBytes(imageRef, newProject.imageFile);

      // Step 2: Get the download URL
      const imageUrl = await getDownloadURL(imageRef);

      // Step 3: Add project data to Firestore
      const projectData = {
        name: newProject.name,
        location: newProject.location,
        description: newProject.description,
        imageUrl, // Store the image URL instead of the File object
        returnPercentage: newProject.returnPercentage,
        minInvestment: newProject.minInvestment,
        maxInvestment: newProject.maxInvestment,
        startDate: newProject.startDate,
        predictedEndDate: newProject.predictedEndDate,
        workingTime: newProject.workingTime,
        contactNumber: newProject.contactNumber,
        contactSchedule: newProject.contactSchedule,
      };

      await addDoc(collection(db, "projects"), projectData);
      alert("Project added successfully!");
      // Reset project state after successful addition
      setNewProject({
        name: "",
        location: "",
        description: "",
        imageFile: null,
        returnPercentage: "",
        minInvestment: "",
        maxInvestment: "",
        startDate: "",
        predictedEndDate: "",
        workingTime: "",
        contactNumber: "",
        contactSchedule: "",
      });
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project. Please try again.");
    } finally {
      setSubmitting(false);
      setShowAddModal(false); // Close modal after submission
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
      returnPercentage: selectedProject.returnPercentage,
      minInvestment: selectedProject.minInvestment,
      maxInvestment: selectedProject.maxInvestment,
      startDate: selectedProject.startDate,
      predictedEndDate: selectedProject.predictedEndDate,
      workingTime: selectedProject.workingTime,
      contactNumber: selectedProject.contactNumber,
      contactSchedule: selectedProject.contactSchedule,
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
                        returnPercentage: project.returnPercentage,
                        minInvestment: project.minInvestment,
                        maxInvestment: project.maxInvestment,
                        startDate: project.startDate,
                        predictedEndDate: project.predictedEndDate,
                        workingTime: project.workingTime,
                        contactNumber: project.contactNumber,
                        contactSchedule: project.contactSchedule,
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

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 md:w-1/3 h-[90%] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Location:</label>
          <input
            type="text"
            value={project.location}
            onChange={(e) =>
              setProject({ ...project, location: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Description:</label>
          <textarea
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Image:</label>
          <input
            type="file"
            onChange={(e) =>
              setProject({ ...project, imageFile: e.target.files[0] })
            }
            className="mb-4"
            accept="image/*"
          />
          <label className="block mb-2">Return Percentage:</label>
          <input
            type="text"
            value={project.returnPercentage}
            onChange={(e) =>
              setProject({ ...project, returnPercentage: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Minimum Investment:</label>
          <input
            type="text"
            value={project.minInvestment}
            onChange={(e) =>
              setProject({ ...project, minInvestment: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Maximum Investment:</label>
          <input
            type="text"
            value={project.maxInvestment}
            onChange={(e) =>
              setProject({ ...project, maxInvestment: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Start Date:</label>
          <input
            type="date"
            value={project.startDate}
            onChange={(e) =>
              setProject({ ...project, startDate: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Predicted End Date:</label>
          <input
            type="date"
            value={project.predictedEndDate}
            onChange={(e) =>
              setProject({ ...project, predictedEndDate: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Working Time:</label>
          <input
            type="text"
            value={project.workingTime}
            onChange={(e) =>
              setProject({ ...project, workingTime: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Contact Number:</label>
          <input
            type="text"
            value={project.contactNumber}
            onChange={(e) =>
              setProject({ ...project, contactNumber: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <label className="block mb-2">Contact Schedule:</label>
          <input
            type="text"
            value={project.contactSchedule}
            onChange={(e) =>
              setProject({ ...project, contactSchedule: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
            required
          />
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProjectAdd;
