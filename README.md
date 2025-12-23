# Animate Community - Video Sharing Platform

A full-stack animated website with community features for sharing and exploring video content.

## Features

### 1. Community Library Display
- Browse through uploaded videos in a card-style layout
- Video thumbnails with titles and uploader information
- Responsive grid layout for optimal viewing on all devices

### 2. Interactive Features
- **Like videos**: Show appreciation for content
- **Comment system**: Engage in discussions
- **Share functionality**: Copy video links to clipboard
- **Bookmark/Favorite**: Save videos for later viewing (logged-in users only)

### 3. Search and Filtering
- **Search bar**: Find videos by title, uploader, or tags
- **Category filters**: Filter by animation, tutorial, showcase, behind-the-scenes, challenge, etc.
- **Sort options**: Latest, oldest, or most popular

### 4. User Profiles
- View public user profiles
- See all videos uploaded by a user
- Display user information and join date

### 5. Visitor and Contributor Modes
- **Visitors**: Can browse and view all public videos
- **Logged-in users**: Can like, comment, share, and bookmark videos
- Clear prompts for non-authenticated users to sign up

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **React Router** for navigation
- **TailwindCSS** for styling
- **Axios** for API calls
- Responsive design for mobile, tablet, and desktop

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcryptjs** for password hashing

### Database Schema
- **Users**: username, email, password, profile info
- **Videos**: title, description, URLs, uploader, tags, category, views, likes
- **Comments**: video reference, user reference, text, timestamp
- **Likes**: video-user relationship tracking
- **Bookmarks**: video-user relationship for saved videos

## Project Structure

```
taliabridgejump-alt-animate-community/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components (VideoCard, Navbar)
│   │   ├── pages/         # Page components (Home, Community, Login, Profile, VideoDetail)
│   │   ├── context/       # React Context (AuthContext)
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   └── App.tsx        # Main app component with routing
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── models/        # Mongoose schemas (User, Video, Comment, Like, Bookmark)
│   │   ├── routes/        # API routes (auth, videos, comments)
│   │   ├── middleware/    # Auth middleware
│   │   └── index.ts       # Server entry point
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd taliabridgejump-alt-animate-community
```

2. **Install dependencies**
```bash
# Install all dependencies
npm run install-all

# Or install separately
cd server && npm install
cd ../client && npm install
```

3. **Configure environment variables**

**Server (.env):**
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

**Client (.env):**
```bash
cd client
cp .env.example .env
# Update API URL if needed (default: http://localhost:5000/api)
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in server/.env
```

5. **Run the application**

**Development mode (both server and client):**
```bash
npm run dev
```

**Or run separately:**
```bash
# Terminal 1 - Server
npm run server

# Terminal 2 - Client
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Building for Production

```bash
npm run build
```

This will:
1. Compile TypeScript server code to `server/dist/`
2. Build optimized React app to `client/build/`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (auth required)
- `GET /api/auth/profile/:userId` - Get user profile

### Videos
- `GET /api/videos` - Get all videos (supports search, filter, sort, pagination)
- `GET /api/videos/:id` - Get single video
- `GET /api/videos/user/:userId` - Get user's videos
- `POST /api/videos` - Upload video (auth required)
- `POST /api/videos/:id/like` - Like/unlike video (auth required)
- `POST /api/videos/:id/bookmark` - Bookmark/unbookmark video (auth required)
- `GET /api/videos/bookmarks/me` - Get bookmarked videos (auth required)

### Comments
- `GET /api/comments/video/:videoId` - Get video comments
- `POST /api/comments` - Add comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required, owner only)

## Usage

### For Visitors (Not Logged In)
1. Visit the home page
2. Click "Explore Community" or navigate to "Community"
3. Browse videos, use search and filters
4. View video details
5. Sign up/login to interact with content

### For Registered Users
1. Create an account or login
2. Browse and search videos
3. Like, comment, and bookmark videos
4. View your profile and bookmarked videos
5. Upload videos (feature ready on backend)
6. View other users' profiles

## Features Highlight

### Community Page
- **Grid Layout**: Responsive card-based display
- **Real-time Search**: Instant filtering as you type
- **Smart Filters**: Category and sort options
- **Pagination**: Efficient loading of large video libraries
- **Interactive Cards**: Like, bookmark, and share from cards

### Video Detail Page
- **Full Video Player**: HTML5 video player with controls
- **Complete Info**: Description, tags, category, stats
- **Engagement**: Like, bookmark, share buttons
- **Comments Section**: View and post comments
- **User Profile Links**: Quick access to uploader's profile

### Authentication System
- **Secure**: JWT-based authentication
- **Password Protection**: bcrypt hashing
- **Persistent Sessions**: Token stored in localStorage
- **Protected Routes**: Auth required for interactions

## Development Notes

- **TypeScript**: Full type safety on both frontend and backend
- **Scalable Architecture**: Modular component and route structure
- **API Design**: RESTful endpoints with proper error handling
- **Security**: JWT auth, password hashing, input validation
- **Performance**: Pagination, indexed database queries
- **UX**: Loading states, error messages, responsive design

## Future Enhancements

- Video upload functionality with file storage (S3, Cloudinary)
- User video management dashboard
- Advanced search with filters
- Video recommendations
- User notifications
- Social features (follow users, activity feed)
- Video editing metadata
- Admin panel for content moderation

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

