import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return '127.0.0.1'; // fallback
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { rating, review } = await request.json();
    const userIP = getClientIP(request);

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Get tutorial by slug
    const tutorial = await ContentService.getTutorialBySlug(params.slug);
    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    // Save or update rating
    const result = await ContentService.saveRating(tutorial.id, userIP, rating, review);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to save rating' },
        { status: 500 }
      );
    }

    // Get updated tutorial stats
    const stats = await ContentService.getTutorialRatingStats(tutorial.id);

    return NextResponse.json({
      success: true,
      rating: result.rating,
      stats
    });
  } catch (error) {
    console.error('Rating error:', error);
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

    // Get rating stats and user's rating
    const [stats, userRating] = await Promise.all([
      ContentService.getTutorialRatingStats(tutorial.id),
      ContentService.getUserRating(tutorial.id, userIP)
    ]);

    return NextResponse.json({
      stats,
      userRating
    });
  } catch (error) {
    console.error('Get rating error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
