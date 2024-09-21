import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebaseconfig";
import { collection, onSnapshot } from "firebase/firestore";

// VideoCard Component to display individual video
const VideoCard = ({ videoUrl, title }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative pb-56 h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
      </div>
    </div>
  );
};

// Main component to show all videos
const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
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
        setLoading(false); // Set loading to false once data is fetched
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <h1 className="text-4xl text-center font-bold text-gray-900 mb-10">
        Our Videos
      </h1>

      {/* Loading Bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10">
          <div className="bg-blue-500 h-2.5 rounded-full animate-pulse"></div>
        </div>
      )}

      <div className="flex flex-wrap -mx-4">
        {videos.length > 0
          ? videos.map((video) => (
              <VideoCard
                key={video.id}
                videoUrl={video.link}
                title={video.title}
              />
            ))
          : !loading && (
              <p className="text-center text-gray-500 w-full">
                No videos available.
              </p>
            )}
      </div>
    </div>
  );
};

export default VideoGrid;
