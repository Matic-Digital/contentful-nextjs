import { Metadata } from "next";

import { getAllArticles } from "@/lib/api";

import { ArticlesInfiniteList } from "@/components/ArticlesInfiniteList";

export const metadata: Metadata = {
  title: "Blog Posts | My Site",
  description: "Read our latest blog posts",
};

// Revalidate the page every hour
export const revalidate = 3600;

export default async function HomePage() {
  const { items: initialArticles } = await getAllArticles(3);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          All Blog Posts
        </h1>
        <div className="grid gap-6">
          <ArticlesInfiniteList initialArticles={initialArticles} />
        </div>
      </div>
    </main>
  );
}
