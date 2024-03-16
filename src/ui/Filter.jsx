import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { screenSizes } from "../utils/constants";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active
      ? css`
          background-color: var(--color-brand-600);
          color: var(--color-brand-50);
        `
      : undefined}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  @media (max-width: ${screenSizes.tablet}) {
    padding: 0.4rem 0.6rem;
    font-size: 1.2rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(option) {
    searchParams.set(filterField, option.value);

    if (option.method) {
      searchParams.set(filterField + "Method", option.method);
    } else {
      searchParams.delete(filterField + "Method");
    }

    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  const currentMethod =
    searchParams.get(filterField + "Method") || options.at(0).method;

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option)}
          key={option.value + option.method}
          active={
            option.value === currentFilter && option.method === currentMethod
              ? "true"
              : undefined
          }
          disabled={
            option.value === currentFilter && option.method === currentMethod
          }
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
