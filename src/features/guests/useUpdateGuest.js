import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGuest as updateGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useUpdateGuest() {
  const queryClient = useQueryClient();

  const { mutate: updateGuest, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, editGuestData }) => updateGuestApi(id, editGuestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateGuest, isUpdating };
}
