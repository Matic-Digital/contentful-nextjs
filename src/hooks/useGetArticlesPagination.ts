import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/lib/api";
import { type ArticlesResponse } from "@/lib/types";

interface UseGetArticlesPaginationProps {
  page: number;
  pageSize: number;
  initialData: ArticlesResponse;
}

export function useGetArticlesPagination({
  page,
  pageSize,
  initialData,
}: UseGetArticlesPaginationProps) {
  return useQuery({
    queryKey: ["articles", page, pageSize],
    queryFn: async () => {
      const response = await getAllArticles(
        pageSize,
        false,
        (page - 1) * pageSize,
      );
      console.log("Pagination hook fetch:", { page, pageSize, response });
      return response;
    },
    initialData: page === 1 ? initialData : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
