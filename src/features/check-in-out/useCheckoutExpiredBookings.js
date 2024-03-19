import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateExpiredBookings } from "../../services/apiBookings";

export function useCheckoutExpiredBookings() {
  const queryClient = useQueryClient();

  const { mutate: checkoutExpiredBookings, isLoading: isCheckingOut } = useMutation({
    mutationFn: updateExpiredBookings({ status: "checked-out" }),

    onSuccess: () => {
      toast.success(`Expired bookings have been checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Could not check out. Please try again.");
    },
  });

  return { checkoutExpiredBookings, isCheckingOut };
}
