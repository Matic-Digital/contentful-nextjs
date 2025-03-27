import { draftMode } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Footer Preview API Route
 * 
 * This route enables draft mode and redirects to the footer preview page
 * with the provided footerId.
 * 
 * Required parameters:
 * - secret: The preview secret that matches CONTENTFUL_PREVIEW_SECRET
 * - footerId: The ID of the footer to preview
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const id = searchParams.get('id');

  // Check the secret and validate it
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Check if id is provided
  if (!id) {
    return NextResponse.json({ message: 'No id provided' }, { status: 400 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Redirect to the footer preview page with the footerId parameter
  return NextResponse.redirect(new URL(`/footer-preview?footerId=${id}`, request.url));
}
