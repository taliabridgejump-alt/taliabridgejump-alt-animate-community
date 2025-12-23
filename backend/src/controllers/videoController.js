const Video = require('../models/Video');
const User = require('../models/User');

// Get all public videos for community library
exports.getAllVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const videos = await Video.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'username');
    
    const total = await Video.countDocuments({ isPublic: true });
    
    res.json({
      videos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Get user's videos
exports.getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json({ videos });
  } catch (error) {
    console.error('Get user videos error:', error);
    res.status(500).json({ message: 'Error fetching user videos', error: error.message });
  }
};

// Get single video
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('userId', 'username');
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Increment views
    video.views += 1;
    await video.save();
    
    res.json({ video });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
};

// Create new video
exports.createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, duration } = req.body;
    
    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      userId: req.userId,
      username: req.username
    });
    
    await video.save();
    
    res.status(201).json({
      message: 'Video created successfully',
      video
    });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ message: 'Error creating video', error: error.message });
  }
};

// Update video
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Check ownership
    if (video.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this video' });
    }
    
    const { title, description, thumbnailUrl, isPublic } = req.body;
    
    if (title) video.title = title;
    if (description !== undefined) video.description = description;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;
    if (isPublic !== undefined) video.isPublic = isPublic;
    
    await video.save();
    
    res.json({
      message: 'Video updated successfully',
      video
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ message: 'Error updating video', error: error.message });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Check ownership
    if (video.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }
    
    await video.deleteOne();
    
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};

// Like video
exports.likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    video.likes += 1;
    await video.save();
    
    res.json({
      message: 'Video liked successfully',
      likes: video.likes
    });
  } catch (error) {
    console.error('Like video error:', error);
    res.status(500).json({ message: 'Error liking video', error: error.message });
  }
};
