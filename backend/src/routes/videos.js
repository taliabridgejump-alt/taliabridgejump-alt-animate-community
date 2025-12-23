const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideo);

// Protected routes
router.get('/user/my-videos', authMiddleware, videoController.getUserVideos);
router.post('/', authMiddleware, videoController.createVideo);
router.put('/:id', authMiddleware, videoController.updateVideo);
router.delete('/:id', authMiddleware, videoController.deleteVideo);
router.post('/:id/like', authMiddleware, videoController.likeVideo);

module.exports = router;
