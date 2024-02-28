import toast from "react-hot-toast";
import { updateBookingAll as updateBookingApi } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate: updateBooking, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newBookingData, id }) => updateBookingApi(id, newBookingData),
    onSuccess: () => {
      toast.success("Booking was successfully updated");
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
