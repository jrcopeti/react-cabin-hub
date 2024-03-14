import styled from "styled-components";
import { screenSizes } from "../utils/constants";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;


  @media (max-width: ${screenSizes.tablet}) {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
