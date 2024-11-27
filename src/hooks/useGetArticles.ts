"use client";

// Dependencies
import { useInfiniteQuery } from "@tanstack/react-query";

// Custom hooks
import { getAllArticles } from "@/lib/api";

// Types
import type { Article, ArticlesResponse } from "@/lib/types";

/**
 * Number of articles to fetch per page
 * Used for pagination and infinite scroll implementation
 */
const ARTICLES_PER_PAGE = 3;

/**
 * Custom hook for fetching and managing paginated articles
 * Uses React Query's infinite query capabilities for efficient data fetching and caching
 *
 * Features:
 * - Infinite scrolling support
 * - Automatic pagination
 * - Optional initial data hydration
 * - Built-in caching and request deduplication
 *
 * @param initialData - Optional array of articles for initial render
 * @returns React Query infinite query result with pagination controls
 */
export function useGetArticles(initialData?: Article[]) {
  return useInfiniteQuery<ArticlesResponse, Error>({
    queryKey: ["articles"],
    // Fetch function that handles pagination
    queryFn: async ({ pageParam = 1 }) => {
      const skip = (pageParam - 1) * ARTICLES_PER_PAGE;
      return getAllArticles(ARTICLES_PER_PAGE, false, skip);
    },
    initialPageParam: 1,
    // Determine if there's a next page based on the hasMore flag
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length + 1;
    },
    // Initialize with server-side data if available
    initialData: initialData
      ? {
          pages: [{ items: initialData, total: 0, hasMore: true }],
          pageParams: [1],
        }
      : undefined,
  });
}
