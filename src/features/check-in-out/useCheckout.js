import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} has been checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Could not check out. Please try again.");
    },
  });

  return { checkout, isCheckingOut };
}
