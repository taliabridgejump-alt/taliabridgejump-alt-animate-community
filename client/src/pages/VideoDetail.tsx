import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Video, Comment } from '../types';
import { videoService, commentService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        const [videoData, commentsData] = await Promise.all([
          videoService.getVideo(id),
          commentService.getComments(id)
        ]);
        setVideo(videoData);
        setComments(commentsData);
        setIsLiked(videoData.isLiked || false);
        setIsBookmarked(videoData.isBookmarked || false);
        setLikes(videoData.likes);
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated || !id) {
      alert('Please log in to like videos');
      return;
    }
    
    try {
      const result = await videoService.likeVideo(id);
      setIsLiked(result.liked);
      setLikes(result.likes);
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated || !id) {
      alert('Please log in to bookmark videos');
      return;
    }
    
    try {
      const result = await videoService.bookmarkVideo(id);
      setIsBookmarked(result.bookmarked);
    } catch (error) {
      console.error('Error bookmarking video:', error);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Video link copied to clipboard!');
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !id || !commentText.trim()) return;

    try {
      const newComment = await commentService.addComment(id, commentText);
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Video not found</h2>
          <Link to="/community" className="text-blue-600 hover:text-blue-700">
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/community" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
          ← Back to Community
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player and Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Video Player */}
              <div className="relative pb-[56.25%] bg-black">
                <video
                  src={video.videoUrl}
                  poster={video.thumbnailUrl}
                  controls
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <Link to={`/profile/${video.uploader}`} className="flex items-center gap-3 hover:text-blue-600">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {video.uploaderName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{video.uploaderName}</p>
                      <p className="text-sm text-gray-600">{video.views} views</p>
                    </div>
                  </Link>

                  <div className="flex gap-2">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {likes}
                    </button>

                    <button
                      onClick={handleBookmark}
                      className={`p-2 rounded-full transition-colors ${
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
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      title="Share"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">{video.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {video.category}
                  </span>
                  {video.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500">
                  Uploaded on {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">
                Comments ({comments.length})
              </h2>

              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </form>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600">
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Log in
                    </Link>
                    {' '}to leave a comment
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="border-b pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            to={`/profile/${comment.user}`}
                            className="font-semibold text-gray-900 hover:text-blue-600"
                          >
                            {comment.username}
                          </Link>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                      {user && user._id === comment.user && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Could add related videos here */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-4">About this video</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600">Category</dt>
                  <dd className="font-medium">{video.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Views</dt>
                  <dd className="font-medium">{video.views}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Likes</dt>
                  <dd className="font-medium">{likes}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Uploaded</dt>
                  <dd className="font-medium">{new Date(video.createdAt).toLocaleDateString()}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
