import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';
import { getClientIP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userIP = getClientIP(request);

    // Get user progress overview and stats
    const [progressOverview, stats] = await Promise.all([
      ContentService.getUserProgressOverview(userIP),
      ContentService.getProgressStats(userIP)
    ]);

    return NextResponse.json({
      progress: progressOverview,
      stats,
      total: progressOverview.length
    });
  } catch (error) {
    console.error('Get progress overview error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
