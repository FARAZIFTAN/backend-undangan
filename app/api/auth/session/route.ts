import { NextRequest } from 'next/server';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, apiError, handleApiError, verifyToken } from '@/lib/utils';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return apiError('No token provided', 401);
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      return apiError('Invalid or expired token', 401);
    }

    // Get fresh wisudawan data
    const wisudawan = await WisudawanModel.findById(payload.wisudawanId);

    if (!wisudawan) {
      return apiError('Wisudawan not found', 404);
    }

    const session = {
      wisudawanId: wisudawan.id,
      nama: wisudawan.nama,
      gelar: wisudawan.gelar,
      prodi: wisudawan.prodi,
      inisial: wisudawan.inisial,
      quota: wisudawan.quota,
    };

    return apiResponse(true, session, 'Session valid', 200);
  } catch (error) {
    return handleApiError(error, 'Session');
  }
}
