import { useState } from "react";
import { format } from "date-fns";
import { subtractDates } from "../utils/helpers";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  gap: 0.8rem;
  padding: 1.2rem 1.6rem;
  border-top: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
`;

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
      footer = <StyledFooter>{format(range.from, "dd MMM yyyy")}</StyledFooter>;
    } else if (range.to) {
      footer = (
        <StyledFooter>
          {format(range.from, "dd MMM yyyy")} -{" "}
          {format(range.to, "dd MMM yyyy")} <br />
          {subtractDates(range.to.toISOString(), range.from.toISOString())}{" "}
          nights
        </StyledFooter>
      );
      console.log(range.from);
      console.log(range.to);
      console.log(range.from.toISOString());
      console.log(range.to.toISOString());
      console.log(
        subtractDates(range.to.toISOString(), range.from.toISOString())
      );
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
