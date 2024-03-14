import styled from "styled-components";
import { screenSizes } from "../utils/constants";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  min-width: 34rem;

& div {
  display: flex;
  align-items: center;
  gap: 1.6rem;

}

  & span {
    display: flex;
    
    font-size: 2.5rem;

  }


  @media (max-width: ${screenSizes.tablet}) {
    flex-direction: column;
    gap: 0.8rem;

  }
`;

export default TableOperations;
