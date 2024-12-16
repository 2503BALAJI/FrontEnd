import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const AdminPanelVideo = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: "", link: "" });
  const [loading, setLoading] = useState(true);

  // Fetch videos from Flask API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/videos");
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Add a new video
  const addVideo = async () => {
    if (newVideo.title && newVideo.link) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/videos",
          newVideo
        );
        setVideos((prevVideos) => [
          ...prevVideos,
          { ...newVideo, id: response.data._id },
        ]);
        setNewVideo({ title: "", link: "" });
      } catch (error) {
        console.error("Error adding video:", error);
      }
    }
  };

  // Delete a video
  const deleteVideo = async (id) => {
    try {
      if (id) {
        await axios.delete(`http://127.0.0.1:5000/api/videos/${id}`);
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video._id !== id)
        ); // Filter out the deleted video
      } else {
        console.error("Invalid ID for deletion");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] py-6 px-4 sm:px-8 lg:px-12 bg-gray-100 flex flex-col items-center overflow-auto">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8">
        Admin Panel - YouTube Videos
      </h1>

      <div className="mb-8 w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:space-x-2 mb-4">
          <input
            type="text"
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) =>
              setNewVideo({ ...newVideo, title: e.target.value })
            }
            className="border p-3 rounded-md flex-1 mb-2 md:mb-0"
          />
          <input
            type="text"
            placeholder="Video Link"
            value={newVideo.link}
            onChange={(e) => setNewVideo({ ...newVideo, link: e.target.value })}
            className="border p-3 rounded-md flex-1 mb-2 md:mb-0"
          />
          <button
            onClick={addVideo}
            className="bg-blue-500 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-600"
          >
            Add Video
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={60} color={"#4A90E2"} loading={loading} />
          </div>
        ) : videos.length > 0 ? (
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video._id} // Make sure the key is the id of the video
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-md shadow-md"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {video.title}
                  </h2>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 break-words"
                  >
                    {video.link}
                  </a>
                </div>
                <button
                  onClick={() => deleteVideo(video._id)} // Using the correct id for deletion
                  className="mt-4 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No videos available. Please add some videos.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPanelVideo;
