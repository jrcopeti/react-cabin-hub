import styled, { css } from "styled-components";

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  ${(props) =>
    props.type === "normal" &&
    css`
      color: var(--color-brand-500);
      &:hover,
      &:active {
        color: var(--color-brand-600);
      }
    `}

  ${(props) =>
    props.type === "form" &&
    css`
      color: var(--color-grey-700);
      &:hover,
      &:active {
        color: var(--color-grey-500);
      }
    `}
`;

ButtonText.defaultProps = {
  type: "normal",
};

export default ButtonText;
