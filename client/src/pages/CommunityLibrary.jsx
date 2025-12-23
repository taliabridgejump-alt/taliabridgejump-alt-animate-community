import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CommunityLibrary() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/videos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        console.error('Failed to fetch videos');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-purple-600">Animate Community</h1>
            <div className="flex space-x-4">
              <a
                href="/library"
                className="text-gray-700 hover:text-purple-600 font-semibold"
              >
                Library
              </a>
              <a
                href="/video-maker"
                className="text-gray-700 hover:text-purple-600 font-semibold"
              >
                Video Maker
              </a>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Community Library</h2>
          <p className="text-gray-600 mt-2">Browse and discover videos created by the community</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading videos...</div>
          </div>
        ) : videos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Videos Yet</h3>
            <p className="text-gray-600 mb-6">
              Be the first to create and share a video with the community!
            </p>
            <a
              href="/video-maker"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
            >
              Create Your First Video
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-200">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-6xl">🎬</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {video.creator}</span>
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
