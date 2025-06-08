import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';
import { checkAdminAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
    const approved = searchParams.get('approved');

    let approvedFilter: boolean | undefined;
    if (approved === 'true') approvedFilter = true;
    else if (approved === 'false') approvedFilter = false;

    const comments = await ContentService.getAllComments(approvedFilter);

    return NextResponse.json({
      comments,
      total: comments.length
    });
  } catch (error) {
    console.error('Get admin comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
