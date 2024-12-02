// Next.js metadata types
import type { Metadata } from "next";

// API and constants
import { getAllArticles } from "@/lib/api";

// Components
import { ArticlesList } from "@/components/ArticlesList";

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all our articles and blog posts",
};

/**
 * Articles page displaying all articles with pagination
 */
export default async function ArticlesPage() {
  const initialArticles = await getAllArticles(4);
  console.log("Articles page data:", initialArticles);

  return (
    <div className="container py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="text-4xl font-bold">All Articles</h1>
      </header>

      <div className="mt-8 md:mt-12">
        <ArticlesList
          initialArticles={initialArticles.items}
          initialTotal={initialArticles.total}
          pageSize={4}
          showPagination={true}
        />
      </div>
    </div>
  );
}
