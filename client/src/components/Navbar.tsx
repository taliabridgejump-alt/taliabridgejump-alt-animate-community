import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Animate Community
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/community" className="text-gray-700 hover:text-blue-600 font-medium">
              Community
            </Link>

            {isAuthenticated ? (
              <>
                <Link to={`/profile/${user?._id}`} className="text-gray-700 hover:text-blue-600 font-medium">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
