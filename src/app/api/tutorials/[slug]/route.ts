import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const tutorial = await ContentService.getTutorialBySlug(params.slug);
    
    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tutorial);
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tutorial' },
      { status: 500 }
    );
  }
}
