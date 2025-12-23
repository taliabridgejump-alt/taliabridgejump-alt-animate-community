import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectService } from '../services/projectService';
import { videoService } from '../services/videoService';
import { FaPlus, FaVideo, FaFolder, FaClock } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [projectsData, videosData] = await Promise.all([
        projectService.getUserProjects(),
        videoService.getUserVideos()
      ]);
      setProjects(projectsData);
      setVideos(videosData);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600">Continue creating amazing animations</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/video-maker"
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FaPlus className="text-4xl" />
              <div>
                <h3 className="text-2xl font-semibold mb-1">New Project</h3>
                <p className="text-purple-100">Start creating a new animated video</p>
              </div>
            </div>
          </Link>

          <Link
            to="/community"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FaVideo className="text-4xl" />
              <div>
                <h3 className="text-2xl font-semibold mb-1">Community Library</h3>
                <p className="text-blue-100">Explore videos from other creators</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Projects</p>
                <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <FaFolder className="text-purple-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Published Videos</p>
                <p className="text-3xl font-bold text-gray-900">{videos.length}</p>
              </div>
              <FaVideo className="text-blue-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">
                  {videos.reduce((sum, video) => sum + video.views, 0)}
                </p>
              </div>
              <FaClock className="text-green-600 text-3xl" />
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
            <Link to="/video-maker" className="text-purple-600 hover:text-purple-700">
              View All
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer"
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>{project.scenes?.length || 0} scenes</p>
                    <p>Updated: {formatDate(project.updatedAt)}</p>
                  </div>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    Open Project
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 mb-4">No projects yet</p>
              <Link
                to="/video-maker"
                className="inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Create Your First Project
              </Link>
            </div>
          )}
        </div>

        {/* Published Videos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Published Videos</h2>
            <Link to="/community" className="text-purple-600 hover:text-purple-700">
              View All
            </Link>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.slice(0, 3).map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Thumbnail%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{video.views} views</span>
                      <span>{video.likes} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 mb-4">No published videos yet</p>
              <p className="text-sm text-gray-400">
                Create a project and publish it to share with the community
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
