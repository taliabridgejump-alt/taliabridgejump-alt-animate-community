import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  getProfile: async (userId: string) => {
    const response = await api.get(`/auth/profile/${userId}`);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const videoService = {
  getVideos: async (params?: {
    search?: string;
    category?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/videos', { params });
    return response.data;
  },
  
  getVideo: async (id: string) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },
  
  getUserVideos: async (userId: string) => {
    const response = await api.get(`/videos/user/${userId}`);
    return response.data;
  },
  
  uploadVideo: async (videoData: {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    tags: string[];
    category: string;
  }) => {
    const response = await api.post('/videos', videoData);
    return response.data;
  },
  
  likeVideo: async (id: string) => {
    const response = await api.post(`/videos/${id}/like`);
    return response.data;
  },
  
  bookmarkVideo: async (id: string) => {
    const response = await api.post(`/videos/${id}/bookmark`);
    return response.data;
  },
  
  getBookmarkedVideos: async () => {
    const response = await api.get('/videos/bookmarks/me');
    return response.data;
  },
};

export const commentService = {
  getComments: async (videoId: string) => {
    const response = await api.get(`/comments/video/${videoId}`);
    return response.data;
  },
  
  addComment: async (videoId: string, text: string) => {
    const response = await api.post('/comments', { videoId, text });
    return response.data;
  },
  
  deleteComment: async (id: string) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },
};

export default api;
