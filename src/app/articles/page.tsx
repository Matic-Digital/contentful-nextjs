// Next.js metadata types
import { Metadata } from "next";

// Hooks
import { getAllArticles } from "@/lib/api";

// Components
import { ArticlesList } from "@/components/ArticlesList";

/**
 * Metadata for the articles page
 * Provides SEO information and page details
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: "Articles | Matic",
  description: "Browse all our blog articles",
};

/**
 * Cache revalidation configuration
 * Content will be revalidated every hour to ensure fresh data
 * while maintaining good performance
 */
export const revalidate = 3600;

/**
 * Articles page component
 * Server-side rendered page that displays a list of all articles
 * Features:
 * - Initial data fetching for 6 articles
 * - Responsive typography
 * - Centered content layout
 * - Descriptive header section
 */
export default async function ArticlesPage() {
  // Fetch initial articles for server-side rendering
  // Using 6 articles for the dedicated articles page
  const { items: initialArticles } = await getAllArticles(6);

  return (
    <div className="container py-8 md:py-12">
      {/* Header Section */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          All Articles
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover our latest thoughts, ideas, and insights about technology,
          design, and development.
        </p>
      </div>

      {/* Articles List Section */}
      <div className="mt-10">
        <ArticlesList initialArticles={initialArticles} />
      </div>
    </div>
  );
}
