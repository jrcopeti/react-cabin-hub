import { useEffect, useState } from "react";
import { checkForOverlappingBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { isBefore, parseISO, startOfToday } from "date-fns";

export function useAvailability(cabinId, startDate, endDate) {
  const [availability, setAvailability] = useState({
    isAvailable: false,
    message: "",
  });

  useEffect(() => {
    const checkAvailability = async () => {
      if (!cabinId || !startDate || !endDate) {
        return setAvailability({
          isAvailable: false,
          message: "Please select a cabin and dates",
        });
      }

      if (isBefore(parseISO(startDate), startOfToday())) {
        setAvailability({
          isAvailable: false,
          message: "Start date cannot be before today",
        });

        return;
      }

      if (isBefore(parseISO(endDate), parseISO(startDate))) {
        setAvailability({
          isAvailable: false,
          message: "End date cannot be before start date",
        });

        return;
      }

      if (parseISO(endDate).getTime() === parseISO(startDate).getTime()) {
        setAvailability({
          isAvailable: false,
          message: "End date cannot be the same as start date",
        });

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
            message: "The cabin is already booked. Try different dates.",
          });
        } else {
          setAvailability({
            isAvailable: true,
            message: "The cabin is available for the selected dates!",
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
    checkAvailability();
  }, [cabinId, startDate, endDate]);

  const resetAvailability = () => {
    setAvailability({
      isAvailable: false,
      message: "Please select a cabin and dates",
    });
  };

  return { availability, resetAvailability };
}
