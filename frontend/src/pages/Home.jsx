import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaVideo, FaUsers, FaMicrophone, FaPlay } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6">Animate Community</h1>
          <p className="text-2xl mb-8">Create Stunning Animated Videos with Ease</p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/video-maker"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Creating
              </Link>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">
              <FaVideo />
            </div>
            <h3 className="text-xl font-semibold mb-2">Video Maker</h3>
            <p className="text-gray-100">
              Create professional animated videos with our intuitive timeline-based editor
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Library</h3>
            <p className="text-gray-100">
              Share your creations and get inspired by other creators
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">
              <FaMicrophone />
            </div>
            <h3 className="text-xl font-semibold mb-2">VoiceForge Integration</h3>
            <p className="text-gray-100">
              Add professional voice-overs to your animations with text-to-speech
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">
              <FaPlay />
            </div>
            <h3 className="text-xl font-semibold mb-2">Import Characters</h3>
            <p className="text-gray-100">
              Easily import custom characters from any image URL
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Create Amazing Animations?</h2>
          <p className="text-xl mb-8">Join thousands of creators in our community</p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
