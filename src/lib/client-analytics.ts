// Client-side analytics helper
export class ClientAnalytics {
  private static sessionId: string | null = null;
  private static pageStartTime: number = 0;

  static init() {
    if (typeof window === 'undefined') return;

    // Generate session ID
    this.sessionId = this.getOrCreateSessionId();
    this.pageStartTime = Date.now();

    // Track page view
    this.trackPageView();

    // Track page duration on beforeunload
    window.addEventListener('beforeunload', () => {
      this.trackPageDuration();
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.trackPageDuration();
      } else {
        this.pageStartTime = Date.now();
      }
    });
  }

  private static getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private static async trackPageView() {
    if (typeof window === 'undefined') return;

    try {
      await fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: window.location.pathname,
          page_title: document.title,
          referrer: document.referrer,
          session_id: this.sessionId
        })
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  private static async trackPageDuration() {
    if (typeof window === 'undefined' || !this.sessionId) return;

    const duration = Math.round((Date.now() - this.pageStartTime) / 1000);
    if (duration < 5) return; // Ignore very short visits

    try {
      await fetch('/api/analytics/duration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: this.sessionId,
          page_url: window.location.pathname,
          duration
        })
      });
    } catch (error) {
      console.error('Error tracking page duration:', error);
    }
  }

  static async trackEvent(eventType: string, eventData: any = {}) {
    if (typeof window === 'undefined') return;

    try {
      await fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: eventType,
          event_data: eventData,
          page_url: window.location.pathname,
          session_id: this.sessionId
        })
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
}