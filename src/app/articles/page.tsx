// Next.js metadata types
import type { Metadata } from 'next';

// API and constants
import { getAllArticles } from '@/lib/api';

// Components
import { Container } from '@/components/global/matic-ds';

import { ArticlesList } from '@/components/articles/ArticlesList';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all our articles and blog posts'
};

/**
 * Articles page displaying all articles with pagination
 */
export default async function ArticlesPage() {
  const initialArticles = await getAllArticles(4);
  console.log('Articles page data:', initialArticles);

  return (
    <Container>
      <h1>All Articles</h1>

      <div className="mt-8 md:mt-12">
        <ErrorBoundary>
          <ArticlesList
            initialArticles={initialArticles.items}
            initialTotal={initialArticles.total}
            perPage={4}
            showPagination={true}
          />
        </ErrorBoundary>
      </div>
    </Container>
  );
}
