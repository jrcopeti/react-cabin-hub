import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("bookings.startDate");
  const method = searchParams.get("bookings.startDateMethod") || "eq";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "bookings.startDate", method, value: filterValue };

  // SortBy
  const sortByRaw = searchParams.get("sortBy") || "fullName-asc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: guests, count } = {},
    error,
  } = useQuery({
    queryKey: ["guests", filter, sortBy, page],
    queryFn: () => getGuests({ filter, sortBy, page }),
  });

  //  Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", sortBy, page + 1],
      queryFn: () => getGuests({ sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", sortBy, page - 1],
      queryFn: () => getGuests({ sortBy, page: page - 1 }),
    });

  return { isLoading, guests, count, error };
}
