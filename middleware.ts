import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple middleware - just let requests pass through
// Auto-initialization will be handled by the init endpoint
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Run middleware on all API routes
export const config = {
  matcher: '/api/:path*',
};
