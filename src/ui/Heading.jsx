import styled, { css } from "styled-components";

const Heading = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 500;
      text-align: center;
    `}



  & span {
    display: flex;
    align-items: center;
    font-size: 2.8rem;
  }

  line-height: 1.5;
`;

export default Heading;
