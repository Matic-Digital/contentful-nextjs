"use client";

import { useQuery } from "@tanstack/react-query";
import { getArticle } from "@/lib/api";
import type { Article } from "@/lib/types";

export const articleQueryOptions = (slug: string) => ({
  queryKey: ["article", slug] as const,
  queryFn: async () => {
    const article = await getArticle(slug);
    if (!article) throw new Error("Article not found");
    return article;
  },
});

export function useArticle(slug: string, initialData?: Article) {
  return useQuery<Article, Error>({
    ...articleQueryOptions(slug),
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
