import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';
import { getClientIP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userIP = getClientIP(request);

    // Get user bookmarks
    const bookmarks = await ContentService.getUserBookmarks(userIP);

    return NextResponse.json({
      bookmarks,
      total: bookmarks.length
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
