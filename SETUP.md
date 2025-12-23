# Quick Setup Guide

This guide will help you get the Animate Community application up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/downloads)

## Quick Start (5 minutes)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/taliabridgejump-alt/taliabridgejump-alt-animate-community.git
cd taliabridgejump-alt-animate-community

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Backend

```bash
# Navigate to backend directory
cd ../backend

# Copy environment example
cp .env.example .env

# Edit .env file (use your favorite text editor)
# For quick start, the defaults should work with local MongoDB
```

**Minimal .env configuration:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/animate-community
JWT_SECRET=your_secret_key_change_me
JWT_EXPIRE=7d
```

### Step 3: Start MongoDB

**On macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**On Windows:**
```bash
# MongoDB should start automatically after installation
# Or run: net start MongoDB
```

**On Linux:**
```bash
sudo systemctl start mongod
```

**Verify MongoDB is running:**
```bash
mongosh
# If you see a MongoDB prompt, it's working! Type 'exit' to quit
```

### Step 4: Seed the Database (Optional but Recommended)

This creates the "Animation Bots" user with sample videos:

```bash
# From the backend directory
npm run seed
```

You should see:
```
MongoDB connected
Animation Bots user created
Sample videos created
Database seeding completed successfully
```

### Step 5: Start the Backend Server

```bash
# From the backend directory
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### Step 6: Start the Frontend (New Terminal)

Open a **new terminal window** and run:

```bash
# Navigate to frontend directory
cd frontend

# Start the development server
npm run dev
```

You should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## First Time User Flow

1. **Sign Up**: Click "Sign Up" and create a new account
2. **Dashboard**: After signing up, you'll be taken to your dashboard
3. **Explore Community**: Click "Community" to see videos from Animation Bots
4. **Create Animation**: Click "Video Maker" to start creating your first animation

## Troubleshooting

### MongoDB Connection Error

**Problem:** `MongooseError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
- Make sure MongoDB is installed and running
- Check if MongoDB is listening on port 27017
- Try: `mongosh` in terminal to verify connection

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
- Change the PORT in backend/.env to another port (e.g., 5001)
- Or kill the process using port 5000:
  ```bash
  # On macOS/Linux
  lsof -ti:5000 | xargs kill -9
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Frontend Build Errors

**Problem:** Vite or React errors during `npm run dev`

**Solution:**
- Delete node_modules and reinstall:
  ```bash
  rm -rf node_modules
  npm install
  ```
- Clear npm cache:
  ```bash
  npm cache clean --force
  ```

### Dependencies Installation Fails

**Problem:** npm install fails

**Solution:**
- Update npm: `npm install -g npm@latest`
- Try using yarn instead: `yarn install`
- Check Node.js version: `node --version` (should be v16+)

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Changes to React components automatically refresh the page
- **Backend**: Nodemon automatically restarts the server on file changes

### API Testing

You can test the API endpoints using tools like:
- **Postman** - [Download here](https://www.postman.com/downloads/)
- **curl** - Command line tool (pre-installed on macOS/Linux)
- **Thunder Client** - VS Code extension

Example API test:
```bash
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Database Management

View your MongoDB data using:
- **MongoDB Compass** - [Download here](https://www.mongodb.com/products/compass)
- **mongosh** - Command line interface

```bash
# Connect to database
mongosh

# Use the database
use animate-community

# View collections
show collections

# View users
db.users.find().pretty()

# View videos
db.videos.find().pretty()
```

## Next Steps

Once everything is running:

1. **Customize the Application**
   - Modify colors in `frontend/tailwind.config.js`
   - Add new features in the video maker
   - Create custom animation templates

2. **Deploy to Production**
   - See README.md for production deployment guide
   - Configure AWS S3 for file storage
   - Set up a production MongoDB instance (MongoDB Atlas)

3. **Integrate Real VoiceForge**
   - Update `backend/src/services/voiceForgeService.js`
   - Add VoiceForge API credentials to `.env`

## Support

If you encounter any issues:
1. Check the [README.md](./README.md) for detailed documentation
2. Open an issue on GitHub
3. Review the error logs in terminal

## Useful Commands Reference

```bash
# Backend
cd backend
npm run dev          # Start development server
npm run seed         # Seed database with test data
npm start            # Start production server

# Frontend
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database
mongosh                              # Connect to MongoDB
mongosh --eval "db.dropDatabase()"   # Reset database (careful!)
```

Happy coding! 🎨🎬
