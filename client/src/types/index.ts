export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  createdAt: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploader: string;
  uploaderName: string;
  tags: string[];
  category: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  _id: string;
  video: string;
  user: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
