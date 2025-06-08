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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    const pageData = await request.json();
    
    const page = await ContentService.updatePage(params.id, pageData);
    
    if (!page) {
      return NextResponse.json(
        { error: 'Failed to update page' },
        { status: 500 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    const success = await ContentService.deletePage(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete page' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
