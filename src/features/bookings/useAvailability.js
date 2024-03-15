import { useEffect, useState } from "react";
import { checkForOverlappingBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { isBefore, parseISO, startOfToday } from "date-fns";
import {
  HiOutlineEllipsisHorizontalCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
} from "react-icons/hi2";

export function useAvailability(cabinId, startDate, endDate) {
  const [availability, setAvailability] = useState({
    isAvailable: false,
    message: "",
    color: "grey",
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
            message: "The cabin is already booked. Try different dates",
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

  const handleMessageStyle = (messageAvailable) => {
    switch (messageAvailable) {
      case "Please select a cabin and dates":
      case "Failed to check availability. Please try again":
        return {
          color: "grey",
          Icon: HiOutlineEllipsisHorizontalCircle,
        };
      case "Start date cannot be before today":
      case "End date cannot be before start date":
      case "End date cannot be the same as start date":
        return {
          color: "red",
          Icon: HiOutlineXCircle,
        };
      case "The cabin is already booked. Try different dates":
        return {
          color: "yellow",
          Icon: HiOutlineExclamationTriangle, 
        };
      default:
        return {
          color: "grey",
          Icon: HiOutlineEllipsisHorizontalCircle, // Return the component itself, not an instance
        };
    }
  };

  return { availability, resetAvailability, handleMessageStyle };
}
