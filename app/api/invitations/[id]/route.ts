import { NextRequest } from 'next/server';
import { InvitationModel } from '@/models/Invitation';
import { apiResponse, apiError, handleApiError } from '@/lib/utils';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Params {
  params: {
    id: string;
  };
}

// DELETE - Delete invitation by ID
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    if (!id) {
      return apiError('Invitation ID is required', 400);
    }

    const deleted = await InvitationModel.delete(id);

    if (!deleted) {
      return apiError('Invitation not found or already deleted', 404);
    }

    return apiResponse(true, { id }, 'Invitation deleted successfully', 200);
  } catch (error) {
    return handleApiError(error, 'Delete Invitation');
  }
}
