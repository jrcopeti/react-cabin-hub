import styled, { css } from "styled-components";
import { screenSizes } from "../utils/constants";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      min-width: 30rem;


      @media (max-width: ${screenSizes.tablet}) {
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
      }
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
