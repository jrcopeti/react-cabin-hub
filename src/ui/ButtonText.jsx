import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ButtonText = styled(motion.button)`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;

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

      &:hover {

        color: var(--color-indigo-500);
      }

      &:active {
        color: var(--color-grey-500);
      }

      &:focus {
        outline: none;
      }
    `}
`;

ButtonText.defaultProps = {
  type: "normal",
};

export default ButtonText;
