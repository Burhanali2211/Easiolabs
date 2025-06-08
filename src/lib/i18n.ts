import { query } from './supabase';

interface TranslationRow {
  translation_key: string;
  translation_value: string;
}

export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  enabled: boolean;
  is_default: boolean;
  created_at: string;
}

export interface Translation {
  id: string;
  language_id: string;
  translation_key: string;
  translation_value: string;
  context: string;
  created_at: string;
  updated_at: string;
}

export interface ContentTranslation {
  id: string;
  content_type: string;
  content_id: string;
  language_id: string;
  title?: string;
  content?: string;
  description?: string;
  metadata?: any;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export class I18nService {
  // Language Management
  static async getLanguages(): Promise<Language[]> {
    try {
      const result = await query('SELECT * FROM languages WHERE enabled = TRUE ORDER BY is_default DESC, name ASC');
      return result.rows;
    } catch (error) {
      console.error('Error fetching languages:', error);
      return [];
    }
  }

  static async getDefaultLanguage(): Promise<Language | null> {
    try {
      const result = await query('SELECT * FROM languages WHERE is_default = TRUE LIMIT 1');
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching default language:', error);
      return null;
    }
  }

  static async addLanguage(
    code: string,
    name: string,
    nativeName: string,
    enabled: boolean = true
  ): Promise<{ success: boolean; language?: Language; error?: string }> {
    try {
      const result = await query(`
        INSERT INTO languages (code, name, native_name, enabled)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [code, name, nativeName, enabled]);

      return { success: true, language: result.rows[0] };
    } catch (error) {
      console.error('Error adding language:', error);
      return { success: false, error: 'Failed to add language' };
    }
  }

  static async updateLanguage(
    languageId: string,
    updates: Partial<Pick<Language, 'name' | 'native_name' | 'enabled'>>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
      const values = [languageId, ...Object.values(updates)];

      await query(`UPDATE languages SET ${setClause} WHERE id = $1`, values);
      return { success: true };
    } catch (error) {
      console.error('Error updating language:', error);
      return { success: false, error: 'Failed to update language' };
    }
  }

  static async setDefaultLanguage(languageId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Remove default from all languages
      await query('UPDATE languages SET is_default = FALSE');
      // Set new default
      await query('UPDATE languages SET is_default = TRUE WHERE id = $1', [languageId]);
      return { success: true };
    } catch (error) {
      console.error('Error setting default language:', error);
      return { success: false, error: 'Failed to set default language' };
    }
  }

  // Translation Management
  static async getTranslations(languageCode: string, context?: string): Promise<Record<string, string>> {
    try {
      let queryText = `
        SELECT t.translation_key, t.translation_value
        FROM translations t
        JOIN languages l ON t.language_id = l.id
        WHERE l.code = $1
      `;
      const params = [languageCode];

      if (context) {
        queryText += ' AND t.context = $2';
        params.push(context);
      }

      const result = await query(queryText, params);

      const translations: Record<string, string> = {};
      result.rows.forEach((row: TranslationRow) => {
        translations[row.translation_key] = row.translation_value;
      });

      return translations;
    } catch (error) {
      console.error('Error fetching translations:', error);
      return {};
    }
  }

  static async setTranslation(
    languageCode: string,
    key: string,
    value: string,
    context: string = 'ui'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get language ID
      const langResult = await query('SELECT id FROM languages WHERE code = $1', [languageCode]);
      if (langResult.rows.length === 0) {
        return { success: false, error: 'Language not found' };
      }
      const languageId = langResult.rows[0].id;

      // Upsert translation
      await query(`
        INSERT INTO translations (language_id, translation_key, translation_value, context)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (language_id, translation_key)
        DO UPDATE SET translation_value = $3, context = $4, updated_at = CURRENT_TIMESTAMP
      `, [languageId, key, value, context]);

      return { success: true };
    } catch (error) {
      console.error('Error setting translation:', error);
      return { success: false, error: 'Failed to set translation' };
    }
  }

  static async deleteTranslation(languageCode: string, key: string): Promise<{ success: boolean; error?: string }> {
    try {
      await query(`
        DELETE FROM translations 
        WHERE language_id = (SELECT id FROM languages WHERE code = $1) 
        AND translation_key = $2
      `, [languageCode, key]);

      return { success: true };
    } catch (error) {
      console.error('Error deleting translation:', error);
      return { success: false, error: 'Failed to delete translation' };
    }
  }

  // Content Translation
  static async getContentTranslation(
    contentType: string,
    contentId: string,
    languageCode: string
  ): Promise<ContentTranslation | null> {
    try {
      const result = await query(`
        SELECT ct.*
        FROM content_translations ct
        JOIN languages l ON ct.language_id = l.id
        WHERE ct.content_type = $1 AND ct.content_id = $2 AND l.code = $3
      `, [contentType, contentId, languageCode]);

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching content translation:', error);
      return null;
    }
  }

  static async setContentTranslation(
    contentType: string,
    contentId: string,
    languageCode: string,
    translation: {
      title?: string;
      content?: string;
      description?: string;
      metadata?: any;
      published?: boolean;
    }
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get language ID
      const langResult = await query('SELECT id FROM languages WHERE code = $1', [languageCode]);
      if (langResult.rows.length === 0) {
        return { success: false, error: 'Language not found' };
      }
      const languageId = langResult.rows[0].id;

      // Upsert content translation
      await query(`
        INSERT INTO content_translations (content_type, content_id, language_id, title, content, description, metadata, published)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (content_type, content_id, language_id)
        DO UPDATE SET 
          title = COALESCE($4, content_translations.title),
          content = COALESCE($5, content_translations.content),
          description = COALESCE($6, content_translations.description),
          metadata = COALESCE($7, content_translations.metadata),
          published = COALESCE($8, content_translations.published),
          updated_at = CURRENT_TIMESTAMP
      `, [
        contentType,
        contentId,
        languageId,
        translation.title || null,
        translation.content || null,
        translation.description || null,
        translation.metadata ? JSON.stringify(translation.metadata) : null,
        translation.published !== undefined ? translation.published : null
      ]);

      return { success: true };
    } catch (error) {
      console.error('Error setting content translation:', error);
      return { success: false, error: 'Failed to set content translation' };
    }
  }

  static async getContentTranslations(
    contentType: string,
    contentId: string
  ): Promise<Array<ContentTranslation & { language_code: string; language_name: string }>> {
    try {
      const result = await query(`
        SELECT ct.*, l.code as language_code, l.name as language_name
        FROM content_translations ct
        JOIN languages l ON ct.language_id = l.id
        WHERE ct.content_type = $1 AND ct.content_id = $2
        ORDER BY l.is_default DESC, l.name ASC
      `, [contentType, contentId]);

      return result.rows;
    } catch (error) {
      console.error('Error fetching content translations:', error);
      return [];
    }
  }

  static async deleteContentTranslation(
    contentType: string,
    contentId: string,
    languageCode: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await query(`
        DELETE FROM content_translations 
        WHERE content_type = $1 AND content_id = $2 
        AND language_id = (SELECT id FROM languages WHERE code = $3)
      `, [contentType, contentId, languageCode]);

      return { success: true };
    } catch (error) {
      console.error('Error deleting content translation:', error);
      return { success: false, error: 'Failed to delete content translation' };
    }
  }

  // Utility functions
  static async getMissingTranslations(languageCode: string): Promise<string[]> {
    try {
      const defaultLang = await this.getDefaultLanguage();
      if (!defaultLang) return [];

      const result = await query(`
        SELECT DISTINCT t1.translation_key
        FROM translations t1
        JOIN languages l1 ON t1.language_id = l1.id
        WHERE l1.code = $1
        AND NOT EXISTS (
          SELECT 1 FROM translations t2
          JOIN languages l2 ON t2.language_id = l2.id
          WHERE l2.code = $2 AND t2.translation_key = t1.translation_key
        )
      `, [defaultLang.code, languageCode]);

      return result.rows.map((row: TranslationRow) => row.translation_key);
    } catch (error) {
      console.error('Error getting missing translations:', error);
      return [];
    }
  }

  static async getTranslationProgress(languageCode: string): Promise<{ total: number; translated: number; percentage: number }> {
    try {
      const defaultLang = await this.getDefaultLanguage();
      if (!defaultLang) return { total: 0, translated: 0, percentage: 0 };

      // Get total keys from default language
      const totalResult = await query(`
        SELECT COUNT(*) as total
        FROM translations t
        JOIN languages l ON t.language_id = l.id
        WHERE l.code = $1
      `, [defaultLang.code]);

      // Get translated keys for target language
      const translatedResult = await query(`
        SELECT COUNT(*) as translated
        FROM translations t
        JOIN languages l ON t.language_id = l.id
        WHERE l.code = $1
      `, [languageCode]);

      const total = parseInt(totalResult.rows[0]?.total || '0');
      const translated = parseInt(translatedResult.rows[0]?.translated || '0');
      const percentage = total > 0 ? Math.round((translated / total) * 100) : 0;

      return { total, translated, percentage };
    } catch (error) {
      console.error('Error getting translation progress:', error);
      return { total: 0, translated: 0, percentage: 0 };
    }
  }
}
