import styled from "styled-components";
import { screenSizes } from "../utils/constants";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s;
  width: 30rem;

  & div {
    background-color: var(--color-grey-400);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: 1rem 1.8rem;
    opacity: 0.95;
    color: var(--color-grey-700);
    width: 20rem;
    height: auto;

    font-size: 1.3rem;
  }

  @media (max-width: ${screenSizes.tablet}) {



    & div {

      width: 20rem;

    }

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
