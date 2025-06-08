import { NextRequest, NextResponse } from 'next/server';
import { ContentManagementService } from '@/lib/content-management';
import { checkAdminAuth } from '@/lib/auth';

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

    const result = await ContentManagementService.cancelScheduledContent(params.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to cancel scheduled content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Scheduled content canceled successfully'
    });
  } catch (error) {
    console.error('Cancel scheduled content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
