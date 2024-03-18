import styled from "styled-components";
import { motion } from "framer-motion";

const ButtonIcon = styled(motion.button)`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
