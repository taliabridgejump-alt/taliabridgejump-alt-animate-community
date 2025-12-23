import { useNavigate } from 'react-router-dom';

export default function VideoMaker() {
  const navigate = useNavigate();

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
          <h2 className="text-3xl font-bold text-gray-800">Video Maker</h2>
          <p className="text-gray-600 mt-2">Create and edit your animated videos</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Video Maker Coming Soon</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            The video maker feature is currently under development. Soon you'll be able to create
            amazing animated videos with VoiceForge integration and Animation Bots!
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">Planned Features:</h4>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>VoiceForge integration for voice synthesis</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Animation Bots for automated video creation</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Drag-and-drop video editor</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Template library for quick starts</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Export and share to community library</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
