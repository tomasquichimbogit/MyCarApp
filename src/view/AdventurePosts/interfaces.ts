export interface IAdventurePost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  content: string;
  videoId: string;
  location?: string;
  createdAt: string;
  likes: number;
  comments: number;
  tags?: string[];
}
