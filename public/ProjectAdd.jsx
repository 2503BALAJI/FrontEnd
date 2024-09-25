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
    if (
      !newProject.name ||
      !newProject.location ||
      !newProject.description ||
      !newProject.imageFile ||
      !newProject.returnPercentage ||
      !newProject.minInvestment ||
      !newProject.maxInvestment ||
      !newProject.startDate ||
      !newProject.predictedEndDate ||
      !newProject.workingTime ||
      !newProject.contactNumber ||
      !newProject.contactSchedule
    ) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    setSubmitting(true);

    const imageRef = ref(storage, `projects/${uuidv4()}`);
    await uploadBytes(imageRef, newProject.imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    const projectData = {
      ...newProject,
      imageUrl,
    };

    try {
      await addDoc(collection(db, "projects"), projectData);
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
      !selectedProject.description ||
      !selectedProject.returnPercentage ||
      !selectedProject.minInvestment ||
      !selectedProject.maxInvestment ||
      !selectedProject.startDate ||
      !selectedProject.predictedEndDate ||
      !selectedProject.workingTime ||
      !selectedProject.contactNumber ||
      !selectedProject.contactSchedule
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    const updatedData = {
      ...selectedProject,
    };

    if (selectedProject.imageFile) {
      const imageRef = ref(storage, `projects/${uuidv4()}`);
      await uploadBytes(imageRef, selectedProject.imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      updatedData.imageUrl = imageUrl;
    } else {
      updatedData.imageUrl = selectedProject.imageUrl; // Retain old image URL if no new image is provided
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
                <p className="text-sm text-gray-700 mb-2">
                  Return on Investment: {project.returnPercentage}%
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Min Investment: ${project.minInvestment}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Max Investment: ${project.maxInvestment}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Start Date: {project.startDate}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Predicted End Date: {project.predictedEndDate}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Working Hours: {project.workingTime}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Contact Number: {project.contactNumber}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Contact Schedule: {project.contactSchedule}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setSelectedProject({
                        ...project,
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
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
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
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProject({ ...project, imageFile: e.target.files[0] });
  };

  return (
    <div className="fixed inset-0 auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-[90%] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={project.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Percentage
            </label>
            <input
              type="number"
              name="returnPercentage"
              value={project.returnPercentage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Investment
            </label>
            <input
              type="number"
              name="minInvestment"
              value={project.minInvestment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Investment
            </label>
            <input
              type="number"
              name="maxInvestment"
              value={project.maxInvestment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Predicted End Date
            </label>
            <input
              type="date"
              name="predictedEndDate"
              value={project.predictedEndDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working Hours
            </label>
            <input
              type="text"
              name="workingTime"
              value={project.workingTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={project.contactNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Schedule
            </label>
            <input
              type="text"
              name="contactSchedule"
              value={project.contactSchedule}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Image
            </label>
            <input
              type="file"
              name="imageFile"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              accept="image/*"
              required={!isUpdate}
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAdd;
