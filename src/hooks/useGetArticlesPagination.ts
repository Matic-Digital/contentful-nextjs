"use client";
// This hook provides:
// 1. Pagination functionality for articles
// 2. Optimistic initial render with server data
// 3. Automatic data fetching when page changes
// 4. Cache management for better performance
// 5. Error handling with retries

// Dependencies
import { useQuery } from "@tanstack/react-query";

// Custom hooks
import { getAllArticles } from "@/lib/api";

// Types
import type { Article } from "@/lib/types";

/** Default number of articles to display per page */
export const ARTICLES_PER_PAGE = 3;

/** Structure of paginated articles data */
interface PaginatedArticles {
  /** Array of articles for the current page */
  items: Article[];
  /** Total number of articles in Contentful */
  total: number;
  /** Whether there are more articles after this page */
  hasMore: boolean;
}

/** Options for the pagination hook */
interface UseGetArticlesPaginationOptions {
  /** Current page number (1-based) */
  page: number;
  /** Initial articles from server */
  initialArticles: Article[];
  /** Optional articles per page override */
  articlesPerPage?: number;
}

/**
 * Fetches a page of articles from Contentful
 * @param page Current page number
 * @param perPage Articles per page
 */
export async function fetchArticlesPage(page: number, perPage: number) {
  // Calculate the number of articles to skip for pagination
  const skip = (page - 1) * perPage;
  // Fetch articles from Contentful
  const result = await getAllArticles(perPage, false, skip);

  // Return paginated articles data
  return {
    items: result.items,
    total: result.total,
    hasMore: skip + perPage < result.total,
  };
}

/**
 * Hook for managing paginated articles with React Query
 * Provides SSR support, caching, and automatic data fetching
 */
export function useGetArticlesPagination({
  page,
  initialArticles,
  articlesPerPage = ARTICLES_PER_PAGE,
}: UseGetArticlesPaginationOptions) {
  // Use React Query to manage paginated articles data
  return useQuery<PaginatedArticles>({
    // Cache key changes with page/size
    queryKey: ["articles", page, articlesPerPage],

    // Fetch function
    queryFn: () => fetchArticlesPage(page, articlesPerPage),

    // Initial data only for first page
    initialData:
      page === 1
        ? {
            items: initialArticles,
            total: 0, // API will provide real total
            hasMore: true, // Assume more until API responds
          }
        : undefined,

    // Query configuration
    staleTime: 0, // Always refetch on page change
    gcTime: 1000 * 60 * 30, // 30min cache
    retry: 2, // Retry failed requests
    refetchOnWindowFocus: false, // No refetch on focus
  });
}
