import styled from "styled-components";
import { screenSizes } from "../utils/constants";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s;

  & div {
    background-color: var(--color-brand-200);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: 1rem 1.8rem;
    color: var(--color-grey-600);
    width: 20rem;
    height: auto;

    font-size: 1.3rem;
  }

  @media (max-width: ${screenSizes.tablet}) {
    font-size: 1rem;
    width: 30rem;

  }
`;

function PopoverContent({ children }) {
  return (
    <StyledDiv>
      <div>{children}</div>
    </StyledDiv>
  );
}

export default PopoverContent;
