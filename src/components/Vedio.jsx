import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebaseconfig";
import { collection, onSnapshot } from "firebase/firestore";
import { ClipLoader } from "react-spinners"; // Assuming 'react-spinners' is installed

// VideoCard Component to display individual video
const VideoCard = ({ videoUrl, title }) => {
  return (
    <div className="w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-6">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
        <div className="relative pb-56 h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
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
    <div className="h-[90%] py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Our Videos
      </h1>

      {/* Loading Spinner in Center */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3b82f6" size={80} />
        </div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="container mx-auto flex flex-wrap justify-center -mx-4">
            {videos.length > 0 ? (
              videos.map((video) => (
                <VideoCard
                  key={video.id}
                  videoUrl={video.link}
                  title={video.title}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                No videos available.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoGrid;
