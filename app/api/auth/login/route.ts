import { NextRequest } from 'next/server';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, apiError, handleApiError, generateToken } from '@/lib/utils';
import { AuthSession, LoginResponse } from '@/types';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessCode } = body;

    if (!accessCode) {
      return apiError('Access code is required', 400);
    }

    // Find wisudawan by access code
    const wisudawan = await WisudawanModel.findByAccessCode(accessCode);

    if (!wisudawan) {
      return apiError('Invalid access code', 401);
    }

    // Create session data
    const session: AuthSession = {
      wisudawanId: wisudawan.id,
      nama: wisudawan.nama,
      gelar: wisudawan.gelar,
      prodi: wisudawan.prodi,
      inisial: wisudawan.inisial,
      quota: wisudawan.quota,
    };

    // Generate token
    const token = generateToken(wisudawan.id);

    const response: LoginResponse = {
      session,
      token,
    };

    return apiResponse(true, response, 'Login successful', 200);
  } catch (error) {
    return handleApiError(error, 'Login');
  }
}
