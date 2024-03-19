import styled from "styled-components";

import UserAvatar from "../features/authentication/UserAvatar";
import { useOpenSidebar } from "../hooks/useOpenSideBar";

import HeaderMenu from "./HeaderMenu";
import ButtonIcon from "./ButtonIcon";

import { screenSizes, windowSizes } from "../utils/constants";

import { HiOutlineQueueList } from "react-icons/hi2";

import { useAutoFocus } from "../hooks/useAutoFocus";
import { useWindowSize } from "../hooks/useWindowSize";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  grid-column: 1 / 3;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);

  @media (max-width: ${screenSizes.tablet}) {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 0.6rem 2.4rem;
  }
`;

function Header() {
  const { toggleSidebar, headerRef } = useOpenSidebar();
  const sidebarButtonFocus = useAutoFocus();
  const { width } = useWindowSize();

  return (
    <>
      <StyledHeader ref={headerRef}>
        <ButtonIcon
          whileHover={{ scale: 1.6 }}
          whileTap={width >= windowSizes.tablet ? { scale: 1 } : { scale: 1.6 }}
          transition={
            width >= windowSizes.tablet
              ? { duration: 0.3, type: "spring", stiffness: 250 }
              : { duration: 0.3, type: "spring", stiffness: 300 }
          }
          onClick={toggleSidebar}
          ref={sidebarButtonFocus}
        >
          <HiOutlineQueueList />
        </ButtonIcon>

        <UserAvatar />
        <HeaderMenu />
      </StyledHeader>
    </>
  );
}

export default Header;
