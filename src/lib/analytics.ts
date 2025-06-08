import { query } from './supabase';

export interface AnalyticsEvent {
  id?: string;
  event_type: string;
  event_data: any;
  user_ip: string;
  user_agent?: string;
  page_url: string;
  referrer?: string;
  session_id?: string;
  created_at?: string;
}

export interface PageView {
  id?: string;
  page_url: string;
  page_title: string;
  user_ip: string;
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  duration?: number;
  created_at?: string;
}

export interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  topReferrers: Array<{ referrer: string; visits: number }>;
  dailyViews: Array<{ date: string; views: number }>;
  deviceTypes: Array<{ type: string; count: number }>;
  browserStats: Array<{ browser: string; count: number }>;
}

// Server-side analytics service
export class AnalyticsService {
  // Track page view
  static async trackPageView(pageView: Omit<PageView, 'id' | 'created_at'>): Promise<boolean> {
    try {
      await query(`
        INSERT INTO page_views (page_url, page_title, user_ip, user_agent, referrer, session_id)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        pageView.page_url,
        pageView.page_title,
        pageView.user_ip,
        pageView.user_agent || null,
        pageView.referrer || null,
        pageView.session_id || null
      ]);
      return true;
    } catch (error) {
      console.error('Error tracking page view:', error);
      return false;
    }
  }

  // Track custom event
  static async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'created_at'>): Promise<boolean> {
    try {
      await query(`
        INSERT INTO analytics_events (event_type, event_data, user_ip, user_agent, page_url, referrer, session_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        event.event_type,
        JSON.stringify(event.event_data),
        event.user_ip,
        event.user_agent || null,
        event.page_url,
        event.referrer || null,
        event.session_id || null
      ]);
      return true;
    } catch (error) {
      console.error('Error tracking event:', error);
      return false;
    }
  }

  // Update page view duration when user leaves
  static async updatePageDuration(sessionId: string, pageUrl: string, duration: number): Promise<boolean> {
    try {
      await query(`
        UPDATE page_views
        SET duration = $1
        WHERE id = (
          SELECT id FROM page_views
          WHERE session_id = $2 AND page_url = $3 AND duration IS NULL
          ORDER BY created_at DESC
          LIMIT 1
        )
      `, [duration, sessionId, pageUrl]);
      return true;
    } catch (error) {
      console.error('Error updating page duration:', error);
      return false;
    }
  }

