import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { useAuth } from '../context/AuthContext';
import { videoService } from '../services/api';

interface VideoCardProps {
  video: Video;
  onUpdate?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = React.useState(video.isLiked || false);
  const [isBookmarked, setIsBookmarked] = React.useState(video.isBookmarked || false);
  const [likes, setLikes] = React.useState(video.likes);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to like videos');
      return;
    }
    
    try {
      const result = await videoService.likeVideo(video._id);
      setIsLiked(result.liked);
      setLikes(result.likes);
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to bookmark videos');
      return;
    }
    
    try {
      const result = await videoService.bookmarkVideo(video._id);
      setIsBookmarked(result.bookmarked);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error bookmarking video:', error);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/video/${video._id}`;
    navigator.clipboard.writeText(url);
    alert('Video link copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/video/${video._id}`}>
        <div className="relative pb-[56.25%] bg-gray-200">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {video.views} views
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/video/${video._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 line-clamp-2">
            {video.title}
          </h3>
        </Link>
        
        <Link to={`/profile/${video.uploader}`} className="text-sm text-gray-600 hover:text-blue-600 mb-3 block">
          {video.uploaderName}
        </Link>

        <div className="flex flex-wrap gap-1 mb-3">
          {video.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
              isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">{likes}</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`p-1.5 rounded-full transition-colors ${
              isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Bookmark"
          >
            <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Share"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
