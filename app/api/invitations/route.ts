import { NextRequest } from 'next/server';
import { InvitationModel } from '@/models/Invitation';
import { WisudawanModel } from '@/models/Wisudawan';
import { apiResponse, apiError, handleApiError, generateSlug, generateInvitationLink } from '@/lib/utils';
import { CreateInvitationRequest, InvitationWithLink } from '@/types';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Get all invitations for a wisudawan
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wisudawanId = searchParams.get('wisudawanId');

    if (!wisudawanId) {
      return apiError('Wisudawan ID is required', 400);
    }

    const invitations = await InvitationModel.findByWisudawanId(wisudawanId);

    // Add links to each invitation
    const invitationsWithLinks: InvitationWithLink[] = invitations.map(inv => ({
      ...inv,
      link: generateInvitationLink(inv.wisudawanId, inv.tamuSlug),
    }));

    // Get quota info
    const wisudawan = await WisudawanModel.findById(wisudawanId);
    const quotaInfo = {
      used: invitations.length,
      total: wisudawan?.quota || 10,
      remaining: (wisudawan?.quota || 10) - invitations.length,
    };

    return apiResponse(
      true,
      {
        invitations: invitationsWithLinks,
        quota: quotaInfo,
      },
      'Invitations retrieved',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Get Invitations');
  }
}

// POST - Create new invitation
export async function POST(req: NextRequest) {
  try {
    const body: CreateInvitationRequest = await req.json();
    const { wisudawanId, tamu } = body;

    if (!wisudawanId || !tamu) {
      return apiError('Wisudawan ID and tamu name are required', 400);
    }

    // Validate wisudawan exists
    const wisudawan = await WisudawanModel.findById(wisudawanId);
    if (!wisudawan) {
      return apiError('Wisudawan not found', 404);
    }

    // Check quota
    const currentCount = await InvitationModel.countByWisudawanId(wisudawanId);
    if (currentCount >= wisudawan.quota) {
      return apiError(
        `Quota limit reached. Maximum ${wisudawan.quota} invitations allowed.`,
        403
      );
    }

    // Check if invitation already exists
    const existing = await InvitationModel.findByWisudawanAndTamu(wisudawanId, tamu);
    if (existing) {
      return apiError('Invitation for this guest already exists', 409);
    }

    // Create invitation
    const tamuSlug = generateSlug(tamu);
    const invitation = await InvitationModel.create({
      wisudawanId,
      wisudawanNama: wisudawan.nama,
      tamu,
      tamuSlug,
    });

    // Generate link
    const link = generateInvitationLink(wisudawanId, tamuSlug);

    const invitationWithLink: InvitationWithLink = {
      ...invitation,
      link,
    };

    return apiResponse(true, invitationWithLink, 'Invitation created successfully', 201);
  } catch (error) {
    return handleApiError(error, 'Create Invitation');
  }
}
