"use client";

// Dependencies
import { useInfiniteQuery } from "@tanstack/react-query";

// Custom hooks
import { getAllArticles } from "@/lib/api";

// Constants
import { ARTICLES_PER_PAGE } from "@/constants/pagination";

// Types
import type { Article, ArticlesResponse } from "@/types";

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
    // Updated query function to match React Query's infinite query context
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: async ({ pageParam, signal }) => {
      try {
        const skip = ((pageParam as number) - 1) * ARTICLES_PER_PAGE;
        const response = await getAllArticles(ARTICLES_PER_PAGE, false, skip);

        if (!response.items.length && pageParam === 1) {
          throw new Error("No articles found");
        }

        return response;
      } catch (error) {
        // Convert any error to Error type
        throw error instanceof Error
          ? error
          : new Error("Failed to fetch articles");
      }
    },
    initialPageParam: 1,
    // Determine if there's a next page based on the hasMore flag
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length + 1;
    },
    // Updated initial data to match ArticlesResponse type
    initialData: initialData
      ? {
          pages: [
            {
              items: initialData,
              total: initialData.length,
              hasMore: false,
              totalPages: 1,
            },
          ],
          pageParams: [1],
        }
      : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry if we got a "No articles found" error
      if (error.message === "No articles found") return false;
      // Only retry 3 times for other errors
      return failureCount < 3;
    },
  });
}
