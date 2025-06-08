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

export async function GET(
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

    const tutorial = await ContentService.getTutorialById(params.id);

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
      { error: 'Internal server error' },
      { status: 500 }
    );
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

    const tutorialData = await request.json();

    const tutorial = await ContentService.updateTutorial(params.id, tutorialData);

    if (!tutorial) {
      return NextResponse.json(
        { error: 'Failed to update tutorial' },
        { status: 500 }
      );
    }

    return NextResponse.json(tutorial);
  } catch (error) {
    console.error('Error updating tutorial:', error);
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

    const success = await ContentService.deleteTutorial(params.id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete tutorial' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    console.error('Error deleting tutorial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
