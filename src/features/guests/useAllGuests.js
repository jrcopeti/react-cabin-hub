import { useQuery } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";

export function useAllGuests() {
  const {
    isLoading,
    data: guests,
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getAllGuests,
  });

  return { isLoading, guests, error };
}
