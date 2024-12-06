import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { type Article } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/constants/images";

/** Props for individual article card components */
interface ArticleCardProps {
  article: Article;
  onMouseEnter: (slug: string) => void;
}

/**
 * Renders a single article card with image and metadata
 */
export function ArticleCard({ article, onMouseEnter }: ArticleCardProps) {
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
