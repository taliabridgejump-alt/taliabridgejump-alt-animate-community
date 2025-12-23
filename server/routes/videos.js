const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const auth = require('../middleware/auth');

// @route   GET /api/videos
// @desc    Get all public videos
// @access  Private (requires authentication)
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Server error fetching videos' });
  }
});

// @route   GET /api/videos/:id
// @desc    Get a single video by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Increment view count
    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Server error fetching video' });
  }
});

// @route   POST /api/videos
// @desc    Create a new video
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, duration, tags } = req.body;

    const video = new Video({
      title,
      description,
      creator: req.user.username,
      userId: req.user._id,
      videoUrl,
      thumbnailUrl,
      duration,
      tags: tags || []
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ message: 'Server error creating video' });
  }
});

// @route   PUT /api/videos/:id
// @desc    Update a video
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if user is the creator
    if (video.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this video' });
    }

    // Update fields
    const { title, description, videoUrl, thumbnailUrl, duration, tags, isPublic } = req.body;
    
    if (title) video.title = title;
    if (description) video.description = description;
    if (videoUrl) video.videoUrl = videoUrl;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;
    if (duration) video.duration = duration;
    if (tags) video.tags = tags;
    if (typeof isPublic === 'boolean') video.isPublic = isPublic;

    await video.save();
    res.json(video);
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Server error updating video' });
  }
});

// @route   DELETE /api/videos/:id
// @desc    Delete a video
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if user is the creator
    if (video.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    await video.deleteOne();
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Server error deleting video' });
  }
});

// @route   GET /api/videos/user/:userId
// @desc    Get videos by user
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    
    res.json(videos);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ message: 'Server error fetching user videos' });
  }
});

module.exports = router;
