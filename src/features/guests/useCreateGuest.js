import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createGuest } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createGuest, isCreating };
}
