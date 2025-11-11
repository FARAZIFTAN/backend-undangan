import { NextRequest } from 'next/server';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, handleApiError } from '@/lib/utils';

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Initialize default wisudawan data (for browser access)
export async function GET(req: NextRequest) {
  try {
    await WisudawanModel.initializeDefaultData();
    return apiResponse(true, null, 'Database initialized successfully', 200);
  } catch (error) {
    return handleApiError(error, 'Initialize Database');
  }
}

// POST - Initialize default wisudawan data
export async function POST(req: NextRequest) {
  try {
    await WisudawanModel.initializeDefaultData();
    return apiResponse(true, null, 'Database initialized successfully', 200);
  } catch (error) {
    return handleApiError(error, 'Initialize Database');
  }
}
