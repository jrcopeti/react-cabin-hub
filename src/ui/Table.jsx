import { createContext, useContext } from "react";
import styled from "styled-components";
import { screenSizes } from "../utils/constants";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;

  border-radius: 7px;
  overflow: scroll;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  &:nth-child(odd) {
    background-color: var(--color-grey-0);
  }

  &:nth-child(even) {
    background-color: var(--color-grey-50);
  }

  .not-important-mobile {
    &.important {
      display: block;
    }

    @media (max-width: ${screenSizes.tablet}) {
      &:not(.important) {
        display: none;
      }
    }
  }

  @media (max-width: ${screenSizes.tablet}) {
    grid-template-columns: ${(props) => props.mobilecolumns};
    row-gap: 1rem;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  &:nth-child(odd) {
    background-color: var(--color-grey-100);
  }

  @media (max-width: ${screenSizes.tablet}) {
    display: none;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: ${screenSizes.tablet}) {
    padding: 1.2rem 4rem 2.4rem ;
  }
`;

const StyledBody = styled.section`
  margin: 0rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();
function Table({ columns, mobilecolumns, children }) {
  return (
    <TableContext.Provider value={{ columns, mobilecolumns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}
function Header({ children }) {
  const { columns, mobilecolumns } = useContext(TableContext);
  return (
    <StyledHeader
      role="row"
      columns={columns}
      mobilecolumns={mobilecolumns}
      as="header"
    >
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns, mobilecolumns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns} mobilecolumns={mobilecolumns}>
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  if (!data.length) return <Empty>No cabins found</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
