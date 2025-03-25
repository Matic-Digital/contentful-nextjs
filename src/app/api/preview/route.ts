import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Preview API Route
 * Enables draft mode and redirects to the appropriate preview page
 * 
 * Query parameters:
 * - secret: The preview secret to validate
 * - slug: The path to redirect to after enabling preview mode
 * - heroId: Optional hero ID to preview
 * - pageListSlug: The slug of the page list to preview
 * - navBarName: The name of the navbar to preview
 */
export async function GET(request: NextRequest) {
  // Parse query parameters
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const pageListSlug = searchParams.get('pageListSlug');
  const navBarName = searchParams.get('navBarName');
  const heroId = searchParams.get('heroId');

  // Check the secret and slug
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Redirect to the correct preview page based on the parameters
  if (slug) {
    // Redirect to the page preview with the slug
    return NextResponse.redirect(
      new URL(`/page-preview?slug=${slug}`, request.url)
    );
  } else if (pageListSlug) {
    // Redirect to the page list preview with the slug
    return NextResponse.redirect(
      new URL(`/page-list-preview?pageListSlug=${pageListSlug}`, request.url)
    );
  } else if (navBarName) {
    // Redirect to the navbar preview with the name
    return NextResponse.redirect(
      new URL(`/navbar-preview?navBarName=${navBarName}`, request.url)
    );
  } else if (heroId) {
    // Redirect to the hero preview with the ID
    return NextResponse.redirect(
      new URL(`/hero-preview?heroId=${heroId}`, request.url)
    );
  } else {
    // If no specific content is requested, redirect to the home page
    return NextResponse.redirect(new URL('/', request.url));
  }
}
