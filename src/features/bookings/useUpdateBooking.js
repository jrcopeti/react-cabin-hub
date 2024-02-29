import toast from "react-hot-toast";
import { updateAllColumnsBooking as updateBookingApi } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate: updateBooking, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, editBookingData }) =>
      updateBookingApi(id, editBookingData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateBooking, isUpdating };
}
