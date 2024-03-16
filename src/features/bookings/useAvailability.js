import { useEffect, useState } from "react";
import { checkForOverlappingBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { isBefore, parseISO, startOfToday } from "date-fns";
import {
  HiOutlineEllipsisHorizontalCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { useSettings } from "../settings/useSettings";
import { subtractDates } from "../../utils/helpers";

export function useAvailability(cabinId, startDate, endDate) {
  const initialState = {
    isAvailable: false,
    message: "",
    color: "grey",
    Icon: HiOutlineEllipsisHorizontalCircle,
  };

  const [availability, setAvailability] = useState({ initialState });

  const { settings } = useSettings();

  useEffect(() => {
    const checkAvailability = async () => {
      if (cabinId && !startDate && !endDate) {
        return setAvailability({
          isAvailable: false,
          message: "Please select a check in and a check out dates",
          color: "grey",
          Icon: HiOutlineEllipsisHorizontalCircle,
        });
      }

      if (cabinId && startDate && !endDate) {
        return setAvailability({
          isAvailable: false,
          message: "Please select a check out date",
          color: "grey",
          Icon: HiOutlineEllipsisHorizontalCircle,
        });
      }

      if (cabinId && !startDate && endDate) {
        return setAvailability({
          isAvailable: false,
          message: "Please select a check in date",
          color: "grey",
          Icon: HiOutlineEllipsisHorizontalCircle,
        });
      }

      if (!cabinId || !startDate || !endDate) {
        return setAvailability({
          isAvailable: false,
          message: "Please select a cabin",
          color: "grey",
          Icon: HiOutlineEllipsisHorizontalCircle,
        });
      }

      if (isBefore(parseISO(startDate), startOfToday())) {
        setAvailability({
          isAvailable: false,
          message: "Check in cannot be before today",
          color: "red",
          Icon: HiOutlineXCircle,
        });

        return;
      }

      if (isBefore(parseISO(endDate), parseISO(startDate))) {
        setAvailability({
          isAvailable: false,
          message: "Check out cannot be before check in",
          color: "red",
          Icon: HiOutlineXCircle,
        });

        return;
      }

      if (parseISO(endDate).getTime() === parseISO(startDate).getTime()) {
        setAvailability({
          isAvailable: false,
          message: "Check out cannot be the same date as check in",
          color: "red",
          Icon: HiOutlineXCircle,
        });

        return;
      }

      if (subtractDates(endDate, startDate) < settings?.minBookingLength) {
        setAvailability({
          isAvailable: false,
          message: `Minimum number of nights is ${settings?.minBookingLength}`,
          color: "red",
          Icon: HiOutlineXCircle,
        });

        return;
      }

      if (subtractDates(endDate, startDate) > settings?.maxBookingLength) {
        setAvailability({
          isAvailable: false,
          message: `Maximum number of nights is ${settings?.maxBookingLength}`,
          color: "red",
          Icon: HiOutlineXCircle,
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
            color: "yellow",
            Icon: HiOutlineExclamationTriangle,
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
          color: "red",
          Icon: HiOutlineXCircle,
        });
      }
    };
    checkAvailability();
  }, [cabinId, startDate, endDate, settings?.minBookingLength, settings?.maxBookingLength]);

  const resetAvailability = () => {
    setAvailability({
      initialState,
    });
  };

  return { availability, resetAvailability };
}
