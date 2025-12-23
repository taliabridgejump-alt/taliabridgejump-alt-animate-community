# Architecture Documentation

## System Overview

Animate Community is a full-stack web application built with a modern MERN stack (MongoDB, Express.js, React, Node.js) that enables users to create, share, and discover animated videos with integrated text-to-speech capabilities.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React Application (Vite)                   │ │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐   │ │
│  │  │  Pages   │  │Components│  │   Services/API     │   │ │
│  │  │  - Home  │  │ - Navbar │  │  - authService     │   │ │
│  │  │  - Login │  │ - Private│  │  - videoService    │   │ │
│  │  │  - Maker │  │   Route  │  │  - projectService  │   │ │
│  │  │  - Lib.  │  │          │  │  - voiceForge      │   │ │
│  │  └──────────┘  └──────────┘  └────────────────────┘   │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │         React Context (Auth State)               │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         Server Layer                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Express.js Application Server                 │ │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐   │ │
│  │  │  Routes  │  │Controller│  │    Middleware      │   │ │
│  │  │  - Auth  │  │  - Auth  │  │  - JWT Auth        │   │ │
│  │  │  - Video │  │  - Video │  │  - CORS            │   │ │
│  │  │  - Proj. │  │  - Proj. │  │  - Error Handler   │   │ │
│  │  │  - Voice │  │          │  │                    │   │ │
│  │  └──────────┘  └──────────┘  └────────────────────┘   │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │              Services Layer                       │  │ │
│  │  │         - VoiceForge TTS Service                 │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  MongoDB Database                       │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐     │ │
│  │  │  Users   │  │  Videos  │  │    Projects      │     │ │
│  │  │Collection│  │Collection│  │   Collection     │     │ │
│  │  └──────────┘  └──────────┘  └──────────────────┘     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ (Future Integration)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services (Optional)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   AWS S3     │  │  VoiceForge  │  │   CDN/Media     │  │
│  │ File Storage │  │  TTS API     │  │   Delivery      │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Architecture

#### 1. **Pages Layer**
- **Home**: Landing page with feature showcase
- **Login/SignUp**: Authentication pages
- **Dashboard**: User overview and quick actions
- **CommunityLibrary**: Browse and discover videos
- **VideoMaker**: Timeline-based animation editor

#### 2. **Components Layer**
- **Navbar**: Global navigation with auth state
- **PrivateRoute**: Route protection wrapper

#### 3. **Context Layer**
- **AuthContext**: Global authentication state management
  - User state
  - Login/logout functions
  - Token management

#### 4. **Services Layer**
- **api.js**: Axios instance with interceptors
- **authService**: Authentication API calls
- **videoService**: Video CRUD operations
- **projectService**: Project management
- **voiceForgeService**: TTS integration

### Backend Architecture

#### 1. **Routes Layer**
Defines API endpoints and maps them to controllers:
- `/api/auth/*` - Authentication routes
- `/api/videos/*` - Video management routes
- `/api/projects/*` - Project management routes
- `/api/voiceforge/*` - Text-to-speech routes

#### 2. **Controllers Layer**
Business logic for handling requests:
- **authController**: User registration, login, token validation
- **videoController**: Video CRUD, likes, views
- **projectController**: Project CRUD, scene management

#### 3. **Middleware Layer**
- **auth.js**: JWT token verification
- **CORS**: Cross-origin request handling
- **Error handling**: Centralized error management

#### 4. **Models Layer**
MongoDB schemas with Mongoose:
- **User**: User accounts, authentication
- **Video**: Published videos metadata
- **Project**: Work-in-progress animations

#### 5. **Services Layer**
- **voiceForgeService**: Text-to-speech integration

### Database Schema

