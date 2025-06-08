// Database types - separated from database connection to avoid client-side imports
export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category_id: string;
  author: string;
  featured_image?: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  view_count: number;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  description?: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  tutorial_id: string;
  parent_id?: string;
  author_name: string;
  author_email: string;
  content: string;
  approved: boolean;
  created_at: string;
  updated_at: string;
  reply_count?: number;
  tutorial_title?: string;
  tutorial_slug?: string;
}

export interface Bookmark {
  id: string;
  tutorial_id: string;
  user_ip: string;
  created_at: string;
}

export interface TutorialProgress {
  id: string;
  tutorial_id: string;
  user_ip: string;
  progress_percentage: number;
  completed: boolean;
  last_accessed: string;
  created_at: string;
}

export interface Rating {
  id: string;
  tutorial_id: string;
  user_ip: string;
  rating: number;
  review?: string;
  created_at: string;
  updated_at: string;
}
