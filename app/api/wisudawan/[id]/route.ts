import { NextRequest } from 'next/server';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, apiError, handleApiError } from '@/lib/utils';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    if (!id) {
      return apiError('Wisudawan ID is required', 400);
    }

    const wisudawan = await WisudawanModel.findById(id);

    if (!wisudawan) {
      return apiError('Wisudawan not found', 404);
    }

    // Remove sensitive data
    const { accessCode, ...publicData } = wisudawan;

    return apiResponse(true, publicData, 'Wisudawan found', 200);
  } catch (error) {
    return handleApiError(error, 'Get Wisudawan');
  }
}
