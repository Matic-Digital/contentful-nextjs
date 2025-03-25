/**
 * Dynamic Page Component
 * 
 * This component handles dynamic routing for pages based on their slug from Contentful.
 * It fetches the page content by slug and renders the appropriate components based on
 * the content structure defined in Contentful.
 * 
 * Key features:
 * - Dynamic routing using Next.js file-based routing with [slug] parameter
 * - Server-side rendering of page content from Contentful
 * - Component mapping to render different content types (Hero, etc.)
 * - Error handling for pages that don't exist (404 Not Found)
 * - Support for both static site generation and dynamic rendering
 * 
 * The page content is structured according to Contentful's content model, where
 * each page can have various content components accessed via the pageContentCollection.
 */

import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/api';
import { Hero } from '@/components/global/Hero';
import type { Hero as _HeroType } from '@/types/contentful';

// Define the component mapping for pageContent items
const componentMap = {
  'Hero': Hero,
  // Add other component types here as they are created
};

// Define props for the page component
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

// Generate static params for static site generation
export async function generateStaticParams() {
  // This would typically fetch all pages to pre-render
  // For now, we'll return an empty array as we're focusing on dynamic rendering
  return [];
}

// The dynamic page component
export default async function Page({ params, searchParams }: PageProps) {
  // Await the params Promise (required in Next.js 15)
  const resolvedParams = await params;
  await searchParams; // We need to await this even if we don't use it
  
  // Access params in a way that's compatible with Next.js async components
  const slug = resolvedParams?.slug;
  const preview = false; // Set to true if you want to enable preview mode
  
  // Fetch the page data based on the slug
  const page = await getPageBySlug(slug, preview);
  
  // If no page is found, return a 404
  if (!page) {
    notFound();
  }
  
  return (
    <main>
      <h1 className="sr-only">{page.name}</h1>
      
      {/* Render the page content components */}
      {page.pageContentCollection?.items.map((component) => {
        if (!component) return null;
        
        // Type guard to check if component has __typename
        if (!('__typename' in component)) {
          console.warn('Component missing __typename:', component);
          return null;
        }
        
        const typeName = component.__typename!; // Using non-null assertion as we've checked it exists
        
        // Check if we have a component for this type
        if (typeName && typeName in componentMap) {
          const ComponentType = componentMap[typeName as keyof typeof componentMap];
          return (
            <ComponentType 
              key={component.sys.id} 
              {...component} 
            />
          );
        }
        
        // Log a warning if we don't have a component for this type
        console.warn(`No component found for type: ${typeName}`);
        return null;
      })}
    </main>
  );
}
