import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.event || !body.variant) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Log analytics data (in production, send to your analytics service)
    console.log('A/B Test Analytics:', {
      event: body.event,
      variant: body.variant,
      conversionType: body.conversionType,
      engagementType: body.engagementType,
      timestamp: body.timestamp,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    });
    
    // Here you would typically:
    // 1. Store in database
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Update A/B test results
    
    // Example: Store in database
    // await supabase.from('analytics').insert({
    //   event: body.event,
    //   variant: body.variant,
    //   conversion_type: body.conversionType,
    //   timestamp: body.timestamp,
    //   user_agent: request.headers.get('user-agent'),
    //   ip_address: request.ip
    // });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Return basic analytics data for testing
  return NextResponse.json({
    message: 'Analytics endpoint is running',
    supportedEvents: ['click', 'conversion', 'engagement']
  });
}