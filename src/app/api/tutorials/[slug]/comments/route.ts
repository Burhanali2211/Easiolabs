import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/content';
import { getClientIP } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get tutorial by slug
    const tutorial = await ContentService.getTutorialBySlug(params.slug);
    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    // Get comments for this tutorial
    const comments = await ContentService.getComments(tutorial.id);
    
    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await ContentService.getCommentReplies(comment.id);
        return {
          ...comment,
          replies
        };
      })
    );

    return NextResponse.json({
      comments: commentsWithReplies,
      total: comments.length
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { author_name, author_email, content, parent_id } = await request.json();

    // Validate required fields
    if (!author_name || !author_email || !content) {
      return NextResponse.json(
        { error: 'Name, email, and content are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(author_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.length < 10 || content.length > 2000) {
      return NextResponse.json(
        { error: 'Comment must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Get tutorial by slug
    const tutorial = await ContentService.getTutorialBySlug(params.slug);
    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    // Create comment
    const result = await ContentService.createComment(
      tutorial.id,
      author_name.trim(),
      author_email.trim().toLowerCase(),
      content.trim(),
      parent_id || undefined
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create comment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      comment: result.comment,
      message: 'Comment submitted successfully and is pending approval'
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
