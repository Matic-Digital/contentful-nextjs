import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Preview API Route
 * Enables draft mode and redirects to the specified path
 * 
 * Query parameters:
 * - secret: The preview secret (must match CONTENTFUL_PREVIEW_SECRET)
 * - slug: The path to redirect to after enabling preview mode
 * - id: Optional hero ID to include in the redirect
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Check the secret
  const secret = searchParams.get('secret');
  const previewSecret = process.env.CONTENTFUL_PREVIEW_SECRET;
  
  if (!previewSecret) {
    return new NextResponse('Preview secret is not set', { status: 500 });
  }
  
  if (secret !== previewSecret) {
    return new NextResponse('Invalid preview secret', { status: 401 });
  }
  
  // Enable draft mode
  const draft = await draftMode();
  draft.enable();
  
  // Get the redirect path and optional hero ID
  const redirectPath = searchParams.get('slug') ?? '/hero-preview';
  const heroId = searchParams.get('id');
  
  // Build the redirect URL with hero ID if provided
  let redirectUrl = redirectPath;
  if (heroId && redirectPath === '/hero-preview') {
    redirectUrl = `${redirectPath}?id=${heroId}`;
  }
  
  // Add Contentful preview parameters if they exist
  const spaceId = searchParams.get('space_id');
  const previewToken = searchParams.get('preview_access_token');
  
  if (spaceId && previewToken) {
    const separator = redirectUrl.includes('?') ? '&' : '?';
    redirectUrl = `${redirectUrl}${separator}preview=1&space_id=${spaceId}&preview_access_token=${previewToken}`;
  }
  
  // Redirect to the page
  redirect(redirectUrl);
}
