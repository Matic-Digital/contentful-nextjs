"use client";

// Dependencies
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

// Custom hooks for article pagination and data fetching
import {
  useGetArticlesPagination,
  ARTICLES_PER_PAGE,
  fetchArticlesPage,
} from "@/hooks/useGetArticlesPagination";
import { articleQueryOptions } from "@/hooks/useGetArticle";

// UI Components from shadcn/ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Types
import type { Article } from "@/lib/types";

/** Fallback image for articles without a featured image */
const PLACEHOLDER_IMAGE = "https://placehold.co/600x400/png";

/** Props for the main ArticlesList component */
interface ArticlesListProps {
  /** Initial articles provided by server for first render */
  initialArticles: Article[];
  /** Whether to show pagination controls */
  showPagination?: boolean;
}

/** Props for individual article card components */
interface ArticleCardProps {
  /** Article data to display */
  article: Article;
  /** Callback for prefetching article data on hover */
  onMouseEnter: (slug: string) => void;
}

/**
 * Renders a single article card with image and metadata
 * Includes hover effects and link to article detail
 */
function ArticleCard({ article, onMouseEnter }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      onMouseEnter={() => onMouseEnter(article.slug)}
      className="group block h-full"
    >
      <Card className="h-full overflow-hidden transition-colors">
        <CardContent className="overflow-hidden p-0">
          <Image
            src={article.featuredImage?.url ?? PLACEHOLDER_IMAGE}
            alt={`Cover image for ${article.title}`}
            height={263}
            width={350}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </CardContent>
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          <CardFooter className="px-0 pt-2">
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <div>ID: {article.sys.id}</div>
              <div>Slug: {article.slug}</div>
            </div>
          </CardFooter>
        </CardHeader>
      </Card>
    </Link>
  );
}

/**
 * Main component for displaying a paginated list of articles
 * Features:
 * - Server-side rendering with initialArticles
 * - Client-side pagination (optional)
 * - Data prefetching for smooth navigation
 * - Loading states and error handling
 * - Responsive grid layout
 */
export function ArticlesList({
  initialArticles,
  showPagination = true,
}: ArticlesListProps) {
  // Pagination state
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // Fetch articles data with pagination
  const { data, error, isLoading, status } = useGetArticlesPagination({
    page,
    initialArticles,
  });

  /** Prefetch article detail data on hover */
  const handleMouseEnter = (slug: string) => {
    void queryClient.prefetchQuery(articleQueryOptions(slug));
  };

  /** Prefetch next/previous page data */
  const handlePrefetchPage = (pageNum: number) => {
    if (pageNum < 1) return;
    void queryClient.prefetchQuery({
      queryKey: ["articles", pageNum, ARTICLES_PER_PAGE],
      queryFn: () => fetchArticlesPage(pageNum, ARTICLES_PER_PAGE),
    });
  };

  /** Handle page navigation with data prefetching */
  const handlePageChange = async (newPage: number) => {
    // Ensure the new page is valid
    if (newPage < 1 || newPage > totalPages) return;

    // Pre-fetch the next page data
    await queryClient.prefetchQuery({
      queryKey: ["articles", newPage, ARTICLES_PER_PAGE],
      queryFn: () => fetchArticlesPage(newPage, ARTICLES_PER_PAGE),
    });

    // Update the page state
    setPage(newPage);
  };

  // Handle error state
  if (status === "error") {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        Error loading articles: {error.message}
      </div>
    );
  }

  // Calculate pagination state
  const totalArticles = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalArticles / ARTICLES_PER_PAGE));
  const hasNextPage = data?.hasMore ?? false;
  const hasPrevPage = page > 1;

  // Debug logging
  console.log("Pagination:", {
    page,
    totalArticles,
    totalPages,
    currentItems: data?.items?.length,
    hasNextPage,
    hasPrevPage,
    rawData: data,
  });

  return (
    <div className="stack gap-8">
      {/* Loading state with skeleton UI */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(ARTICLES_PER_PAGE)].map((_, i) => (
            <Card key={i} className="h-[400px] animate-pulse bg-muted" />
          ))}
        </div>
      ) : (
        /* Grid of article cards */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items.map((article) => (
            <ArticleCard
              key={article.sys.id}
              article={article}
              onMouseEnter={handleMouseEnter}
            />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {showPagination && (
        <div className="flex items-center justify-between border-t pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.max(1, page - 1));
                  }}
                  onMouseEnter={() => handlePrefetchPage(page - 1)}
                  disabled={!hasPrevPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.min(totalPages, page + 1));
                  }}
                  onMouseEnter={() => handlePrefetchPage(page + 1)}
                  disabled={!hasNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
