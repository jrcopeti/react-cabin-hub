import { useState } from "react";

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

  return {
    range,
    setRange,
    booked,
    setBooked,
    handleDayClick,
    handleResetRange,
  };
}
