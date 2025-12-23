# Animate Community

A full-stack web application for creating and sharing animated videos with integrated text-to-speech capabilities.

## Features

- **User Authentication**: Secure JWT-based authentication with sign-up and login
- **Video Maker UI**: Timeline-based interface for creating animated videos
- **Character Import**: Import custom characters via image URLs
- **VoiceForge Integration**: Text-to-speech capabilities for voiceovers
- **Community Library**: Share and discover videos created by the community
- **User Content Persistence**: All projects and videos are saved to your account
- **Animation Bots**: Pre-populated test content from bot user

## Tech Stack

### Frontend
- **React.js** (v18) - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** with **Express.js** - Server framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling
- **AWS SDK** - File storage (S3 integration ready)

## Project Structure

```
animate-community/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth middleware
│   │   ├── services/        # Business logic
│   │   ├── config/          # Configuration
│   │   ├── server.js        # Server entry point
│   │   └── seed.js          # Database seeding
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/taliabridgejump-alt/taliabridgejump-alt-animate-community.git
   cd taliabridgejump-alt-animate-community
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/animate-community
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Seed the Database** (Optional - creates Animation Bots user)
   ```bash
   npm run seed
   # or
   node src/seed.js
   ```

6. **Start Backend Server**
   ```bash
   npm run dev
   # Server will run on http://localhost:5000
   ```

7. **Set up Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   # Frontend will run on http://localhost:3000
   ```

8. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Videos
- `GET /api/videos` - Get all public videos
- `GET /api/videos/:id` - Get single video
- `GET /api/videos/user/my-videos` - Get user's videos (protected)
- `POST /api/videos` - Create new video (protected)
- `PUT /api/videos/:id` - Update video (protected)
- `DELETE /api/videos/:id` - Delete video (protected)
- `POST /api/videos/:id/like` - Like a video (protected)

### Projects
- `GET /api/projects` - Get user's projects (protected)
- `GET /api/projects/:id` - Get single project (protected)
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### VoiceForge
- `GET /api/voiceforge/voices` - Get available voices (protected)
- `POST /api/voiceforge/generate` - Generate text-to-speech (protected)

## Usage Guide

### Creating Your First Animation

1. **Sign Up**: Create an account on the sign-up page
2. **Access Video Maker**: Navigate to the Video Maker from the dashboard
3. **Import Characters**: 
   - Enter an image URL in the left sidebar
   - Click "Import Character"
4. **Add Scenes**: 
   - Click "Add Scene" in the timeline
   - Configure scene properties in the right sidebar
5. **Add Voiceover**:
   - Select a voice from the dropdown
   - Enter text for the voiceover
   - Click "Generate Voiceover"
6. **Save Project**: Click the "Save" button to persist your work
7. **Export**: Click "Export" to create a shareable video

### Exploring the Community

1. Navigate to "Community Library" from the navbar
2. Browse videos created by other users
3. Like videos by clicking the heart icon
4. View video details and stats

## Configuration

### File Storage

The application is configured to use local storage by default. To use AWS S3:

1. Update `backend/.env` with your AWS credentials:
   ```env
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=your-bucket-name
   ```

2. Implement file upload logic using the AWS SDK (already included in dependencies)

### VoiceForge Integration

The current implementation uses a placeholder service. To integrate real VoiceForge API:

1. Update `backend/src/services/voiceForgeService.js` with actual API calls
2. Add VoiceForge API credentials to `.env`

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
# Built files will be in frontend/dist/
```

**Backend:**
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

## Roadmap

- [ ] Real-time collaboration
- [ ] Advanced animation effects
- [ ] Video rendering and export
- [ ] Social features (comments, follows)
- [ ] Template library
- [ ] Mobile responsive improvements
- [ ] Video player with controls
- [ ] Advanced timeline features
- [ ] Character animation tools
- [ ] Background music integration
