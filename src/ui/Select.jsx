import styled from "styled-components";
import React from "react";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const Select = React.forwardRef(
  ({ options, value, onChange, ...props }, ref) => (
    <StyledSelect ref={ref} value={value} onChange={onChange} {...props}>
      {options.map((option, index) => (
        <option key={`${option.value}-${index}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
);

Select.displayName = "Select";

export default Select;
