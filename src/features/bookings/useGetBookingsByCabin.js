import { useQuery } from "@tanstack/react-query";
import { getBookingsByCabin } from "../../services/apiBookings";

export function useGetBookingsByCabin(cabinId = null) {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", cabinId],
    queryFn: () => getBookingsByCabin(cabinId),
  });

  return { isLoading, bookings, error };
}
