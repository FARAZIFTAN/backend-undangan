import { NextRequest } from 'next/server';
import { InvitationModel } from '@/models/Invitation';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, apiError, handleApiError } from '@/lib/utils';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Get quota information for a wisudawan
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wisudawanId = searchParams.get('wisudawanId');

    if (!wisudawanId) {
      return apiError('Wisudawan ID is required', 400);
    }

    const wisudawan = await WisudawanModel.findById(wisudawanId);
    if (!wisudawan) {
      return apiError('Wisudawan not found', 404);
    }

    const used = await InvitationModel.countByWisudawanId(wisudawanId);
    const total = wisudawan.quota;
    const remaining = total - used;

    return apiResponse(
      true,
      {
        wisudawanId,
        used,
        total,
        remaining,
      },
      'Quota information retrieved',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Get Quota');
  }
}
