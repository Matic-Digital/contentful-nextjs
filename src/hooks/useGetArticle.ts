"use client";

// Dependencies
import { useQuery } from "@tanstack/react-query";

// Custom hooks
import { getArticle } from "@/lib/api";

// Types
import type { Article } from "@/lib/types";

/**
 * Query configuration for fetching a single article
 * Extracted as a separate function to enable prefetching and reuse
 *
 * @param slug - URL-friendly identifier for the article
 * @returns React Query options object with query key and fetch function
 * @throws Error if article is not found
 */
export const articleQueryOptions = (slug: string) => ({
  queryKey: ["article", slug] as const,
  queryFn: async () => {
    const article = await getArticle(slug);
    if (!article) throw new Error("Article not found");
    return article;
  },
});

/**
 * Custom hook for fetching and managing a single article
 * Uses React Query for efficient data fetching, caching, and state management
 *
 * Features:
 * - Automatic error handling
 * - Caching with configurable stale time
 * - Optional initial data hydration
 * - No retry on 404 errors
 *
 * @param slug - URL-friendly identifier for the article
 * @param initialData - Optional article data for initial render
 * @returns React Query result with article data and status
 */
export function useGetArticle(slug: string, initialData?: Article) {
  return useQuery<Article, Error>({
    ...articleQueryOptions(slug),
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
