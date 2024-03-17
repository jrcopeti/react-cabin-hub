import styled, { css } from "styled-components";
import { screenSizes } from "../utils/constants";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;

      @media (max-width: ${screenSizes.tablet}) {
        width: 100%;
      }
    `}

  overflow: auto;
  font-size: 1.4rem;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
