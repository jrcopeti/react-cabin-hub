import styled, { css } from "styled-components";
import { screenSizes } from "../utils/constants";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      min-width: 120rem;
      font-size: 3rem;

      @media (max-width: ${screenSizes.laptop}) {
        min-width: 88rem;
      }

      @media (max-width: ${screenSizes.tablet}) {
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        min-width: 30rem;
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
