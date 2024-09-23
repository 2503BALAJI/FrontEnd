import { useState, useEffect } from "react";
import { db } from "../Firebase/Firebaseconfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ClipLoader } from "react-spinners";

const AdminPanelVedio = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: "", link: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "youtubeVideos"),
      (snapshot) => {
        const videoList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videoList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching videos: ", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const addVideo = async () => {
    if (newVideo.title && newVideo.link) {
      await addDoc(collection(db, "youtubeVideos"), newVideo);
      setNewVideo({ title: "", link: "" });
    }
  };

  const deleteVideo = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteDoc(doc(db, "youtubeVideos", id));
    }
  };

  return (
    <div className="min-h-screen py-12 px-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Admin Panel - YouTube Videos
      </h1>

      <div className="mb-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row mb-4">
          <input
            type="text"
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) =>
              setNewVideo({ ...newVideo, title: e.target.value })
            }
            className="border p-3 rounded-md flex-1 mb-2 md:mb-0 md:mr-2"
          />
          <input
            type="text"
            placeholder="Video Link"
            value={newVideo.link}
            onChange={(e) =>
              setNewVideo({ ...newVideo, link: e.target.value })
            }
            className="border p-3 rounded-md flex-1 mb-2 md:mb-0 md:mr-2"
          />
          <button
            onClick={addVideo}
            className="bg-blue-500 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-600"
          >
            Add Video
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={60} color={"#4A90E2"} loading={loading} />
          </div>
        ) : videos.length > 0 ? (
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex justify-between items-center p-4 bg-white rounded-md shadow-md"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    {video.title}
                  </h2>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {video.link}
                  </a>
                </div>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
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

export default AdminPanelVedio;
