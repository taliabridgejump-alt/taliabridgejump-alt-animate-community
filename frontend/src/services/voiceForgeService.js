import api from './api';

export const voiceForgeService = {
  getVoices: async () => {
    const response = await api.get('/voiceforge/voices');
    return response.data.voices;
  },

  generateSpeech: async (text, voiceId) => {
    const response = await api.post('/voiceforge/generate', { text, voiceId });
    return response.data;
  }
};
