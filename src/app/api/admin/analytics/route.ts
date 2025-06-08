import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/analytics';
import { checkAdminAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const tutorialSlug = searchParams.get('tutorial');

    if (tutorialSlug) {
      // Get tutorial-specific analytics
      const analytics = await AnalyticsService.getTutorialAnalytics(tutorialSlug, days);
      return NextResponse.json({ analytics });
    } else {
      // Get general analytics
      const analytics = await AnalyticsService.getAnalyticsStats(days);
      return NextResponse.json({ analytics });
    }
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
