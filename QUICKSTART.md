# Quick Start Guide

This guide will help you get the Animate Community platform up and running quickly.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install all dependencies for both client and server
npm run install-all
```

Or install separately:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Use it in the next step

### 3. Configure Environment Variables

**Server Configuration:**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/animate-community
# Or use your MongoDB Atlas connection string:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/animate-community
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Client Configuration:**
```bash
cd client
cp .env.example .env
```

The default `client/.env` should work:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Seed the Database (Optional but Recommended)

This will populate your database with sample users, videos, comments, likes, and bookmarks:

```bash
cd server
npm run seed
```

Sample user credentials will be displayed after seeding:
- Email: alice@example.com | Password: password123
- Email: bob@example.com | Password: password123
- Email: charlie@example.com | Password: password123
- Email: diana@example.com | Password: password123
- Email: evan@example.com | Password: password123

### 5. Start the Application

**Option A: Run both server and client together (recommended for development)**
```bash
# From the root directory
npm run dev
```

**Option B: Run server and client separately**
```bash
# Terminal 1 - Start the backend server
cd server
npm run dev

# Terminal 2 - Start the frontend client
cd client
npm start
```

### 6. Access the Application

- **Frontend**: Open your browser to http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Testing the Application

### As a Visitor (Not Logged In)

1. Visit http://localhost:3000
2. Click "Explore Community" or navigate to "Community"
3. Browse videos, use search and filters
4. Click on a video to view details
5. Try to like or comment - you'll be prompted to log in

### As a Registered User

1. Click "Login / Sign Up" in the navbar
2. Use one of the seeded accounts or create a new one:
   - Email: alice@example.com
   - Password: password123
3. Now you can:
   - Like videos (heart icon)
   - Bookmark videos (bookmark icon)
   - Add comments
   - View your profile
   - Share videos

### Features to Test

- **Search**: Try searching for "tutorial", "3d", or "animation"
- **Filters**: 
  - Category: animation, tutorial, showcase, behind-the-scenes, challenge
  - Sort: Latest, Oldest, Most Popular
- **Pagination**: Scroll down and use Next/Previous buttons
- **Video Detail**: Click any video to see full details
- **User Profiles**: Click on uploader names to see their profile
- **Interactive Actions**: Like, bookmark, comment, share

## Common Issues

### Port Already in Use

If port 3000 or 5000 is already in use:

**For Backend (port 5000):**
Edit `server/.env`:
```env
PORT=5001
```

And update `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

**For Frontend (port 3000):**
The React app will automatically prompt to use another port.

### MongoDB Connection Error

1. **Local MongoDB**: Make sure MongoDB is running (`mongod`)
2. **MongoDB Atlas**: 
   - Check your connection string
   - Ensure your IP is whitelisted in Atlas
   - Verify username and password are correct

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules client/node_modules server/node_modules
rm package-lock.json client/package-lock.json server/package-lock.json
npm run install-all
```

## Production Build

To create production builds:

```bash
# Build both client and server
npm run build
```

This will:
- Compile TypeScript server code to `server/dist/`
- Build optimized React app to `client/build/`

## Next Steps

- Explore the codebase structure
- Add your own videos (you'll need to implement file upload or use external URLs)
- Customize the styling
- Add more features!

## Need Help?

- Check the main README.md for detailed documentation
- Review the API endpoints in the README
- Examine the code comments

## Development Tips

- Use the seeded data to test features quickly
- Check browser console and server logs for errors
- The app supports hot reloading - your changes will reflect immediately
- All passwords in seeded data are "password123"

Enjoy building with Animate Community! 🎬✨
