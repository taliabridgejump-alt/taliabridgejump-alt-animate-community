const express = require('express');
const router = express.Router();
const voiceForgeService = require('../services/voiceForgeService');
const authMiddleware = require('../middleware/auth');

// Get available voices
router.get('/voices', authMiddleware, (req, res) => {
  try {
    const voices = voiceForgeService.getVoices();
    res.json({ voices });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching voices', error: error.message });
  }
});

// Generate text-to-speech
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    
    if (voiceId && !voiceForgeService.validateVoice(voiceId)) {
      return res.status(400).json({ message: 'Invalid voice ID' });
    }
    
    const result = await voiceForgeService.textToSpeech(text, voiceId);
    res.json(result);
  } catch (error) {
    console.error('TTS generation error:', error);
    res.status(500).json({ message: 'Error generating speech', error: error.message });
  }
});

module.exports = router;
