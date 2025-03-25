/**
 * NavBar Preview Page
 * 
 * This page enables content editors to preview NavBar components directly from Contentful's
 * preview environment. It fetches NavBar content by name from the query parameters and
 * renders it within the Contentful Live Preview context, allowing real-time updates as
 * content is edited in Contentful.
 * 
 * Key features:
 * - Dynamic fetching of NavBar content based on query parameters
 * - Integration with Contentful's Live Preview for real-time content updates
 * - Error handling for missing or invalid NavBar names
 * - Loading states with Suspense for improved user experience
 * - Automatic re-fetching when content changes in Contentful
 * 
 * This page is typically accessed from Contentful's entry editor via the preview URL
 * configuration, allowing editors to see their changes immediately without publishing.
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getNavBarByName } from '@/lib/api';
import { NavBar } from '@/components/global/NavBar';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { Container, Box } from '@/components/global/matic-ds';
import type { NavBar as NavBarType } from '@/types/contentful';

/**
 * NavBar Preview Page
 * This page is used for previewing NavBar content from Contentful
 * It fetches the NavBar by name from the query parameters
 */

// Loading component for Suspense fallback
function NavBarPreviewLoading() {
  return (
    <Container>
      <Box className="py-12">
        <p>Loading NavBar preview...</p>
      </Box>
    </Container>
  );
}

// Inner component that uses useSearchParams
function NavBarPreviewContent() {
  const searchParams = useSearchParams();
  const navBarName = searchParams?.get('navBarName') ?? '';
  const [navBar, setNavBar] = useState<NavBarType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNavBar() {
      if (!navBarName) {
        setIsLoading(false);
        setError(new Error('No NavBar name provided'));
        return;
      }

      try {
        setIsLoading(true);
        const fetchedNavBar = await getNavBarByName(navBarName, true);
        setNavBar(fetchedNavBar);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching NavBar:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch NavBar'));
        setIsLoading(false);
      }
    }

    // Use void operator to explicitly ignore the Promise
    void fetchNavBar();
  }, [navBarName]);

  // Content to render based on state
  if (isLoading) {
    return (
      <Container>
        <Box className="py-12">
          <p>Loading NavBar preview...</p>
        </Box>
      </Container>
    );
  } else if (error) {
    return (
      <Container>
        <Box className="py-12">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p>Error fetching NavBar: {error.message}</p>
        </Box>
      </Container>
    );
  } else if (!navBar) {
    return (
      <Container>
        <Box className="py-12">
          <h1 className="text-2xl font-bold">NavBar Not Found</h1>
          <p>No NavBar found with name: {navBarName}</p>
        </Box>
      </Container>
    );
  }
  
  return (
    <>
      {/* NavBar is the primary navigation component */}
      <NavBar {...navBar} />
      
      <Container className="mt-24">
        <Box className="py-12">
          <h1 className="text-2xl font-bold mb-4">NavBar Preview</h1>
          <p className="mb-2">
            <strong>Name:</strong> {navBar.name}
          </p>
          <p className="mb-2">
            <strong>Links:</strong> {navBar.navLinksCollection?.items.length ?? 0}
          </p>
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              This is a preview of the NavBar. You can edit it in Contentful and see the changes in real-time.
            </p>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default function NavBarPreviewPage() {
  return (
    <ContentfulLivePreviewProvider locale="en-US">
      <Suspense fallback={<NavBarPreviewLoading />}>
        <NavBarPreviewContent />
      </Suspense>
    </ContentfulLivePreviewProvider>
  );
}