  // Get analytics statistics
  static async getAnalyticsStats(days: number = 30): Promise<AnalyticsStats> {
    try {
      const dateFilter = `created_at >= NOW() - INTERVAL '${days} days'`;

      // Total page views
      const totalViewsResult = await query(`
        SELECT COUNT(*) as total FROM page_views WHERE ${dateFilter}
      `);
      const totalPageViews = parseInt(totalViewsResult.rows[0]?.total || '0');

      // Unique visitors
      const uniqueVisitorsResult = await query(`
        SELECT COUNT(DISTINCT user_ip) as unique FROM page_views WHERE ${dateFilter}
      `);
      const uniqueVisitors = parseInt(uniqueVisitorsResult.rows[0]?.unique || '0');

      // Average session duration
      const avgDurationResult = await query(`
        SELECT AVG(duration) as avg_duration FROM page_views 
        WHERE ${dateFilter} AND duration IS NOT NULL
      `);
      const averageSessionDuration = parseFloat(avgDurationResult.rows[0]?.avg_duration || '0');

      // Top pages
      const topPagesResult = await query(`
        SELECT page_url as page, COUNT(*) as views 
        FROM page_views 
        WHERE ${dateFilter}
        GROUP BY page_url 
        ORDER BY views DESC 
        LIMIT 10
      `);
      const topPages = topPagesResult.rows.map((row: { page: string; views: string }) => ({
        page: row.page,
        views: parseInt(row.views)
      }));

      // Top referrers
      const topReferrersResult = await query(`
        SELECT referrer, COUNT(*) as visits 
        FROM page_views 
        WHERE ${dateFilter} AND referrer IS NOT NULL AND referrer != ''
        GROUP BY referrer 
        ORDER BY visits DESC 
        LIMIT 10
      `);
      const topReferrers = topReferrersResult.rows.map((row: { referrer: string; visits: string }) => ({
        referrer: row.referrer,
        visits: parseInt(row.visits)
      }));

      // Daily views
      const dailyViewsResult = await query(`
        SELECT DATE(created_at) as date, COUNT(*) as views 
        FROM page_views 
        WHERE ${dateFilter}
        GROUP BY DATE(created_at) 
        ORDER BY date DESC 
        LIMIT ${days}
      `);
      const dailyViews = dailyViewsResult.rows.map((row: { date: string; views: string }) => ({
        date: row.date,
        views: parseInt(row.views)
      }));

      // Device types (simplified based on user agent)
      const deviceTypesResult = await query(`
        SELECT 
          CASE 
            WHEN user_agent ILIKE '%mobile%' OR user_agent ILIKE '%android%' OR user_agent ILIKE '%iphone%' THEN 'Mobile'
            WHEN user_agent ILIKE '%tablet%' OR user_agent ILIKE '%ipad%' THEN 'Tablet'
            ELSE 'Desktop'
          END as type,
          COUNT(*) as count
        FROM page_views 
        WHERE ${dateFilter} AND user_agent IS NOT NULL
        GROUP BY type
      `);
      const deviceTypes = deviceTypesResult.rows.map((row: { type: string; count: string }) => ({
        type: row.type,
        count: parseInt(row.count)
      }));

      // Browser stats (simplified)
      const browserStatsResult = await query(`
        SELECT 
          CASE 
            WHEN user_agent ILIKE '%chrome%' THEN 'Chrome'
            WHEN user_agent ILIKE '%firefox%' THEN 'Firefox'
            WHEN user_agent ILIKE '%safari%' AND user_agent NOT ILIKE '%chrome%' THEN 'Safari'
            WHEN user_agent ILIKE '%edge%' THEN 'Edge'
            ELSE 'Other'
          END as browser,
          COUNT(*) as count
        FROM page_views 
        WHERE ${dateFilter} AND user_agent IS NOT NULL
        GROUP BY browser
        ORDER BY count DESC
      `);
      const browserStats = browserStatsResult.rows.map((row: { browser: string; count: string }) => ({
        browser: row.browser,
        count: parseInt(row.count)
      }));

      return {
        totalPageViews,
        uniqueVisitors,
        averageSessionDuration,
        topPages,
        topReferrers,
        dailyViews,
        deviceTypes,
        browserStats
      };
    } catch (error) {
      console.error('Error getting analytics stats:', error);
      return {
        totalPageViews: 0,
        uniqueVisitors: 0,
        averageSessionDuration: 0,
        topPages: [],
        topReferrers: [],
        dailyViews: [],
        deviceTypes: [],
        browserStats: []
      };
    }
  }

  // Get tutorial-specific analytics
  static async getTutorialAnalytics(tutorialSlug: string, days: number = 30): Promise<any> {
    try {
      const dateFilter = `created_at >= NOW() - INTERVAL '${days} days'`;

      const result = await query(`
        SELECT 
          COUNT(*) as total_views,
          COUNT(DISTINCT user_ip) as unique_visitors,
          AVG(duration) as avg_duration
        FROM page_views 
        WHERE page_url LIKE '%/tutorial/${tutorialSlug}%' AND ${dateFilter}
      `);

      const dailyViews = await query(`
        SELECT DATE(created_at) as date, COUNT(*) as views 
        FROM page_views 
        WHERE page_url LIKE '%/tutorial/${tutorialSlug}%' AND ${dateFilter}
        GROUP BY DATE(created_at) 
        ORDER BY date DESC
      `);

      return {
        totalViews: parseInt(result.rows[0]?.total_views || '0'),
        uniqueVisitors: parseInt(result.rows[0]?.unique_visitors || '0'),
        averageDuration: parseFloat(result.rows[0]?.avg_duration || '0'),
        dailyViews: dailyViews.rows.map((row: { date: string; views: string }) => ({
          date: row.date,
          views: parseInt(row.views)
        }))
      };
    } catch (error) {
      console.error('Error getting tutorial analytics:', error);
      return {
        totalViews: 0,
        uniqueVisitors: 0,
        averageDuration: 0,
        dailyViews: []
      };
    }
  }

  // Track tutorial engagement events
  static async trackTutorialEngagement(
    tutorialSlug: string,
    eventType: 'view' | 'bookmark' | 'rating' | 'comment' | 'progress' | 'completion',
    userIP: string,
    additionalData?: any
  ): Promise<boolean> {
    return this.trackEvent({
      event_type: `tutorial_${eventType}`,
      event_data: {
        tutorial_slug: tutorialSlug,
        ...additionalData
      },
      user_ip: userIP,
      page_url: `/tutorial/${tutorialSlug}`
    });
  }
}

// Note: ClientAnalytics has been moved to client-analytics.ts
// to prevent server-side imports on the client
