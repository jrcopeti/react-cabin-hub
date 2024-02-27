import styled, { css } from "styled-components";

const flexs = {
  end: css`
    justify-content: flex-end;
  `,
  start: css`
    justify-content: flex-start;
  `,
};

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  ${(props) => flexs[props.flex]}
`;

ButtonGroup.defaultProps = {
  flex: "end",
};

export default ButtonGroup;
