import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useDeleteGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
    mutationFn: deleteGuestApi,
    onSuccess: () => {
      toast.success("Guest successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) =>
      toast.error(
        "Guest couldn't be deleted probably because has a reservation"
      ),
  });

  return { isDeleting, deleteGuest };
}
