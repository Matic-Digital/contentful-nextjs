"use client";

import { useArticles } from "@/lib/hooks/useArticles";
import { articleQueryOptions } from "@/lib/hooks/useArticle";
import { getArticle } from "@/lib/api";
import { Article } from "@/lib/types";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface ArticlesInfiniteListProps {
  initialArticles: Article[];
}

export function ArticlesInfiniteList({
  initialArticles,
}: ArticlesInfiniteListProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "100px",
  });

  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useArticles(initialArticles);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleMouseEnter = (slug: string) => {
    void queryClient.prefetchQuery(articleQueryOptions(slug));
  };

  if (status === "error") {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-700">
        Error loading articles: {error.message}
      </div>
    );
  }

  const totalArticles = data?.pages[0]?.total ?? 0;
  const loadedArticles =
    data?.pages.reduce((acc, page) => acc + page.items.length, 0) ?? 0;

  return (
    <div className="grid gap-6">
      {data?.pages.map((group, i) => (
        <div key={i} className="grid gap-6">
          {group.items.map((article) => (
            <article
              key={article.sys.id}
              className="group rounded-lg border p-4 transition-all hover:border-blue-500 hover:bg-gray-50 hover:shadow-md"
              onMouseEnter={() => handleMouseEnter(article.slug)}
            >
              <Link href={`/articles/${article.slug}`} className="block">
                <h2 className="text-xl font-semibold transition-colors group-hover:text-blue-600">
                  {article.title}
                </h2>
              </Link>
            </article>
          ))}
        </div>
      ))}

      <div ref={ref} className="flex justify-center py-4 text-sm text-gray-600">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            Loading more...
          </div>
        ) : hasNextPage ? (
          <div>
            Showing {loadedArticles} of {totalArticles} articles
          </div>
        ) : (
          <div>All {totalArticles} articles loaded</div>
        )}
      </div>
    </div>
  );
}
