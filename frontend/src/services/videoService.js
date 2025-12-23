import api from './api';

export const videoService = {
  getAllVideos: async (page = 1, limit = 20) => {
    const response = await api.get(`/videos?page=${page}&limit=${limit}`);
    return response.data;
  },

  getUserVideos: async () => {
    const response = await api.get('/videos/user/my-videos');
    return response.data.videos;
  },

  getVideo: async (id) => {
    const response = await api.get(`/videos/${id}`);
    return response.data.video;
  },

  createVideo: async (videoData) => {
    const response = await api.post('/videos', videoData);
    return response.data;
  },

  updateVideo: async (id, videoData) => {
    const response = await api.put(`/videos/${id}`, videoData);
    return response.data;
  },

  deleteVideo: async (id) => {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  },

  likeVideo: async (id) => {
    const response = await api.post(`/videos/${id}/like`);
    return response.data;
  }
};
