import { NextRequest, NextResponse } from 'next/server';
import { ContentManagementService } from '@/lib/content-management';
import { checkAdminAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    const scheduled = await ContentManagementService.getScheduledContent();

    return NextResponse.json({
      scheduled,
      total: scheduled.length
    });
  } catch (error) {
    console.error('Get scheduled content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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

    const { content_type, content_id, action, scheduled_for } = await request.json();

    // Validate required fields
    if (!content_type || !content_id || !action || !scheduled_for) {
      return NextResponse.json(
        { error: 'Content type, ID, action, and scheduled time are required' },
        { status: 400 }
      );
    }

    // Validate action
    if (!['publish', 'unpublish', 'delete'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be publish, unpublish, or delete' },
        { status: 400 }
      );
    }

    // Validate scheduled time
    const scheduledDate = new Date(scheduled_for);
    if (isNaN(scheduledDate.getTime()) || scheduledDate <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      );
    }

    const result = await ContentManagementService.scheduleContent(
      content_type,
      content_id,
      action,
      scheduledDate
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to schedule content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      scheduled: result.scheduled,
      message: 'Content scheduled successfully'
    });
  } catch (error) {
    console.error('Schedule content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
