import { NextRequest, NextResponse } from 'next/server';
import { ContentManagementService } from '@/lib/content-management';
import { checkAdminAuth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; version: string } }
) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    const versionNumber = parseInt(params.version);
    if (isNaN(versionNumber)) {
      return NextResponse.json(
        { error: 'Invalid version number' },
        { status: 400 }
      );
    }

    const result = await ContentManagementService.restoreVersion(params.id, versionNumber);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to restore version' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Version restored successfully'
    });
  } catch (error) {
    console.error('Restore version error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
