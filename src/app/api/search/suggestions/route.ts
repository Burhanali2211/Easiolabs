import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';

export const dynamic = 'force-dynamic';

interface Suggestion {
  text: string;
  url: string;
  type: string;
}

interface TutorialRow {
  title: string;
  slug: string;
  type: string;
}

interface TagRow {
  tag: string;
  count: number;
}

interface CategoryRow {
  name: string;
  slug: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    // Get search suggestions from multiple sources
    const [titleSuggestions, tagSuggestions, categorySuggestions] = await Promise.all([
      getTitleSuggestions(query),
      getTagSuggestions(query),
      getCategorySuggestions(query)
    ]);

    const suggestions = [
      ...titleSuggestions.map((s: Suggestion) => ({ ...s, type: 'tutorial' })),
      ...tagSuggestions.map((s: Suggestion) => ({ ...s, type: 'tag' })),
      ...categorySuggestions.map((s: Suggestion) => ({ ...s, type: 'category' }))
    ].slice(0, 10); // Limit to 10 suggestions

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json({ suggestions: [] });
  }
}

async function getTitleSuggestions(query: string): Promise<Suggestion[]> {
  try {
    const result = await ContentService.query(`
      SELECT title, slug, 'tutorial' as type
      FROM tutorials 
      WHERE published = true 
      AND title ILIKE $1
      ORDER BY view_count DESC
      LIMIT 5
    `, [`%${query}%`]);

    return result.rows.map((row: TutorialRow) => ({
      text: row.title,
      url: `/tutorial/${row.slug}`,
      type: 'tutorial'
    }));
  } catch (error) {
    console.error('Error getting title suggestions:', error);
    return [];
  }
}

async function getTagSuggestions(query: string): Promise<Suggestion[]> {
  try {
    const result = await ContentService.query(`
      SELECT DISTINCT unnest(tags) as tag, COUNT(*) as count
      FROM tutorials 
      WHERE published = true 
      AND EXISTS (
        SELECT 1 FROM unnest(tags) as t 
        WHERE t ILIKE $1
      )
      GROUP BY tag
      ORDER BY count DESC
      LIMIT 3
    `, [`%${query}%`]);

    return result.rows.map((row: TagRow) => ({
      text: row.tag,
      url: `/search?tags=${encodeURIComponent(row.tag)}`,
      type: 'tag'
    }));
  } catch (error) {
    console.error('Error getting tag suggestions:', error);
    return [];
  }
}

async function getCategorySuggestions(query: string): Promise<Suggestion[]> {
  try {
    const result = await ContentService.query(`
      SELECT name, slug
      FROM categories 
      WHERE name ILIKE $1
      ORDER BY order_index
      LIMIT 2
    `, [`%${query}%`]);

    return result.rows.map((row: CategoryRow) => ({
      text: row.name,
      url: `/category/${row.slug}`,
      type: 'category'
    }));
  } catch (error) {
    console.error('Error getting category suggestions:', error);
    return [];
  }
}
