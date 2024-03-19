import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests, getGuestsWithBookings } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("bookings.startDate");
  const method = searchParams.get("bookings.startDateMethod") || "eq";

  const isAllGuests = !filterValue || filterValue === "all";
  const filter = isAllGuests
    ? null
    : { field: "bookings.startDate", method, value: filterValue };

  // SortBy
  const sortByRaw = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const queryKey = isAllGuests
    ? ["guests", sortBy, page]
    : ["guestsWithBookings", filter, sortBy, page];

  const queryFn = isAllGuests ? getGuests : getGuestsWithBookings;

  const {
    isLoading,
    data: { data: guests, count } = {},
    error,
  } = useQuery({
    queryKey,
    queryFn: () => queryFn({ filter, sortBy, page }),
    enabled: isAllGuests || !!filter,
  });

  //  Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const queryKeyPrev = isAllGuests
    ? ["guests", sortBy, page - 1]
    : ["guestsWithBookings", filter, sortBy, page - 1];

  const queryKeyNext = isAllGuests
    ? ["guests", sortBy, page + 1]
    : ["guestsWithBookings", filter, sortBy, page + 1];

  const queryFnPrev = isAllGuests
    ? () => getGuests({ sortBy, page: page - 1 })
    : () => getGuestsWithBookings({ filter, sortBy, page: page - 1 });
    
  const queryFnNext = isAllGuests
    ? () => getGuests({ sortBy, page: page + 1 })
    : () => getGuestsWithBookings({ filter, sortBy, page: page + 1 });

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: queryKeyNext,
      queryFn: queryFnNext,
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: queryKeyPrev,
      queryFn: queryFnPrev,
    });

  return {
    isLoading,
    guests,
    error,
    count,
  };
}
