import { query } from './supabase';

export interface ContentVersion {
  id: string;
  content_type: string;
  content_id: string;
  version_number: number;
  title: string;
  content: string;
  metadata: any;
  created_by: string;
  created_at: string;
}

export interface ScheduledContent {
  id: string;
  content_type: string;
  content_id: string;
  action: 'publish' | 'unpublish' | 'delete';
  scheduled_for: string;
  executed: boolean;
  created_at: string;
}

export interface ContentApproval {
  id: string;
  content_type: string;
  content_id: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewer_id?: string;
  reviewer_notes?: string;
  created_at: string;
  updated_at: string;
}

export class ContentManagementService {
  // Content Versioning
  static async createVersion(
    contentType: string,
    contentId: string,
    title: string,
    content: string,
    metadata: any = {},
    createdBy: string
  ): Promise<{ success: boolean; version?: ContentVersion; error?: string }> {
    try {
      // Get next version number
      const versionResult = await query(
        'SELECT COALESCE(MAX(version_number), 0) + 1 as next_version FROM content_versions WHERE content_id = $1',
        [contentId]
      );
      const nextVersion = versionResult.rows[0].next_version;

      // Create new version
      const result = await query(`
        INSERT INTO content_versions (content_type, content_id, version_number, title, content, metadata, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, [contentType, contentId, nextVersion, title, content, JSON.stringify(metadata), createdBy]);

      return { success: true, version: result.rows[0] };
    } catch (error) {
      console.error('Error creating content version:', error);
      return { success: false, error: 'Failed to create version' };
    }
  }

  static async getVersions(contentId: string): Promise<ContentVersion[]> {
    try {
      const result = await query(`
        SELECT cv.*, u.email as created_by_email
        FROM content_versions cv
        LEFT JOIN users u ON cv.created_by = u.id
        WHERE cv.content_id = $1
        ORDER BY cv.version_number DESC
      `, [contentId]);

      return result.rows;
    } catch (error) {
      console.error('Error fetching versions:', error);
      return [];
    }
  }

  static async getVersion(contentId: string, versionNumber: number): Promise<ContentVersion | null> {
    try {
      const result = await query(
        'SELECT * FROM content_versions WHERE content_id = $1 AND version_number = $2',
        [contentId, versionNumber]
      );

      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching version:', error);
      return null;
    }
  }

  static async restoreVersion(contentId: string, versionNumber: number): Promise<{ success: boolean; error?: string }> {
    try {
      const version = await this.getVersion(contentId, versionNumber);
      if (!version) {
        return { success: false, error: 'Version not found' };
      }

      // Update the main content table based on content type
      let updateQuery = '';
      const updateParams = [version.title, version.content, contentId];

      switch (version.content_type) {
        case 'tutorial':
          updateQuery = 'UPDATE tutorials SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3';
          break;
        case 'page':
          updateQuery = 'UPDATE pages SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3';
          break;
        default:
          return { success: false, error: 'Unsupported content type' };
      }

      await query(updateQuery, updateParams);
      return { success: true };
    } catch (error) {
      console.error('Error restoring version:', error);
      return { success: false, error: 'Failed to restore version' };
    }
  }

  // Scheduled Publishing
  static async scheduleContent(
    contentType: string,
    contentId: string,
    action: 'publish' | 'unpublish' | 'delete',
    scheduledFor: Date
  ): Promise<{ success: boolean; scheduled?: ScheduledContent; error?: string }> {
    try {
      const result = await query(`
        INSERT INTO scheduled_content (content_type, content_id, action, scheduled_for)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [contentType, contentId, action, scheduledFor.toISOString()]);

      return { success: true, scheduled: result.rows[0] };
    } catch (error) {
      console.error('Error scheduling content:', error);
      return { success: false, error: 'Failed to schedule content' };
    }
  }

  static async getScheduledContent(): Promise<ScheduledContent[]> {
    try {
      const result = await query(`
        SELECT sc.*, 
               CASE 
                 WHEN sc.content_type = 'tutorial' THEN t.title
                 WHEN sc.content_type = 'page' THEN p.title
               END as content_title
        FROM scheduled_content sc
        LEFT JOIN tutorials t ON sc.content_type = 'tutorial' AND sc.content_id = t.id
        LEFT JOIN pages p ON sc.content_type = 'page' AND sc.content_id = p.id
        WHERE sc.executed = FALSE
        ORDER BY sc.scheduled_for ASC
      `);

      return result.rows;
    } catch (error) {
      console.error('Error fetching scheduled content:', error);
      return [];
    }
  }

