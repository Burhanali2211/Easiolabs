import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { session_id, page_url, duration } = await request.json();

    // Validate required fields
    if (!session_id || !page_url || typeof duration !== 'number') {
      return NextResponse.json(
        { error: 'Session ID, page URL, and duration are required' },
        { status: 400 }
      );
    }

    // Update page duration
    const success = await AnalyticsService.updatePageDuration(session_id, page_url, duration);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update page duration' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Duration tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
