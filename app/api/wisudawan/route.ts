import { NextRequest } from 'next/server';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, handleApiError } from '@/lib/utils';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const wisudawan = await WisudawanModel.findAll();
    
    // Remove sensitive data (access codes)
    const publicData = wisudawan.map(({ accessCode, ...rest }) => rest);

    return apiResponse(true, publicData, 'Wisudawan list retrieved', 200);
  } catch (error) {
    return handleApiError(error, 'Get All Wisudawan');
  }
}
