import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";

import { useOpenSidebar } from "../context/useOpenSideBar";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { screenSizes } from "../utils/constants";

const sidebar = {
  open: css`
    grid-template-columns: 26rem 1fr;
  `,
  closed: css`
    grid-template-columns: 0rem 1fr;
  `,
};
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: auto;
  transition: ease-in-out 0.3s;
  ${(props) => sidebar[props.sidebar]}
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media (max-width: ${screenSizes.tablet}) {
    padding: 2rem 2.4rem 3.2rem;
    height: 100dvh;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  gap: 3.2rem;

  @media (max-width: ${screenSizes.laptop}) {
  }

  @media (max-width: ${screenSizes.tablet}) {
    gap: 1.6rem;
  }
`;

function AppLayout() {
  const { isSidebarOpen } = useOpenSidebar();

  return (
    <>
      <StyledAppLayout sidebar={isSidebarOpen ? "open" : "closed"}>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
