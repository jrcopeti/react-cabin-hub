// import Uploader from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";

import styled, { css } from "styled-components";
import { useOpenSidebar } from "../context/useOpenSideBar";

const transform = {
  open: css`
    position: fixed;
    z-index: 10;
    transform: translate(0);
    transition: ease-in-out 0.4s;
  `,

  closed: css`
    position: fixed;
    z-index: 10;
    transition: ease-in-out 0.4s;
    transform: translate(-100%);
  `,
};

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 26rem;
  height: 100%;
  box-shadow: var(--shadow-md);
  ${(props) => transform[props.transform]}
`;

function Sidebar() {
  const { sidebarRef, isSidebarOpen } = useOpenSidebar();
  return (
    <StyledSidebar
      ref={sidebarRef}
      transform={isSidebarOpen ? "open" : "closed"}
    >
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
