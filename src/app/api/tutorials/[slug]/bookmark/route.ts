import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';
import { getClientIP } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const userIP = getClientIP(request);

    // Get tutorial by slug
    const tutorial = await ContentService.getTutorialBySlug(params.slug);
    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    // Toggle bookmark
    const result = await ContentService.toggleBookmark(tutorial.id, userIP);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to toggle bookmark' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bookmarked: result.bookmarked,
      message: result.bookmarked ? 'Tutorial bookmarked' : 'Bookmark removed'
    });
  } catch (error) {
    console.error('Bookmark error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const userIP = getClientIP(request);

    // Get tutorial by slug
    const tutorial = await ContentService.getTutorialBySlug(params.slug);
    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    // Check if bookmarked
    const bookmarked = await ContentService.isBookmarked(tutorial.id, userIP);

    return NextResponse.json({
      bookmarked
    });
  } catch (error) {
    console.error('Get bookmark status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
