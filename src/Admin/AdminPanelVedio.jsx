// AdminPanel.js
import { useState, useEffect } from "react";
import { db } from "../Firebase/Firebaseconfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const AdminPanelVedio = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: "", link: "" });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "youtubeVideos"),
      (snapshot) => {
        const videoList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videoList);
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
    await deleteDoc(doc(db, "youtubeVideos", id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - YouTube Videos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Video Title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Video Link"
          value={newVideo.link}
          onChange={(e) => setNewVideo({ ...newVideo, link: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={addVideo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Video
        </button>
      </div>

      <div className="space-y-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {video.link}
                </a>
              </div>
              <button
                onClick={() => deleteVideo(video.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No videos available. Please add some videos.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPanelVedio;
