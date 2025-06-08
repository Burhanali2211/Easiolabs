import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const sortBy = (searchParams.get('sortBy') as 'relevance' | 'date' | 'views' | 'title') || 'relevance';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const result = await ContentService.searchTutorials(query, {
      category,
      difficulty,
      tags,
      sortBy,
      sortOrder,
      limit,
      offset
    });

    return NextResponse.json({
      tutorials: result.tutorials,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
        hasNext: offset + limit < result.total,
        hasPrev: page > 1
      },
      filters: {
        query,
        category,
        difficulty,
        tags,
        sortBy,
        sortOrder
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