#### User Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  isBot: Boolean,
  createdAt: Date
}
```

#### Video Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  userId: ObjectId (ref: User),
  username: String,
  videoUrl: String,
  thumbnailUrl: String,
  duration: Number,
  views: Number,
  likes: Number,
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Project Collection
```javascript
{
  _id: ObjectId,
  title: String,
  userId: ObjectId (ref: User),
  projectData: Object,
  characters: [{
    id: String,
    name: String,
    imageUrl: String,
    position: Object
  }],
  scenes: [{
    id: String,
    duration: Number,
    characters: Array,
    voiceover: {
      text: String,
      voice: String,
      audioUrl: String
    },
    background: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Data Flow

### Authentication Flow

```
1. User enters credentials → Login Page
2. Credentials sent to → /api/auth/login
3. Server validates → User Model
4. Password compared → bcrypt
5. JWT generated → jsonwebtoken
6. Token returned → Client
7. Token stored → localStorage
8. Token included → All subsequent requests (via interceptor)
9. Server validates → auth middleware
10. Request processed → Controllers
```

### Video Creation Flow

```
1. User creates animation → Video Maker
2. Adds characters → Character import (URL)
3. Creates scenes → Timeline management
4. Adds voiceover → VoiceForge service
5. Saves project → /api/projects
6. Project stored → MongoDB
7. Exports video → Video generation (future)
8. Publishes to library → /api/videos
9. Video visible → Community Library
```

## Security Architecture

### Authentication & Authorization

1. **Password Security**
   - Passwords hashed with bcryptjs (10 salt rounds)
   - Never stored or transmitted in plain text

2. **JWT Token Management**
   - Tokens signed with secret key
   - Expiration time configurable (default: 7 days)
   - Tokens verified on protected routes

3. **API Protection**
   - Protected routes require valid JWT
   - Middleware validates token before processing
   - User context attached to request object

4. **CORS Configuration**
   - Controlled cross-origin access
   - Configurable allowed origins

### Data Validation

- **Client-side**: Form validation in React
- **Server-side**: Model validation with Mongoose
- **Input sanitization**: Basic validation in controllers

## Scalability Considerations

### Current Architecture
- Single server deployment
- Local/shared MongoDB instance
- Synchronous processing

### Future Enhancements

1. **Horizontal Scaling**
   - Load balancer (Nginx)
   - Multiple Express instances
   - Session management (Redis)

2. **Media Processing**
   - Queue system (RabbitMQ/Bull)
   - Worker processes for video rendering
   - CDN for media delivery

3. **Database Optimization**
   - Indexes on frequently queried fields
   - Database replication
   - Sharding for large datasets

4. **Caching Layer**
   - Redis for session storage
   - CDN for static assets
   - API response caching

5. **Microservices**
   - Authentication service
   - Video processing service
   - TTS service
   - API Gateway

## Technology Choices

### Why React?
- Component-based architecture
- Rich ecosystem
- Virtual DOM for performance
- Strong community support

### Why Express?
- Minimal and flexible
- Large middleware ecosystem
- Easy to understand and maintain
- Perfect for RESTful APIs

### Why MongoDB?
- Flexible schema for evolving data models
- Good performance for read-heavy operations
- JSON-like documents match JavaScript objects
- Easy horizontal scaling

### Why Vite?
- Extremely fast HMR (Hot Module Replacement)
- Modern build tool
- Native ES modules support
- Better DX than Create React App

### Why TailwindCSS?
- Utility-first approach
- Rapid prototyping
- Consistent design system
- Small production bundle

## Development Workflow

### Local Development
1. Start MongoDB
2. Start backend (port 5000)
3. Start frontend (port 3000)
4. Frontend proxies API calls to backend

### Building for Production
1. Frontend: `npm run build` → static files
2. Backend: No build step, runs with Node.js
3. Deploy frontend to CDN/static hosting
4. Deploy backend to cloud server
5. Point frontend API to production backend URL

## API Design

### RESTful Principles
- Resource-based URLs
- HTTP methods for operations (GET, POST, PUT, DELETE)
- JSON request/response format
- Stateless communication
- HTTP status codes for responses

### Response Format
```javascript
// Success
{
  message: "Success message",
  data: { ... }
}

// Error
{
  message: "Error message",
  error: "Detailed error (dev mode only)"
}
```

## Performance Considerations

### Frontend Optimization
- Code splitting (React.lazy - future)
- Image lazy loading
- Pagination for large lists
- Debouncing for search/input
- Optimistic UI updates

### Backend Optimization
- Database indexing
- Query optimization
- Connection pooling
- Compression middleware
- Response caching

## Monitoring & Logging

### Current Implementation
- Console logging for development
- Error logging in production

### Future Enhancements
- Winston/Morgan for structured logging
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Analytics (Google Analytics)

## Deployment Architecture

### Recommended Production Setup

```
┌─────────────────────────────────────────┐
│         Load Balancer (Nginx)           │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│  Express App  │       │  Express App  │
│  Instance 1   │       │  Instance 2   │
└───────────────┘       └───────────────┘
        │                       │
        └───────────┬───────────┘
                    ▼
        ┌───────────────────────┐
        │    MongoDB Cluster    │
        │  (Replica Set)        │
        └───────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│     AWS S3    │       │     Redis     │
│ (File Storage)│       │   (Cache)     │
└───────────────┘       └───────────────┘
```

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable animation community platform. The modular design allows for easy feature additions and future enhancements while maintaining clean separation of concerns.
