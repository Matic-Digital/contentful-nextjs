/**
 * Page Component
 * 
 * This component renders a page based on content from Contentful. It displays
 * a page title, description, and dynamically renders page content components
 * (such as Hero sections) based on the content structure defined in Contentful.
 * 
 * The component is integrated with Contentful's Live Preview functionality,
 * allowing content editors to see real-time updates in the preview environment.
 * It uses the Contentful Inspector Mode to highlight editable fields directly
 * in the UI for a seamless content editing experience.
 * 
 * Features:
 * - Dynamic rendering of page content components
 * - SEO-friendly page structure with semantic HTML
 * - Contentful Live Preview integration
 * - Support for various content types through the pageContentCollection
 */

'use client';

import { useContentfulLiveUpdates, useContentfulInspectorMode } from '@contentful/live-preview/react';
import { Container, Box } from '@/components/global/matic-ds';
import { Hero } from './Hero';

interface PageProps {
  sys: {
    id: string;
  };
  name?: string;
  slug?: string;
  description?: string;
  pageContentCollection?: {
    items: Array<{
      sys: {
        id: string;
      };
      name?: string;
      description?: string;
      __typename?: string;
    }>;
  };
  __typename?: string; // Add typename for GraphQL identification
}

/**
 * Page component that displays a title, description, and optional content
 * Supports Contentful Live Preview for real-time updates
 */
export function Page(props: PageProps) {
  // Always call hooks at the top level, before any conditional returns
  // Use the Contentful Live Updates hook to get real-time updates
  const page = useContentfulLiveUpdates<PageProps>(props);
  
  // Use the Contentful Inspector Mode hook for field tagging
  // Use optional chaining to safely access nested properties
  const inspectorProps = useContentfulInspectorMode({ 
    entryId: page?.sys?.id || '' 
  });
  
  // Add a check to ensure props has the required structure
  if (!page?.sys?.id) {
    console.error('Page component received invalid props:', props);
    return null;
  }
  
  console.log('Page props:', props);
  console.log('Live updated page:', page);
  
  return (
    <div className="page-component">
      <Container className="py-16 md:py-24">
        <Box className="flex-col items-start">
          {page.name && (
            <h1 
              className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl"
              {...inspectorProps({ fieldId: 'name' })}
            >
              {page.name}
            </h1>
          )}
          
          {page.description && (
            <p 
              className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
              {...inspectorProps({ fieldId: 'description' })}
            >
              {page.description}
            </p>
          )}
          
          {page.slug && (
            <div className="text-sm text-muted-foreground mb-8">
              <span className="font-medium">Slug: </span>
              <span {...inspectorProps({ fieldId: 'slug' })}>
                {page.slug}
              </span>
            </div>
          )}
        </Box>
      </Container>
      
      {/* Render Page Content (Hero components) */}
      <div {...inspectorProps({ fieldId: 'pageContentCollection' })}>
        {page.pageContentCollection?.items && page.pageContentCollection.items.length > 0 && (
          <div className="page-content">
            {page.pageContentCollection.items.map((content, index) => {
              // Check if the content is a Hero
              if (content.__typename === 'Hero') {
                return (
                  <div key={content.sys.id || index} className="mb-12">
                    <Hero {...content} />
                  </div>
                );
              }
              
              // Default case if content type is not recognized
              return (
                <div key={content.sys.id || index} className="mb-12">
                  <p className="text-sm text-gray-500">Unknown content type: {content.__typename}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
