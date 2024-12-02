// Next.js metadata types
import type { Metadata } from "next";

// API functions
import { getAllArticles } from "@/lib/api";

// Components
import { ArticlesList } from "@/components/ArticlesList";

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: "Latest Articles",
  description: "Browse our latest articles and blog posts",
};

/**
 * Homepage component displaying latest articles
 */
export default async function HomePage() {
  // Fetch initial articles for server-side rendering (3 latest articles)
  const initialArticles = await getAllArticles();
  console.log("Home page data:", initialArticles);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Latest Articles
        </h1>
        <ArticlesList
          initialArticles={initialArticles.items}
          initialTotal={initialArticles.total}
          showPagination={false}
        />
      </div>
    </main>
  );
}
