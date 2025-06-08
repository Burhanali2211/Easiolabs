import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';
import { getClientIP } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { progress_percentage, completed } = await request.json();
    const userIP = getClientIP(request);

    // Validate progress percentage
    if (typeof progress_percentage !== 'number' || progress_percentage < 0 || progress_percentage > 100) {
      return NextResponse.json(
        { error: 'Progress percentage must be between 0 and 100' },
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

    // Update progress
    const result = await ContentService.updateProgress(
      tutorial.id,
      userIP,
      progress_percentage,
      completed || false
    );
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to update progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Update progress error:', error);
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

    // Get user progress
    const progress = await ContentService.getUserProgress(tutorial.id, userIP);

    return NextResponse.json({
      progress: progress || {
        progress_percentage: 0,
        completed: false,
        last_accessed: null
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
