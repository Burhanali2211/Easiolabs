import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/analytics';
import { getClientIP } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { event_type, event_data, page_url, session_id } = await request.json();
    const userIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;

    // Validate required fields
    if (!event_type || !page_url) {
      return NextResponse.json(
        { error: 'Event type and page URL are required' },
        { status: 400 }
      );
    }

    // Track the event
    const success = await AnalyticsService.trackEvent({
      event_type,
      event_data: event_data || {},
      user_ip: userIP,
      user_agent: userAgent,
      page_url,
      referrer,
      session_id
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to track event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Event tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
