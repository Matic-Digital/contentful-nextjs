/**
 * Page Preview Component
 * 
 * This page enables content editors to preview Page components directly from Contentful's
 * preview environment. It fetches Page content by slug from the query parameters and
 * renders it within the Contentful Live Preview context, allowing real-time updates as
 * content is edited in Contentful.
 * 
 * Key features:
 * - Server-side rendering with Next.js draft mode for preview content
 * - Dynamic fetching of Page content based on slug parameter
 * - Integration with Contentful's Live Preview for real-time content updates
 * - Error handling for missing or invalid Page slugs
 * - Forced dynamic rendering to ensure preview content is always fresh
 * - Disabled caching to ensure latest draft content is always displayed
 * 
 * This page is typically accessed from Contentful's entry editor via the preview URL
 * configuration, allowing editors to see their changes immediately without publishing.
 */

import { draftMode } from 'next/headers';
import { Box } from '@/components/global/matic-ds';
import ContentfulLivePreviewInitializer from '@/components/global/ContentfulLivePreviewInitializer';
import { getPageBySlug } from '@/lib/api';
import { Page } from '@/components/global/Page';

// Force dynamic rendering for this page to ensure live updates work
export const dynamic = 'force-dynamic';

// Disable caching for this page
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// Define the props type for the page component
interface PagePreviewPageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{
    slug?: string;
  }>;
}

/**
 * Page Preview Component
 * This page is specifically for previewing Pages with Contentful Live Preview
 */
export default async function PagePreviewPage({ params, searchParams }: PagePreviewPageProps) {
  // Await the params and searchParams Promises (required in Next.js 15)
  await params; // We need to await this even if we don't use it
  const resolvedSearchParams = await searchParams;
  
  // Get the page slug from the query parameters
  const pageSlug = resolvedSearchParams?.slug ?? '';
  const draftModeData = await draftMode();
  const isDraftMode = draftModeData.isEnabled;
  
  // Always use preview mode for this page
  const usePreview = true;
  
  // Fetch the page data
  let pageData = null;
  let error = null;
  
  try {
    if (pageSlug) {
      console.log('Fetching page with slug:', pageSlug, 'usePreview:', usePreview);
      pageData = await getPageBySlug(pageSlug, usePreview);
      console.log('Page data received:', pageData);
    }
  } catch (err) {
    console.error('Error fetching page:', err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return (
    <Box direction="col" gap={8} className="min-h-screen py-12">
      {/* Preview Status */}
      <Box className="mx-auto max-w-7xl px-4">
        <div className="rounded-md bg-blue-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.75.75 0 00.736-.686l.057-.75a.75.75 0 00-.75-.813H9A.75.75 0 009 9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-blue-800">Page Preview Mode</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>You are viewing the Page component in preview mode. {isDraftMode ? 'Draft mode is enabled.' : 'Draft mode is disabled.'}</p>
                {pageSlug && <p className="mt-1">Page Slug: {pageSlug}</p>}
              </div>
            </div>
          </div>
        </div>
      </Box>

      {/* Error Message */}
      {error && (
        <Box className="mx-auto max-w-7xl px-4">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Page</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      )}

      {/* No Page Slug Provided */}
      {!pageSlug && !error && (
        <Box className="mx-auto max-w-7xl px-4">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">No Page Slug Provided</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Please provide a page slug in the URL query parameters (e.g., ?slug=your-page-slug).</p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      )}

      {/* Contentful Live Preview Initializer */}
      <ContentfulLivePreviewInitializer />
      
      {/* Page Component */}
      {pageData ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="text-xs text-gray-500 mb-2 text-center">Page Preview</div>
          <Page {...pageData} />
        </div>
      ) : (
        <Box className="mx-auto max-w-7xl px-4">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">No Page Data Found</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>No page data was found for slug: {pageSlug}. Make sure the slug exists in Contentful.</p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
}
