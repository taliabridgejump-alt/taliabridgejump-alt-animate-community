import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Video } from '../types';
import { authService, videoService } from '../services/api';
import VideoCard from '../components/VideoCard';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      
      try {
        const [userData, videosData] = await Promise.all([
          authService.getProfile(userId),
          videoService.getUserVideos(userId)
        ]);
        setUser(userData);
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">User not found</h2>
          <Link to="/community" className="text-blue-600 hover:text-blue-700">
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <p className="text-blue-100">{user.email}</p>
              {user.bio && <p className="mt-2">{user.bio}</p>}
              <p className="text-sm text-blue-100 mt-2">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Videos by {user.username} ({videos.length})
        </h2>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No videos yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
