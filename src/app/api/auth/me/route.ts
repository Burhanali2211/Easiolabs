import { NextRequest, NextResponse } from 'next/server';
import { AuthServerService } from '@/lib/auth-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await AuthServerService.authenticateRequest(request);

    if (!user) {
      return NextResponse.json(
        { error: 'No valid token provided' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}
