import { query } from './supabase';
import type { Tutorial, Category, Page } from './types';

interface TutorialRow {
  id: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  category_color: string;
  category_icon: string;
  search_rank?: number;
  [key: string]: any;
}

interface CommentRow {
  id: string;
  tutorial_id: string;
  parent_id?: string;
  author_name: string;
  author_email: string;
  content: string;
  approved: boolean;
  created_at: string;
  reply_count?: number;
  [key: string]: any;
}

interface ProgressRow {
  tutorial_id: string;
  title: string;
  slug: string;
  featured_image: string;
  difficulty: string;
  duration: number;
  category_name?: string;
  category_color?: string;
  progress_percentage: number;
  completed: boolean;
  last_accessed: string;
  [key: string]: any;
}

export class ContentService {
  // Expose query method for advanced operations
  static query = query;

  // Categories
  static async getCategories(): Promise<Category[]> {
    try {
      const result = await query(
        'SELECT * FROM categories ORDER BY order_index'
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const result = await query(
        'SELECT * FROM categories WHERE slug = $1',
        [slug]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  // Tutorials
  static async getTutorials(categorySlug?: string, published = true): Promise<Tutorial[]> {
    try {
      let queryText = `
        SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color, c.icon as category_icon
        FROM tutorials t
        LEFT JOIN categories c ON t.category_id = c.id
      `;
      const params: any[] = [];
      const conditions: string[] = [];

      if (published) {
        conditions.push('t.published = $' + (params.length + 1));
        params.push(true);
      }

      if (categorySlug) {
        conditions.push('c.slug = $' + (params.length + 1));
        params.push(categorySlug);
      }

      if (conditions.length > 0) {
        queryText += ' WHERE ' + conditions.join(' AND ');
      }

      queryText += ' ORDER BY t.created_at DESC';

      const result = await query(queryText, params);

      // Transform the result to include category object
      return result.rows.map((row: TutorialRow) => ({
        ...row,
        category: row.category_name ? {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          color: row.category_color,
          icon: row.category_icon
        } : null
      }));
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      return [];
    }
  }

  static async getTutorialBySlug(slug: string): Promise<Tutorial | null> {
    try {
      const result = await query(`
        SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color, c.icon as category_icon
        FROM tutorials t
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE t.slug = $1
      `, [slug]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      // Increment view count
      await query(
        'UPDATE tutorials SET view_count = view_count + 1 WHERE id = $1',
        [row.id]
      );

      // Transform the result to include category object
      return {
        ...row,
        category: row.category_name ? {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          color: row.category_color,
          icon: row.category_icon
        } : null
      };
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      return null;
    }
  }

  static async searchTutorials(
    searchQuery: string,
    filters: {
      category?: string;
      difficulty?: string;
      tags?: string[];
      sortBy?: 'relevance' | 'date' | 'views' | 'title';
      sortOrder?: 'asc' | 'desc';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ tutorials: Tutorial[]; total: number }> {
    try {
      const {
        category,
        difficulty,
        tags = [],
        sortBy = 'relevance',
        sortOrder = 'desc',
        limit = 20,
        offset = 0
      } = filters;

      let whereConditions = ['t.published = true'];
      let queryParams: any[] = [];
      let paramIndex = 1;

      // Full-text search
      if (searchQuery.trim()) {
        whereConditions.push(`(
          to_tsvector('english', t.title || ' ' || COALESCE(t.description, '') || ' ' || COALESCE(t.content, ''))
          @@ plainto_tsquery('english', $${paramIndex})
          OR t.title ILIKE $${paramIndex + 1}
          OR t.description ILIKE $${paramIndex + 1}
          OR $${paramIndex + 2} = ANY(t.tags)
        )`);
        queryParams.push(searchQuery, `%${searchQuery}%`, searchQuery);
        paramIndex += 3;
      }

      // Category filter
      if (category) {
        whereConditions.push(`t.category_id = $${paramIndex}`);
        queryParams.push(category);
        paramIndex++;
      }

      // Difficulty filter
      if (difficulty) {
        whereConditions.push(`t.difficulty = $${paramIndex}`);
        queryParams.push(difficulty);
        paramIndex++;
      }

      // Tags filter
      if (tags.length > 0) {
        whereConditions.push(`t.tags && $${paramIndex}`);
        queryParams.push(tags);
        paramIndex++;
      }

      // Build ORDER BY clause
      let orderBy = '';
      switch (sortBy) {
        case 'relevance':
          if (searchQuery.trim()) {
            orderBy = `ts_rank(to_tsvector('english', t.title || ' ' || COALESCE(t.description, '') || ' ' || COALESCE(t.content, '')), plainto_tsquery('english', $1)) DESC, t.view_count DESC`;
          } else {
            orderBy = 't.view_count DESC, t.created_at DESC';
          }
          break;
        case 'date':
          orderBy = `t.created_at ${sortOrder.toUpperCase()}`;
          break;
        case 'views':
          orderBy = `t.view_count ${sortOrder.toUpperCase()}`;
          break;
        case 'title':
          orderBy = `t.title ${sortOrder.toUpperCase()}`;
          break;
        default:
          orderBy = 't.created_at DESC';
      }

      // Count query
      const countQuery = `
        SELECT COUNT(*) as total
        FROM tutorials t
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE ${whereConditions.join(' AND ')}
      `;

      // Main query
      const mainQuery = `
        SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color, c.icon as category_icon,
               CASE
                 WHEN $1 IS NOT NULL AND $1 != '' THEN
                   ts_rank(to_tsvector('english', t.title || ' ' || COALESCE(t.description, '') || ' ' || COALESCE(t.content, '')), plainto_tsquery('english', $1))
                 ELSE 0
               END as search_rank
        FROM tutorials t
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE ${whereConditions.join(' AND ')}
        ORDER BY ${orderBy}
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `;

      queryParams.push(limit, offset);

      const [countResult, mainResult] = await Promise.all([
        query(countQuery, queryParams.slice(0, -2)), // Remove limit and offset for count
        query(mainQuery, [searchQuery.trim() || null, ...queryParams.slice(searchQuery.trim() ? 3 : 0)])
      ]);

      // Transform the result to include category object
      const tutorials = mainResult.rows.map((row: TutorialRow) => ({
        ...row,
        category: row.category_name ? {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          color: row.category_color,
          icon: row.category_icon
        } : null
      }));

      return {
        tutorials,
        total: parseInt(countResult.rows[0].total)
      };
    } catch (error) {
      console.error('Error searching tutorials:', error);
      return { tutorials: [], total: 0 };
    }
  }

  static async getTutorialById(id: string): Promise<Tutorial | null> {
    try {
      const result = await query(`
        SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color, c.icon as category_icon
        FROM tutorials t
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE t.id = $1
      `, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      // Transform the result to include category object
      return {
        ...row,
        category: row.category_name ? {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          color: row.category_color,
          icon: row.category_icon
        } : null
      };
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      return null;
    }
  }

  // Pages
  static async getPageBySlug(slug: string): Promise<Page | null> {
    try {
      const result = await query(
        'SELECT * FROM pages WHERE slug = $1 AND published = true',
        [slug]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  // Admin functions (require authentication)
  static async createTutorial(tutorial: Partial<Tutorial>): Promise<Tutorial | null> {
    try {
      const result = await query(`
        INSERT INTO tutorials (title, slug, description, content, category_id, author, featured_image, tags, difficulty, duration, published)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `, [
        tutorial.title,
        tutorial.slug,
        tutorial.description,
        tutorial.content,
        tutorial.category_id,
        tutorial.author || 'EasyioLabs',
        tutorial.featured_image,
        tutorial.tags || [],
        tutorial.difficulty || 'Beginner',
        tutorial.duration,
        tutorial.published || false
      ]);

      return result.rows[0];
    } catch (error) {
      console.error('Error creating tutorial:', error);
      return null;
    }
  }

  static async updateTutorial(id: string, updates: Partial<Tutorial>): Promise<Tutorial | null> {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          fields.push(`${key} = $${paramIndex}`);
          values.push(value);
          paramIndex++;
        }
      });

      if (fields.length === 0) {
        return null;
      }

      values.push(id);
      const result = await query(`
        UPDATE tutorials
        SET ${fields.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
      `, values);

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating tutorial:', error);
      return null;
    }
  }

  static async deleteTutorial(id: string): Promise<boolean> {
    try {
      await query('DELETE FROM tutorials WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      return false;
    }
  }

  static async createCategory(category: Partial<Category>): Promise<Category | null> {
    try {
      const result = await query(`
        INSERT INTO categories (name, slug, description, color, icon, order_index)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [
        category.name,
        category.slug,
        category.description,
        category.color || 'bg-blue-500',
        category.icon || 'BookOpen',
        category.order_index || 0
      ]);

      return result.rows[0];
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  }

  static async updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          fields.push(`${key} = $${paramIndex}`);
          values.push(value);
          paramIndex++;
        }
      });

      if (fields.length === 0) {
        return null;
      }

      values.push(id);
      const result = await query(`
        UPDATE categories
        SET ${fields.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
      `, values);

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating category:', error);
      return null;
    }
  }

  static async deleteCategory(id: string): Promise<boolean> {
    try {
      await query('DELETE FROM categories WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  // Pages
  static async getPages(): Promise<Page[]> {
    try {
      const result = await query(
        'SELECT * FROM pages ORDER BY created_at DESC'
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  static async createPage(page: Partial<Page>): Promise<Page | null> {
    try {
      const result = await query(`
        INSERT INTO pages (title, slug, content, meta_description, published)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `, [
        page.title,
        page.slug,
        page.content,
        page.meta_description,
        page.published || false
      ]);

      return result.rows[0];
    } catch (error) {
      console.error('Error creating page:', error);
      return null;
    }
  }

  static async updatePage(id: string, updates: Partial<Page>): Promise<Page | null> {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          fields.push(`${key} = $${paramIndex}`);
          values.push(value);
          paramIndex++;
        }
      });

      if (fields.length === 0) {
        return null;
      }

      values.push(id);
      const result = await query(`
        UPDATE pages
        SET ${fields.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
      `, values);

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating page:', error);
      return null;
    }
  }

  static async deletePage(id: string): Promise<boolean> {
    try {
      await query('DELETE FROM pages WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error('Error deleting page:', error);
      return false;
    }
  }

  // Generate slug from title
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Rating and Review System
  static async saveRating(
    tutorialId: string,
    userIP: string,
    rating: number,
    review?: string
  ): Promise<{ success: boolean; rating?: any; error?: string }> {
    try {
      // Insert or update rating
      const result = await query(`
        INSERT INTO ratings (tutorial_id, user_ip, rating, review)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (tutorial_id, user_ip)
        DO UPDATE SET rating = $3, review = $4, updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `, [tutorialId, userIP, rating, review]);

      // Update tutorial rating statistics
      await this.updateTutorialRatingStats(tutorialId);

      return { success: true, rating: result.rows[0] };
    } catch (error) {
      console.error('Error saving rating:', error);
      return { success: false, error: 'Failed to save rating' };
    }
  }

  static async getUserRating(tutorialId: string, userIP: string): Promise<any> {
    try {
      const result = await query(
        'SELECT * FROM ratings WHERE tutorial_id = $1 AND user_ip = $2',
        [tutorialId, userIP]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting user rating:', error);
      return null;
    }
  }

  static async getTutorialRatingStats(tutorialId: string): Promise<{
    averageRating: number;
    ratingCount: number;
    ratingDistribution: { [key: number]: number };
  }> {
    try {
      const result = await query(`
        SELECT
          COALESCE(AVG(rating), 0) as average_rating,
          COUNT(*) as rating_count,
          COUNT(CASE WHEN rating = 1 THEN 1 END) as rating_1,
          COUNT(CASE WHEN rating = 2 THEN 1 END) as rating_2,
          COUNT(CASE WHEN rating = 3 THEN 1 END) as rating_3,
          COUNT(CASE WHEN rating = 4 THEN 1 END) as rating_4,
          COUNT(CASE WHEN rating = 5 THEN 1 END) as rating_5
        FROM ratings
        WHERE tutorial_id = $1
      `, [tutorialId]);

      const stats = result.rows[0];

      return {
        averageRating: parseFloat(stats.average_rating) || 0,
        ratingCount: parseInt(stats.rating_count) || 0,
        ratingDistribution: {
          1: parseInt(stats.rating_1) || 0,
          2: parseInt(stats.rating_2) || 0,
          3: parseInt(stats.rating_3) || 0,
          4: parseInt(stats.rating_4) || 0,
          5: parseInt(stats.rating_5) || 0
        }
      };
    } catch (error) {
      console.error('Error getting rating stats:', error);
      return {
        averageRating: 0,
        ratingCount: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
  }

  private static async updateTutorialRatingStats(tutorialId: string): Promise<void> {
    try {
      await query(`
        UPDATE tutorials
        SET
          average_rating = (SELECT COALESCE(AVG(rating), 0) FROM ratings WHERE tutorial_id = $1),
          rating_count = (SELECT COUNT(*) FROM ratings WHERE tutorial_id = $1)
        WHERE id = $1
      `, [tutorialId]);
    } catch (error) {
      console.error('Error updating tutorial rating stats:', error);
    }
  }

  // Comments System
  static async getComments(tutorialId: string): Promise<any[]> {
    try {
      const result = await query(`
        SELECT
          c.*,
          (SELECT COUNT(*) FROM comments WHERE parent_id = c.id) as reply_count
        FROM comments c
        WHERE c.tutorial_id = $1 AND c.approved = true
        ORDER BY c.created_at DESC
      `, [tutorialId]);

      return result.rows;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  static async getCommentReplies(parentId: string): Promise<any[]> {
    try {
      const result = await query(`
        SELECT * FROM comments
        WHERE parent_id = $1 AND approved = true
        ORDER BY created_at ASC
      `, [parentId]);

      return result.rows;
    } catch (error) {
      console.error('Error fetching comment replies:', error);
      return [];
    }
  }

  static async createComment(
    tutorialId: string,
    authorName: string,
    authorEmail: string,
    content: string,
    parentId?: string
  ): Promise<{ success: boolean; comment?: any; error?: string }> {
    try {
      const result = await query(`
        INSERT INTO comments (tutorial_id, parent_id, author_name, author_email, content, approved)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [tutorialId, parentId || null, authorName, authorEmail, content, false]); // Comments require approval

      return { success: true, comment: result.rows[0] };
    } catch (error) {
      console.error('Error creating comment:', error);
      return { success: false, error: 'Failed to create comment' };
    }
  }

  // Admin comment management
  static async getAllComments(approved?: boolean): Promise<any[]> {
    try {
      let queryText = `
        SELECT
          c.*,
          t.title as tutorial_title,
          t.slug as tutorial_slug,
          (SELECT COUNT(*) FROM comments WHERE parent_id = c.id) as reply_count
        FROM comments c
        LEFT JOIN tutorials t ON c.tutorial_id = t.id
      `;

      const params: any[] = [];
      if (approved !== undefined) {
        queryText += ' WHERE c.approved = $1';
        params.push(approved);
      }

      queryText += ' ORDER BY c.created_at DESC';

      const result = await query(queryText, params);
      return result.rows;
    } catch (error) {
      console.error('Error fetching all comments:', error);
      return [];
    }
  }

  static async approveComment(commentId: string): Promise<boolean> {
    try {
      await query('UPDATE comments SET approved = true WHERE id = $1', [commentId]);
      return true;
    } catch (error) {
      console.error('Error approving comment:', error);
      return false;
    }
  }

  static async deleteComment(commentId: string): Promise<boolean> {
    try {
      // Delete comment and all its replies (CASCADE will handle this)
      await query('DELETE FROM comments WHERE id = $1', [commentId]);
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  }

  // Bookmarks System
  static async toggleBookmark(tutorialId: string, userIP: string): Promise<{
    success: boolean;
    bookmarked: boolean;
    error?: string
  }> {
    try {
      // Check if bookmark exists
      const existingResult = await query(
        'SELECT id FROM bookmarks WHERE tutorial_id = $1 AND user_ip = $2',
        [tutorialId, userIP]
      );

      if (existingResult.rows.length > 0) {
        // Remove bookmark
        await query(
          'DELETE FROM bookmarks WHERE tutorial_id = $1 AND user_ip = $2',
          [tutorialId, userIP]
        );
        return { success: true, bookmarked: false };
      } else {
        // Add bookmark
        await query(
          'INSERT INTO bookmarks (tutorial_id, user_ip) VALUES ($1, $2)',
          [tutorialId, userIP]
        );
        return { success: true, bookmarked: true };
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      return { success: false, bookmarked: false, error: 'Failed to toggle bookmark' };
    }
  }

  static async getUserBookmarks(userIP: string): Promise<Tutorial[]> {
    try {
      const result = await query(`
        SELECT
          t.*,
          c.name as category_name,
          c.slug as category_slug,
          c.color as category_color,
          c.icon as category_icon,
          b.created_at as bookmarked_at
        FROM bookmarks b
        JOIN tutorials t ON b.tutorial_id = t.id
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE b.user_ip = $1 AND t.published = true
        ORDER BY b.created_at DESC
      `, [userIP]);

      return result.rows.map((row: TutorialRow) => ({
        ...row,
        category: row.category_name ? {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          color: row.category_color,
          icon: row.category_icon
        } : null
      }));
    } catch (error) {
      console.error('Error fetching user bookmarks:', error);
      return [];
    }
  }

  static async isBookmarked(tutorialId: string, userIP: string): Promise<boolean> {
    try {
      const result = await query(
        'SELECT id FROM bookmarks WHERE tutorial_id = $1 AND user_ip = $2',
        [tutorialId, userIP]
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  }

  // Progress Tracking System
  static async updateProgress(
    tutorialId: string,
    userIP: string,
    progressPercentage: number,
    completed: boolean = false
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await query(`
        INSERT INTO tutorial_progress (tutorial_id, user_ip, progress_percentage, completed, last_accessed)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        ON CONFLICT (tutorial_id, user_ip)
        DO UPDATE SET
          progress_percentage = $3,
          completed = $4,
          last_accessed = CURRENT_TIMESTAMP
      `, [tutorialId, userIP, progressPercentage, completed]);

      return { success: true };
    } catch (error) {
      console.error('Error updating progress:', error);
      return { success: false, error: 'Failed to update progress' };
    }
  }

  static async getUserProgress(tutorialId: string, userIP: string): Promise<any> {
    try {
      const result = await query(
        'SELECT * FROM tutorial_progress WHERE tutorial_id = $1 AND user_ip = $2',
        [tutorialId, userIP]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }
  }

  static async getUserProgressOverview(userIP: string): Promise<any[]> {
    try {
      const result = await query(`
        SELECT
          tp.*,
          t.title,
          t.slug,
          t.featured_image,
          t.difficulty,
          t.duration,
          c.name as category_name,
          c.color as category_color
        FROM tutorial_progress tp
        JOIN tutorials t ON tp.tutorial_id = t.id
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE tp.user_ip = $1 AND t.published = true
        ORDER BY tp.last_accessed DESC
      `, [userIP]);

      return result.rows.map((row: ProgressRow) => ({
        ...row,
        tutorial: {
          id: row.tutorial_id,
          title: row.title,
          slug: row.slug,
          featured_image: row.featured_image,
          difficulty: row.difficulty,
          duration: row.duration,
          category: row.category_name ? {
            name: row.category_name,
            color: row.category_color
          } : null
        }
      }));
    } catch (error) {
      console.error('Error fetching user progress overview:', error);
      return [];
    }
  }

  static async getProgressStats(userIP: string): Promise<{
    totalTutorials: number;
    completedTutorials: number;
    inProgressTutorials: number;
    averageProgress: number;
  }> {
    try {
      const result = await query(`
        SELECT
          COUNT(*) as total_tutorials,
          COUNT(CASE WHEN completed = true THEN 1 END) as completed_tutorials,
          COUNT(CASE WHEN completed = false AND progress_percentage > 0 THEN 1 END) as in_progress_tutorials,
          COALESCE(AVG(progress_percentage), 0) as average_progress
        FROM tutorial_progress tp
        JOIN tutorials t ON tp.tutorial_id = t.id
        WHERE tp.user_ip = $1 AND t.published = true
      `, [userIP]);

      const stats = result.rows[0];
      return {
        totalTutorials: parseInt(stats.total_tutorials),
        completedTutorials: parseInt(stats.completed_tutorials),
        inProgressTutorials: parseInt(stats.in_progress_tutorials),
        averageProgress: parseFloat(stats.average_progress)
      };
    } catch (error) {
      console.error('Error fetching progress stats:', error);
      return {
        totalTutorials: 0,
        completedTutorials: 0,
        inProgressTutorials: 0,
        averageProgress: 0
      };
    }
  }
}
