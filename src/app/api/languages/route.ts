import { NextRequest, NextResponse } from 'next/server';
import { I18nService } from '@/lib/i18n';

export async function GET(request: NextRequest) {
  try {
    const languages = await I18nService.getLanguages();
    
    return NextResponse.json({
      languages,
      total: languages.length
    });
  } catch (error) {
    console.error('Get languages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
