import express from 'express';
import Video from '../models/Video';
import Like from '../models/Like';
import Bookmark from '../models/Bookmark';
import User from '../models/User';
import { auth, optionalAuth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all videos with search, filter, and sort
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { search, category, sort = '-createdAt', page = '1', limit = '12' } = req.query;
    const query: any = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search as string };
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Sort options
    let sortOption: any = {};
    switch (sort) {
      case 'popularity':
        sortOption = { likes: -1, views: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const videos = await Video.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const total = await Video.countDocuments(query);

    // If user is logged in, check liked and bookmarked status
    let videosWithStatus = videos;
    if (req.userId) {
      const likes = await Like.find({ user: req.userId, video: { $in: videos.map(v => v._id) } });
      const bookmarks = await Bookmark.find({ user: req.userId, video: { $in: videos.map(v => v._id) } });
      
      const likedVideoIds = new Set(likes.map(l => l.video.toString()));
      const bookmarkedVideoIds = new Set(bookmarks.map(b => b.video.toString()));

      videosWithStatus = videos.map((video: any) => ({
        ...video.toObject(),
        isLiked: likedVideoIds.has(video._id.toString()),
        isBookmarked: bookmarkedVideoIds.has(video._id.toString())
      }));
    }

    res.json({
      videos: videosWithStatus,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalVideos: total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single video
router.get('/:id', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Increment views
    video.views += 1;
    await video.save();

    let videoData: any = video.toObject();
    
    if (req.userId) {
      const liked = await Like.findOne({ user: req.userId, video: video._id });
      const bookmarked = await Bookmark.findOne({ user: req.userId, video: video._id });
      videoData.isLiked = !!liked;
      videoData.isBookmarked = !!bookmarked;
    }

    res.json(videoData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get videos by user
router.get('/user/:userId', async (req, res) => {
  try {
    const videos = await Video.find({ uploader: req.params.userId }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload video (auth required)
router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, tags, category } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      uploader: req.userId,
      uploaderName: user.username,
      tags,
      category
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like video
router.post('/:id/like', auth, async (req: AuthRequest, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const existingLike = await Like.findOne({ user: req.userId, video: video._id });
    
    if (existingLike) {
      // Unlike
      await Like.deleteOne({ _id: existingLike._id });
      video.likes -= 1;
      await video.save();
      res.json({ liked: false, likes: video.likes });
    } else {
      // Like
      const like = new Like({ user: req.userId, video: video._id });
      await like.save();
      video.likes += 1;
      await video.save();
      res.json({ liked: true, likes: video.likes });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Bookmark video
router.post('/:id/bookmark', auth, async (req: AuthRequest, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const existingBookmark = await Bookmark.findOne({ user: req.userId, video: video._id });
    
    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      res.json({ bookmarked: false });
    } else {
      // Add bookmark
      const bookmark = new Bookmark({ user: req.userId, video: video._id });
      await bookmark.save();
      res.json({ bookmarked: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookmarked videos
router.get('/bookmarks/me', auth, async (req: AuthRequest, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.userId }).populate('video');
    const videos = bookmarks.map(b => b.video);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
