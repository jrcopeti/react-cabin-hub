import styled from "styled-components";
import { screenSizes } from "../../utils/constants";

const DashboardBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: ${screenSizes.tablet}) {
    width: 90dvw;
    align-self: center;
    padding: 1.6rem;
  }
`;

export default DashboardBox;
