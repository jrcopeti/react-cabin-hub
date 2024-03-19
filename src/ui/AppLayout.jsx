import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { useOpenSidebar } from "../hooks/useOpenSideBar";
import { screenSizes } from "../utils/constants";

const StyledAppLayout = styled.div`
  min-height: 100dvh;
  transition: ease-in-out 0.35s;
  margin-top: 6rem;
  transition: all 0.5s;

  @media (max-width: ${screenSizes.tablet}) {
    margin-top: 4.8rem;
  }
`;

const transform = {
  open: css`
    @media (max-width: ${screenSizes.tablet}) {
      /* transform: translateX(26rem);
      transition: ease-in-out 0.35s; */
    }
  `,
  closed: css`
    @media (max-width: ${screenSizes.tablet}) {
      /* transform: translateX(0rem);
      transition: ease-in-out 0.35s; */
    }
  `,
};

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  min-height: 100dvh;

  overflow: auto;

  ${(props) => transform[props.transform]}

  @media (max-width: ${screenSizes.tablet}) {
    padding: 2rem 2.4rem 3.2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  gap: 3.2rem;

  @media (max-width: ${screenSizes.tablet}) {
    gap: 1.6rem;
  }
`;

function AppLayout() {
  const { isSidebarOpen } = useOpenSidebar();

  return (
    <>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main transform={isSidebarOpen ? "open" : "closed"}>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
