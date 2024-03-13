import Uploader from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";

import styled from "styled-components";
import { useOpenSidebar } from "../context/useOpenSideBar";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  gap: 2rem;
  transition: ease-in-out 0.3s;
`;

function Sidebar() {
  const { sidebarRef } = useOpenSidebar();
  return (
    <StyledSidebar ref={sidebarRef}>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