  static async executeScheduledContent(): Promise<{ executed: number; errors: string[] }> {
    try {
      const now = new Date();
      const scheduled = await query(`
        SELECT * FROM scheduled_content 
        WHERE scheduled_for <= $1 AND executed = FALSE
      `, [now.toISOString()]);

      let executed = 0;
      const errors: string[] = [];

      for (const item of scheduled.rows) {
        try {
          let updateQuery = '';
          const updateParams = [item.content_id];

          switch (item.action) {
            case 'publish':
              if (item.content_type === 'tutorial') {
                updateQuery = 'UPDATE tutorials SET published = TRUE WHERE id = $1';
              } else if (item.content_type === 'page') {
                updateQuery = 'UPDATE pages SET published = TRUE WHERE id = $1';
              }
              break;
            case 'unpublish':
              if (item.content_type === 'tutorial') {
                updateQuery = 'UPDATE tutorials SET published = FALSE WHERE id = $1';
              } else if (item.content_type === 'page') {
                updateQuery = 'UPDATE pages SET published = FALSE WHERE id = $1';
              }
              break;
            case 'delete':
              if (item.content_type === 'tutorial') {
                updateQuery = 'DELETE FROM tutorials WHERE id = $1';
              } else if (item.content_type === 'page') {
                updateQuery = 'DELETE FROM pages WHERE id = $1';
              }
              break;
          }

          if (updateQuery) {
            await query(updateQuery, updateParams);
            await query('UPDATE scheduled_content SET executed = TRUE WHERE id = $1', [item.id]);
            executed++;
          }
        } catch (error) {
          errors.push(`Failed to execute ${item.action} for ${item.content_type} ${item.content_id}: ${error}`);
        }
      }

      return { executed, errors };
    } catch (error) {
      console.error('Error executing scheduled content:', error);
      return { executed: 0, errors: ['Failed to execute scheduled content'] };
    }
  }

  static async cancelScheduledContent(scheduledId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await query('DELETE FROM scheduled_content WHERE id = $1', [scheduledId]);
      return { success: true };
    } catch (error) {
      console.error('Error canceling scheduled content:', error);
      return { success: false, error: 'Failed to cancel scheduled content' };
    }
  }

  // Content Approval Workflow
  static async submitForApproval(
    contentType: string,
    contentId: string
  ): Promise<{ success: boolean; approval?: ContentApproval; error?: string }> {
    try {
      // Check if already pending approval
      const existing = await query(
        'SELECT id FROM content_approvals WHERE content_id = $1 AND status = $2',
        [contentId, 'pending']
      );

      if (existing.rows.length > 0) {
        return { success: false, error: 'Content is already pending approval' };
      }

      const result = await query(`
        INSERT INTO content_approvals (content_type, content_id, status)
        VALUES ($1, $2, 'pending')
        RETURNING *
      `, [contentType, contentId]);

      return { success: true, approval: result.rows[0] };
    } catch (error) {
      console.error('Error submitting for approval:', error);
      return { success: false, error: 'Failed to submit for approval' };
    }
  }

  static async approveContent(
    approvalId: string,
    reviewerId: string,
    notes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await query(`
        UPDATE content_approvals 
        SET status = 'approved', reviewer_id = $1, reviewer_notes = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [reviewerId, notes || null, approvalId]);

      return { success: true };
    } catch (error) {
      console.error('Error approving content:', error);
      return { success: false, error: 'Failed to approve content' };
    }
  }

  static async rejectContent(
    approvalId: string,
    reviewerId: string,
    notes: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await query(`
        UPDATE content_approvals 
        SET status = 'rejected', reviewer_id = $1, reviewer_notes = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [reviewerId, notes, approvalId]);

      return { success: true };
    } catch (error) {
      console.error('Error rejecting content:', error);
      return { success: false, error: 'Failed to reject content' };
    }
  }

  static async getPendingApprovals(): Promise<ContentApproval[]> {
    try {
      const result = await query(`
        SELECT ca.*, 
               CASE 
                 WHEN ca.content_type = 'tutorial' THEN t.title
                 WHEN ca.content_type = 'page' THEN p.title
               END as content_title,
               u.email as reviewer_email
        FROM content_approvals ca
        LEFT JOIN tutorials t ON ca.content_type = 'tutorial' AND ca.content_id = t.id
        LEFT JOIN pages p ON ca.content_type = 'page' AND ca.content_id = p.id
        LEFT JOIN users u ON ca.reviewer_id = u.id
        WHERE ca.status = 'pending'
        ORDER BY ca.created_at ASC
      `);

      return result.rows;
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      return [];
    }
  }
}
