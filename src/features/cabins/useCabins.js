import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useCabins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins({ page }),
  });

  //  Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["cabins", page + 1],
      queryFn: () => getCabins({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["cabins", page - 1],
      queryFn: () => getCabins({ page: page - 1 }),
    });

  return { isLoading, cabins, count, error };
}
