import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/analytics';
import { getClientIP } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { page_url, page_title, referrer, session_id } = await request.json();
    const userIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || undefined;

    // Validate required fields
    if (!page_url || !page_title) {
      return NextResponse.json(
        { error: 'Page URL and title are required' },
        { status: 400 }
      );
    }

    // Track the page view
    const success = await AnalyticsService.trackPageView({
      page_url,
      page_title,
      user_ip: userIP,
      user_agent: userAgent,
      referrer,
      session_id
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to track page view' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Page view tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
