import { useQuery } from "@tanstack/react-query";
import { getBookingsByCabin } from "../../services/apiBookings";

export function useGetBookingsByCabin(cabinId = null) {
  const {
    isLoading: isLoadingBookedDates,
    data: bookedDates,
    error: errorBookedDates,
  } = useQuery({
    queryKey: ["bookings", cabinId],
    queryFn: () => getBookingsByCabin(cabinId),
  });

  return { isLoadingBookedDates, bookedDates, errorBookedDates };
}
