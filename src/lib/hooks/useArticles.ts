"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/lib/api";
import type { Article, ArticlesResponse } from "@/lib/types";

const ARTICLES_PER_PAGE = 3;

export function useArticles(initialData?: Article[]) {
  return useInfiniteQuery<ArticlesResponse, Error>({
    queryKey: ["articles"],
    queryFn: async ({ pageParam = 1 }) => {
      const skip = (pageParam - 1) * ARTICLES_PER_PAGE;
      return getAllArticles(ARTICLES_PER_PAGE, false, skip);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length + 1;
    },
    initialData: initialData
      ? {
          pages: [{ items: initialData, total: 0, hasMore: true }],
          pageParams: [1],
        }
      : undefined,
  });
}
