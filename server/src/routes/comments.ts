import express from 'express';
import Comment from '../models/Comment';
import User from '../models/User';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get comments for a video
router.get('/video/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const { videoId, text } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const comment = new Comment({
      video: videoId,
      user: req.userId,
      username: user.username,
      text
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment
router.delete('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Comment.deleteOne({ _id: comment._id });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
