'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';

// Custom hooks for article data fetching
import { useGetArticlesPagination } from '@/hooks/useGetArticlesPagination';
import { articleQueryOptions } from '@/hooks/useGetArticle';

// UI Components
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

import { Box } from '@/components/global/matic-ds';

import { ArticleCard } from '@/components/articles/ArticleCard';

// Types
import { type Article } from '@/types';

/** Props for the main ArticlesList component */
interface ArticlesListProps {
  /** Initial articles provided by server for first render */
  initialArticles: Article[];
  /** Total number of articles available */
  initialTotal?: number;
  /** Whether to show pagination controls */
  showPagination?: boolean;
  /** Number of articles per page (only needed when showPagination is true) */
  perPage?: number;
}

/**
 * Loading skeleton component for articles
 */
function ArticleSkeleton() {
  return (
    <Card className="h-full overflow-hidden transition-colors">
      <CardContent className="overflow-hidden p-0">
        <Skeleton className="aspect-[4/3] w-full object-cover" />
      </CardContent>
      <CardHeader>
        <Skeleton className="line-clamp-2 h-6 w-3/4" />
        <CardFooter className="px-0 pt-2">
          <div className="flex flex-col gap-1 text-xs">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

/**
 * Main component for displaying a paginated list of articles
 */
export function ArticlesList({
  initialArticles,
  initialTotal,
  showPagination = true,
  perPage = 3
}: ArticlesListProps) {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // Determine grid columns based on perPage
  const gridCols =
    {
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4'
    }[perPage] ?? 'lg:grid-cols-3';

  // Only fetch data if pagination is enabled
  const { data, isLoading } = useGetArticlesPagination({
    page,
    perPage,
    initialData: {
      items: initialArticles,
      total: initialTotal ?? initialArticles.length,
      hasMore: (initialTotal ?? initialArticles.length) > perPage,
      totalPages: Math.ceil((initialTotal ?? initialArticles.length) / perPage)
    }
  });

  // Prefetch article data on hover
  const handleArticleHover = (slug: string) => {
    void queryClient.prefetchQuery(articleQueryOptions(slug));
  };

  console.log('ArticlesList render:', {
    initialArticles,
    perPage,
    showPagination,
    currentData: data,
    isLoading,
    initialTotal
  });

  // Only show pagination if we have more than one page and pagination is enabled
  const shouldShowPagination = showPagination && (data?.total ?? initialTotal ?? 0) > perPage;

  // Use initial articles when pagination is disabled
  const articles = showPagination ? (data?.items ?? initialArticles) : initialArticles;
  const totalPages = showPagination
    ? (data?.totalPages ?? Math.ceil((initialTotal ?? initialArticles.length) / perPage))
    : 1;

  return (
    <Box direction="col" gap={8}>
      <Box cols={{ sm: 1, md: 2 }} gap={6} className={cn(gridCols)}>
        {isLoading
          ? Array.from({ length: perPage }).map((_, i) => <ArticleSkeleton key={i} />)
          : articles.map((article) => (
              <ArticleCard
                key={article.sys.id}
                article={article}
                onMouseEnter={handleArticleHover}
              />
            ))}
      </Box>

      {shouldShowPagination && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
                disabled={page <= 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </Box>
  );
}
