import { NextRequest, NextResponse } from 'next/server';
import { ContentManagementService } from '@/lib/content-management';
import { checkAdminAuth } from '@/lib/auth';

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

    const versions = await ContentManagementService.getVersions(params.id);

    return NextResponse.json({
      versions,
      total: versions.length
    });
  } catch (error) {
    console.error('Get content versions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
