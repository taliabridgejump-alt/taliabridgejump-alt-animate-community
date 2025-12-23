import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Community from './pages/Community';
import Login from './pages/Login';
import Profile from './pages/Profile';
import VideoDetail from './pages/VideoDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/video/:id" element={<VideoDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
