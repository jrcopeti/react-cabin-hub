import { format } from "date-fns";
import styled from "styled-components";
import { subtractDates } from "../utils/helpers";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  gap: 0.8rem;
  padding: 1.2rem 1.6rem;
  border-top: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-md);
`;

function FooterDatePicker({ range }) {
  let footer;

  if (range?.from && !range?.to) {
    footer = <StyledFooter>{format(range.from, "dd MMM yyyy")}</StyledFooter>;
  }

  if (range?.from && range?.to) {
    const numberOfNights = subtractDates(
      range.to.toISOString(),
      range.from.toISOString()
    );

    footer = (
      <StyledFooter>
        {format(range.from, "dd MMM yyyy")} - {format(range.to, "dd MMM yyyy")}{" "}
        <br />
        {numberOfNights} night{numberOfNights > 1 ? "s" : ""}
      </StyledFooter>
    );
  }

  return <>{footer}</>;
}

export default FooterDatePicker;
