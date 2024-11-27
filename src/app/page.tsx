// Next.js types
import { Metadata } from "next";

// API functions
import { getAllArticles } from "@/lib/api";

// Components
import { ArticlesList } from "@/components/ArticlesList";

/**
 * Metadata configuration for SEO
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: "Blog Articles | My Site",
  description: "Read our latest blog articles",
};

/**
 * Cache revalidation configuration
 * Content will be revalidated every hour to ensure fresh data
 */
export const revalidate = 3600; // Revalidate every hour

/**
 * Home page component
 * Server-side rendered page that displays a list of blog articles
 * Features:
 * - Initial data fetching for articles
 * - Responsive design with Tailwind
 * - Gradient background
 */
export default async function HomePage() {
  // Fetch initial articles for server-side rendering
  const { items: initialArticles } = await getAllArticles(3);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Latest Articles
        </h1>
        <ArticlesList
          initialArticles={initialArticles}
          showPagination={false}
        />
      </div>
    </main>
  );
}
