// Client-side content service that uses API routes instead of direct database access
import type { Tutorial, Category, Page } from './types';

export class ContentClientService {
  // Utility methods
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
  // Categories
  static async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const response = await fetch(`/api/categories/${slug}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  // Tutorials
  static async getTutorials(categorySlug?: string, publishedOnly = true): Promise<Tutorial[]> {
    try {
      const params = new URLSearchParams();
      if (categorySlug) params.append('category', categorySlug);
      if (publishedOnly) params.append('published', 'true');

      const response = await fetch(`/api/tutorials?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tutorials');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      return [];
    }
  }

  static async getTutorialBySlug(slug: string): Promise<Tutorial | null> {
    try {
      const response = await fetch(`/api/tutorials/${slug}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch tutorial');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      return null;
    }
  }

  static async getTutorialById(id: string): Promise<Tutorial | null> {
    try {
      const response = await fetch(`/api/admin/tutorials/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch tutorial');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      return null;
    }
  }

  static async searchTutorials(searchQuery: string): Promise<Tutorial[]> {
    try {
      const params = new URLSearchParams({ q: searchQuery });
      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to search tutorials');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching tutorials:', error);
      return [];
    }
  }

  // Admin operations
  static async createTutorial(tutorial: Partial<Tutorial>): Promise<Tutorial | null> {
    try {
      const response = await fetch('/api/admin/tutorials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(tutorial),
      });

      if (!response.ok) {
        throw new Error('Failed to create tutorial');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating tutorial:', error);
      return null;
    }
  }

  static async updateTutorial(id: string, tutorial: Partial<Tutorial>): Promise<Tutorial | null> {
    try {
      const response = await fetch(`/api/admin/tutorials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(tutorial),
      });

      if (!response.ok) {
        throw new Error('Failed to update tutorial');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating tutorial:', error);
      return null;
    }
  }

  static async deleteTutorial(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/admin/tutorials/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      return false;
    }
  }

  static async createCategory(category: Partial<Category>): Promise<Category | null> {
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  }

  static async updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      return null;
    }
  }

  static async deleteCategory(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  // Pages
  static async getPages(): Promise<Page[]> {
    try {
      const response = await fetch('/api/admin/pages', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  static async createPage(page: Partial<Page>): Promise<Page | null> {
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(page),
      });

      if (!response.ok) {
        throw new Error('Failed to create page');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating page:', error);
      return null;
    }
  }

  static async updatePage(id: string, page: Partial<Page>): Promise<Page | null> {
    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(page),
      });

      if (!response.ok) {
        throw new Error('Failed to update page');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating page:', error);
      return null;
    }
  }

  static async deletePage(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting page:', error);
      return false;
    }
  }
}
