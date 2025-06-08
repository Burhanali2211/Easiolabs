import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';
import jwt from 'jsonwebtoken';

// Middleware to check admin authentication
async function checkAdminAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return { error: 'No token provided', status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    if (decoded.role !== 'admin') {
      return { error: 'Admin access required', status: 403 };
    }

    return { user: decoded, error: null };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    const tutorialData = await request.json();
    
    // Validate required fields
    if (!tutorialData.title || !tutorialData.slug || !tutorialData.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    const tutorial = await ContentService.createTutorial(tutorialData);
    
    if (!tutorial) {
      return NextResponse.json(
        { error: 'Failed to create tutorial' },
        { status: 500 }
      );
    }

    return NextResponse.json(tutorial);
  } catch (error) {
    console.error('Error creating tutorial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const category = searchParams.get('category');
    const published = searchParams.get('published') === 'true';
    
    const tutorials = await ContentService.getTutorials(category || undefined, published);
    return NextResponse.json(tutorials);
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tutorials' },
      { status: 500 }
    );
  }
}
