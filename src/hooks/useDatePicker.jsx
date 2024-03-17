import { useState } from "react";
import { format } from "date-fns";

export function useDatePicker() {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const [booked, setBooked] = useState(false);

  const handleDayClick = (day, modifiers) => {
    setBooked(day && modifiers.booked);
  };

  const handleResetRange = () =>
    setRange({
      from: undefined,
      to: undefined,
    });

  let footer;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "dd/MMM/yyyy")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "dd/MMM/yyyy")} to{" "}
          {format(range.to, "dd/MMM/yyyy")}
        </p>
      );
    } else if (booked) {
      footer = <p>This day is already booked!</p>;
    }
  }

  return {
    range,
    setRange,
    footer,
    booked,
    setBooked,
    handleDayClick,
    handleResetRange,
  };
}
