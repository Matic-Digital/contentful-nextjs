// Next.js metadata types
import type { Metadata } from 'next';

import { Container } from '@/components/global/matic-ds';
import { getAllPages, getAllPageLists, getPageBySlug } from '@/lib/api';
import type { PageResponse, PageListResponse, Page } from '@/types/contentful';
import { getAllFooters } from '@/lib/api';
import type { FooterResponse } from '@/types/contentful';
import { NavBar } from '@/components/global/NavBar';
import { Footer } from '@/components/global/Footer';
import { PageLayout } from '@/components/layout/PageLayout';
import { Hero } from '@/components/global/Hero';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'Contentful Next.js Starter',
  description: 'Contentful Next.js Starter'
};

// Define the component mapping for pageContent items
const componentMap = {
  Hero: Hero
  // Add other component types here as they are created
};

/**
 * Landing page
 *
 * This component first tries to fetch a page with the slug '/' from Contentful.
 * If such a page exists, it renders that page as the homepage.
 * Otherwise, it falls back to the default homepage that displays lists of pages and page lists.
 */
export default async function HomePage() {
  // Try to fetch a page with the slug '/' from Contentful
  const homePage = await getPageBySlug('/', false);

  // If a page with slug '/' exists, render it as the homepage
  if (homePage) {
    return renderContentfulHomePage(homePage);
  }

  // Otherwise, fall back to the default homepage
  return renderDefaultHomePage();
}

/**
 * Renders a Contentful page as the homepage
 */
async function renderContentfulHomePage(page: Page) {
  // Get the page-specific header and footer if they exist
  const pageHeader = page.header;
  const pageFooter = page.footer;

  return (
    <PageLayout header={pageHeader} footer={pageFooter}>
      {/* Render the page-specific header if available */}
      {pageHeader && <NavBar {...pageHeader} />}

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

/**
 * Renders the default homepage with lists of pages and page lists
 */
async function renderDefaultHomePage() {
  // Use try-catch blocks to handle potential API errors
  let pages: PageResponse = { items: [], total: 0 };
  let pageLists: PageListResponse = { items: [], total: 0 };

  try {
    pages = await getAllPages();
  } catch (error) {
    console.error('Error fetching pages:', error);
    // Continue with empty pages array
  }

  try {
    pageLists = await getAllPageLists();
  } catch (error) {
    console.error('Error fetching page lists:', error);
    // Continue with empty pageLists array
  }

  let footers: FooterResponse = { items: [], total: 0 };
  try {
    footers = await getAllFooters();
  } catch (error) {
    console.error('Error fetching footers:', error);
    // Continue with empty footers array
  }

  return (
    <Container className="py-8">
      <h1 className="mb-8 text-3xl font-bold">Contentful Next.js Starter</h1>

      {pages.items.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Pages</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pages.items.map((page) => (
              <div key={page.sys.id} className="rounded-lg border p-4 shadow-sm">
                <h3 className="mb-2 text-xl font-medium">{page.name}</h3>
                {page.description && <p className="text-gray-600">{page.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageLists.items.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Page Lists</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pageLists.items.map((pageList) => (
              <div key={pageList.sys.id} className="rounded-lg border p-4 shadow-sm">
                <h3 className="mb-2 text-xl font-medium">{pageList.name}</h3>
                <p className="text-sm text-gray-500">Slug: {pageList.slug}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {pages.items.length === 0 && pageLists.items.length === 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
          <h2 className="mb-2 text-lg font-medium">No content found</h2>
          <p>No pages or page lists were found in your Contentful space.</p>
        </div>
      )}

      {footers.items.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Footers</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {footers.items.map((footer) => (
              <div key={footer.sys.id} className="rounded-lg border p-4 shadow-sm">
                <h3 className="mb-2 text-xl font-medium">{footer.name}</h3>
                {footer.description && <p className="text-gray-600">{footer.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
