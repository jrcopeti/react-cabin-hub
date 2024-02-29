import { useMutation } from "@tanstack/react-query";

import { changePassword as changePasswordApi } from "../../services/apiAuth";

import toast from "react-hot-toast";

export function useChangePassword() {
  const { mutate: changePassword, isLoading: isUpdating } = useMutation({
    mutationFn: ({ updatedPassword }) => changePasswordApi(updatedPassword),
    onSuccess: () => {
      toast.success("Password has been reset");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { changePassword, isUpdating };
}
