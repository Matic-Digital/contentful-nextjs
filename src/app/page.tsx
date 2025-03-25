// Next.js metadata types
import type { Metadata } from 'next';

import { Container } from '@/components/global/matic-ds';
import { getAllPages, getAllPageLists } from '@/lib/api';
import type { PageResponse, PageListResponse } from '@/types/contentful';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'Contentful Next.js Starter',
  description: 'Contentful Next.js Starter'
};

/**
 * Landing page
 */
export default async function HomePage() {
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
    </Container>
  );
}
