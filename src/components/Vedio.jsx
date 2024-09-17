import React from "react";

// VideoCard Component to display individual video
const VideoCard = ({ videoId, title }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative pb-56 h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
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
  const videos = [
    { id: "dQw4w9WgXcQ", title: "First Video" },
    { id: "eY52Zsg-KVI", title: "Second Video" },
    { id: "M7lc1UVf-VE", title: "Third Video" },
    { id: "ScMzIvxBSi4", title: "Fourth Video" },
    { id: "ysz5S6PUM-U", title: "Fifth Video" },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <h1 className="text-4xl text-center font-bold text-gray-900 mb-10">
        Our Videos
      </h1>
      <div className="flex flex-wrap -mx-4">
        {videos.map((video, index) => (
          <VideoCard key={index} videoId={video.id} title={video.title} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
