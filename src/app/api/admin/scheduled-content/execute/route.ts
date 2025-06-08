import { NextRequest, NextResponse } from 'next/server';
import { ContentManagementService } from '@/lib/content-management';
import { checkAdminAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    const result = await ContentManagementService.executeScheduledContent();

    return NextResponse.json({
      success: true,
      executed: result.executed,
      errors: result.errors,
      message: `Executed ${result.executed} scheduled items${result.errors.length > 0 ? ` with ${result.errors.length} errors` : ''}`
    });
  } catch (error) {
    console.error('Execute scheduled content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
