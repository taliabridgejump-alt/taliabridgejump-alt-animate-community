export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <nav className="bg-white bg-opacity-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Animate Community</h1>
            <div className="flex space-x-4">
              <a
                href="/login"
                className="text-white hover:text-gray-200 font-semibold px-4 py-2"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg transition duration-200"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to Animate Community
          </h1>
          <p className="text-xl md:text-2xl text-white text-opacity-90 mb-12 max-w-3xl mx-auto">
            Create, share, and discover amazing animated videos with our community-driven platform
          </p>
          
          <div className="flex justify-center space-x-4">
            <a
              href="/signup"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition duration-200 shadow-lg"
            >
              Get Started
            </a>
            <a
              href="/library"
              className="bg-purple-600 bg-opacity-50 backdrop-blur-md text-white hover:bg-opacity-70 font-bold px-8 py-4 rounded-lg text-lg transition duration-200 shadow-lg"
            >
              Explore Library
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-2">Create Videos</h3>
            <p className="text-white text-opacity-80">
              Use our intuitive video maker with VoiceForge integration to create stunning animated content
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">Animation Bots</h3>
            <p className="text-white text-opacity-80">
              Leverage AI-powered animation bots to automate and enhance your video creation process
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Community Library</h3>
            <p className="text-white text-opacity-80">
              Share your creations and discover inspiring videos from creators around the world
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
