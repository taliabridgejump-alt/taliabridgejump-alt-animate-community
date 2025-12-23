# Animate Community

A community-driven platform for creating, sharing, and discovering animated videos.

## Features

- 🎬 **Video Creation**: Intuitive video maker with plans for VoiceForge integration
- 🤖 **Animation Bots**: AI-powered animation tools (coming soon)
- 📚 **Community Library**: Browse and share videos created by the community
- 🔐 **User Authentication**: Secure sign-up and login system
- 🎨 **Modern UI**: Built with React and styled with TailwindCSS

## Tech Stack

### Frontend
- **React.js** - Modern, dynamic UI library
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **bcrypt** - Password hashing

## Project Structure

```
animate-community/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components (SignUp, Login)
│   │   ├── pages/         # Page components (Landing, Library, VideoMaker)
│   │   ├── App.jsx        # Main app with routing
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose schemas (User, Video)
│   ├── routes/            # API routes (auth, videos)
│   ├── middleware/        # Authentication middleware
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd animate-community
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env and configure your MongoDB URI and JWT secret
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Edit .env if you need to change the API URL
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on http://localhost:5000

3. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on http://localhost:5173

4. **Open your browser** and navigate to http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Videos
- `GET /api/videos` - Get all public videos (requires authentication)
- `GET /api/videos/:id` - Get a single video by ID
- `POST /api/videos` - Create a new video
- `PUT /api/videos/:id` - Update a video
- `DELETE /api/videos/:id` - Delete a video
- `GET /api/videos/user/:userId` - Get videos by user

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/animate-community
JWT_SECRET=your-secret-key-change-this-in-production
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Future Enhancements

- VoiceForge integration for voice synthesis
- Animation Bots for automated video creation
- Drag-and-drop video editor
- Video template library
- Social features (likes, comments, follows)
- Video upload and storage
- Advanced search and filtering

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
