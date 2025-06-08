import { NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';

export async function GET() {
  try {
    const categories = await ContentService.getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
