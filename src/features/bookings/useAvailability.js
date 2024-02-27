import { useState } from "react";
import { checkForOverlappingBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { isBefore, parseISO, startOfToday } from "date-fns";

export function useAvailability(watch) {
  const [availability, setAvailability] = useState({
    isAvailable: false,
  });

  const checkAvailability = async () => {
    const cabinId = watch("cabinId");
    const startDate = watch("startDate");
    const endDate = watch("endDate");

    if (!cabinId || !startDate || !endDate) {
      setAvailability({
        isAvailable: false,
      });
      toast.error("Please fill in all fields before checking availability.");
      return;
    }

    if (isBefore(parseISO(startDate), startOfToday())) {
      setAvailability({
        isAvailable: false,
      });
      toast.error("Start date cannot be before today");
      return;
    }

    if (isBefore(parseISO(endDate), parseISO(startDate))) {
      setAvailability({
        isAvailable: false,
      });
      toast.error("End date cannot be before start date");
      return;
    }

    if (parseISO(endDate).getTime() === parseISO(startDate).getTime()) {
      setAvailability({
        isAvailable: false,
      });
      toast.error("End date cannot be the same as start date");
      return;
    }

    try {
      const hasOverlap = await checkForOverlappingBookings(
        cabinId,
        startDate,
        endDate
      );
      if (hasOverlap) {
        setAvailability({
          isAvailable: false,
        });
        toast.error("The cabin is already booked for the selected dates.");
      } else {
        setAvailability({
          isAvailable: true,
        });
        toast.success("The cabin is available for the selected dates!");
      }
    } catch (error) {
      console.error(error);
      setAvailability({
        isAvailable: false,
        message: "Failed to check availability. Please try again.",
      });
    }
  };

  const resetAvailability = () => {
    setAvailability({
      isAvailable: false,
    });
  };

  return { availability, checkAvailability, resetAvailability };
}
