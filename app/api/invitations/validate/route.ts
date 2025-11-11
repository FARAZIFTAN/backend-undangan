import { NextRequest } from 'next/server';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, apiError, handleApiError } from '@/lib/utils';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Validate invitation link (for public invite page)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wisudawanId = searchParams.get('wisudawanId');
    const tamuSlug = searchParams.get('tamuSlug');

    if (!wisudawanId) {
      return apiError('Wisudawan ID is required', 400);
    }

    // Check if wisudawan exists (that's all we need to validate)
    const wisudawan = await WisudawanModel.findById(wisudawanId);

    if (!wisudawan) {
      return apiResponse(
        false,
        { valid: false, wisudawan: null },
        'Invalid invitation link',
        200
      );
    }

    // Return wisudawan data (without access code)
    const { accessCode, ...publicData } = wisudawan;

    return apiResponse(
      true,
      {
        valid: true,
        wisudawan: publicData,
      },
      'Invitation is valid',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Validate Invitation');
  }
}
