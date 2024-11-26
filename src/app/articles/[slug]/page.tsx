import { getAllArticles, getArticle } from "@/lib/api";
import type { Article } from "@/lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

// Generate static pages for all articles
export async function generateStaticParams() {
  const { items: articles } = await getAllArticles(3);
  return articles.map((article: Article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: `Read about ${article.title}`,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="mb-4">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </a>
      </div>

      <article className="prose prose-lg mx-auto">
        <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
        <div className="text-gray-600">
          <div>ID: {article.sys.id}</div>
          <div>Slug: {article.slug}</div>
        </div>
      </article>
    </div>
  );
}
