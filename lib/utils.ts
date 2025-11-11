import { NextRequest, NextResponse } from 'next/server';

export function apiResponse<T = any>(
  success: boolean,
  data?: T,
  message?: string,
  status: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success,
      data,
      message,
    },
    { status }
  );
}

export function apiError(
  message: string,
  status: number = 400
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

export async function handleApiError(
  error: unknown,
  context: string = 'API'
): Promise<NextResponse> {
  console.error(`${context} Error:`, error);
  
  if (error instanceof Error) {
    return apiError(error.message, 500);
  }
  
  return apiError('An unexpected error occurred', 500);
}

// Helper to extract JSON body from request
export async function getRequestBody<T = any>(req: NextRequest): Promise<T | null> {
  try {
    return await req.json();
  } catch (error) {
    return null;
  }
}

// Helper to generate invitation slug (name with dashes)
export function generateSlug(name: string): string {
  return name.trim().replace(/\s+/g, '-');
}

// Helper to generate invitation link
export function generateInvitationLink(
  wisudawanId: string,
  tamuSlug: string,
  frontendUrl?: string
): string {
  const baseUrl = frontendUrl || process.env.FRONTEND_URL || 'http://localhost:5173';
  return `${baseUrl}/i/${wisudawanId}/${tamuSlug}`;
}

// Simple JWT-like token generation (for session management)
export function generateToken(wisudawanId: string): string {
  const payload = {
    wisudawanId,
    timestamp: Date.now(),
  };
  
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64');
  return encoded;
}

export function verifyToken(token: string): { wisudawanId: string; timestamp: number } | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const payload = JSON.parse(decoded);
    
    // Token valid for 24 hours
    const maxAge = 24 * 60 * 60 * 1000;
    if (Date.now() - payload.timestamp > maxAge) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}
