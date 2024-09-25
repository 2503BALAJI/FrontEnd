import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebaseconfig"; // Adjust based on your Firebase setup
import { doc, getDoc } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner"; // Spinner for loading state
import { useParams } from "react-router-dom"; // For accessing URL parameters

const ProjectDetails = () => {
  const { projectId } = useParams(); // Extract projectId from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("No project found!");
        }
      } catch (err) {
        setError("Error fetching project details: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          {project.name}
        </h1>
        <h2 className="text-xl text-gray-600 mb-4">{project.location}</h2>

        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-semibold text-green-600">
            {project.returnPercentage}%
          </span>
          <span className="text-gray-600 text-lg">Return Percentage</span>
        </div>

        <p className="text-lg mb-4">{project.description}</p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">
          Additional Information:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="font-semibold">Investment Details:</h4>
            <p>
              <strong>Minimum Investment:</strong> ${project.minInvestment}
            </p>
            <p>
              <strong>Maximum Investment:</strong> ${project.maxInvestment}
            </p>
            <p>
              <strong>Working Time:</strong> {project.workingTime}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="font-semibold">Timeline:</h4>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(project.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Predicted End Date:</strong>{" "}
              {new Date(project.predictedEndDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow mt-6">
          <h4 className="font-semibold">Contact Information:</h4>
          <p>
            <strong>Contact Number:</strong> {project.contactNumber}
          </p>
          <p>
            <strong>Contact Schedule:</strong> {project.contactSchedule}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
