import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './components/SignUp';
import Login from './components/Login';
import CommunityLibrary from './pages/CommunityLibrary';
import VideoMaker from './pages/VideoMaker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<CommunityLibrary />} />
        <Route path="/video-maker" element={<VideoMaker />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
