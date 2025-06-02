/**
 * Dynamic Content Component
 *
 * This component handles dynamic routing for both Pages and PageLists based on their slug from Contentful.
 * It fetches the content by slug and renders the appropriate components based on
 * the content structure defined in Contentful.
 *
 * Key features:
 * - Dynamic routing using Next.js file-based routing with [slug] parameter
 * - Support for both Page and PageList content types under the same URL structure
 * - Server-side rendering of content from Contentful
 * - Component mapping to render different content types (Hero, PageList, etc.)
 * - Error handling for content that doesn't exist (404 Not Found)
 * - Support for both static site generation and dynamic rendering
 *
 * The content is structured according to Contentful's content models, where
 * each page can have various content components accessed via the pageContentCollection,
 * and PageList can reference multiple Pages.
 */

import { notFound } from 'next/navigation';
import { getPageBySlug, getPageListBySlug } from '@/lib/api';
import { Hero } from '@/components/global/Hero';
import { Footer } from '@/components/global/Footer';
import { PageList } from '@/components/global/PageList';
import { PageLayout } from '@/components/layout/PageLayout';
import type { Hero as _HeroType, Page, PageList as PageListType } from '@/types/contentful';

// Define the component mapping for pageContent items
const componentMap = {
  Hero: Hero
  // Add other component types here as they are created
};

// Define props for the content component
interface ContentPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

// Generate static params for static site generation
export async function generateStaticParams() {
  // This would typically fetch all pages and page lists to pre-render
  // For now, we'll return an empty array as we're focusing on dynamic rendering
  return [];
}

// The dynamic content component that handles both Page and PageList
export default async function ContentPage({ params, searchParams }: ContentPageProps) {
  // Await the params Promise (required in Next.js)
  const resolvedParams = await params;
  await searchParams; // We need to await this even if we don't use it

  // Access params in a way that's compatible with Next.js async components
  const slug = resolvedParams?.slug;
  const preview = false; // Set to true if you want to enable preview mode

  try {
    // Try to fetch the content as a Page first
    console.log(`Attempting to fetch page with slug: ${slug}`);
    const page = await getPageBySlug(slug, preview);

    // If it's a Page, check if it belongs to a PageList
    if (page) {
      console.log(`Found page with slug: ${slug}, checking if it belongs to a PageList`);

      // Note: We no longer need to check if this page belongs to a PageList here
      // The middleware will handle redirections before this page component is rendered
      // This ensures we only render pages at their canonical URLs

      // If it doesn't belong to a PageList, render it as a standalone page
      console.log(`Rendering standalone page with slug: ${slug}`);
      return renderPage(page);
    }

    // If it's not a Page, try to fetch it as a PageList
    console.log(`No page found with slug: ${slug}, trying PageList`);
    const pageList = await getPageListBySlug(slug, preview);

    // If it's a PageList, render it
    if (pageList) {
      console.log(`Found PageList with slug: ${slug}`);
      return renderPageList(pageList);
    }

    console.log(`No Page or PageList found with slug: ${slug}`);
    // If neither Page nor PageList is found, return a 404
    notFound();
  } catch (error) {
    console.error(`Error handling slug: ${slug}`, error);

    // For now, show a 404 page on any error
    // In a production app, you might want to show a specific error page
    // depending on the type of error
    notFound();
  }
}

// Helper function to render a Page
function renderPage(page: Page) {
  // Get the page-specific header and footer if they exist
  const pageHeader = page.header;
  const pageFooter = page.footer;

  return (
    <PageLayout header={pageHeader} footer={pageFooter}>
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
            return <ComponentType key={component.sys.id} {...component} />;
          }

          // Log a warning if we don't have a component for this type
          console.warn(`No component found for type: ${typeName}`);
          return null;
        })}
      </main>

      {/* Render the page-specific footer if available */}
      {pageFooter && <Footer footerData={pageFooter} />}
    </PageLayout>
  );
}

// Helper function to render a PageList
function renderPageList(pageList: PageListType) {
  // Extract header and footer from the PageList
  const pageHeader = pageList.header;
  const pageFooter = pageList.footer;

  // Extract page content items if available
  const pageContentItems = pageList.pageContentCollection?.items ?? [];

  return (
    <PageLayout header={pageHeader} footer={pageFooter}>
      <main className="min-h-screen py-12">
        {/* Render any Hero components from pageContentCollection */}
        {pageContentItems.map((item, index) => {
          if (item.__typename === 'Hero') {
            const HeroComponent = componentMap.Hero;
            return <HeroComponent key={item.sys.id || `hero-${index}`} {...item} />;
          }
          return null;
        })}

        <div className="mx-auto max-w-7xl px-4">
          {/* Render the PageList component */}
          <PageList {...pageList} />
        </div>
      </main>

      {/* Render the page-specific footer if available */}
      {pageFooter && <Footer footerData={pageFooter} />}
    </PageLayout>
  );
}
