import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/lib/api";
import { ContentfulError, isContentfulError } from "@/lib/errors";
import type { ArticlesResponse } from "@/types";

interface UseGetArticlesPaginationProps {
  page: number;
  perPage: number;
  initialData: ArticlesResponse;
}

export function useGetArticlesPagination({
  page,
  perPage,
  initialData,
}: UseGetArticlesPaginationProps) {
  return useQuery({
    queryKey: ["articles", page, perPage],
    queryFn: async () => {
      try {
        const response = await getAllArticles(
          perPage,
          false,
          (page - 1) * perPage,
        );
        console.log("Pagination hook fetch:", { page, perPage, response });

        if (!response || !Array.isArray(response.items)) {
          throw new ContentfulError("Invalid response format from Contentful");
        }

        return response;
      } catch (error) {
        if (isContentfulError(error)) {
          throw error;
        }
        throw new ContentfulError("Failed to fetch paginated articles", error);
      }
    },
    initialData: page === 1 ? initialData : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
