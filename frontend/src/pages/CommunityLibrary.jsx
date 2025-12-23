import React, { useState, useEffect } from 'react';
import { videoService } from '../services/videoService';
import { FaPlay, FaHeart, FaEye } from 'react-icons/fa';

const CommunityLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadVideos();
  }, [page]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await videoService.getAllVideos(page, 20);
      setVideos(data.videos);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to load videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (videoId) => {
    try {
      await videoService.likeVideo(videoId);
      // Update local state
      setVideos(videos.map(video => 
        video._id === videoId 
          ? { ...video, likes: video.likes + 1 }
          : video
      ));
    } catch (err) {
      console.error('Failed to like video:', err);
    }
  };

  if (loading && videos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Library</h1>
          <p className="text-gray-600">Discover amazing animations created by our community</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Thumbnail%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300">
                  <FaPlay className="text-white text-4xl opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">by {video.username}</p>
                
                {video.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {video.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(video._id)}
                      className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                    >
                      <FaHeart />
                      <span>{video.likes}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <FaEye />
                      <span>{video.views}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {video.duration}s
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.pages}
              className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityLibrary;
