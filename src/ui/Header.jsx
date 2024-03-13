import styled from "styled-components";

import UserAvatar from "../features/authentication/UserAvatar";
import { useOpenSidebar } from "../context/useOpenSideBar";

import HeaderMenu from "./HeaderMenu";
import ButtonIcon from "./ButtonIcon";

import { screenSizes } from "../utils/constants";

import { HiOutlineQueueList } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  grid-column: 1 / 3;

  @media (max-width: ${screenSizes.tablet}) {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 0.6rem 2.4rem;
  }
`;

function Header() {
  const { toggleSidebar, headerRef } = useOpenSidebar();
  return (
    <StyledHeader ref={headerRef}>
      <ButtonIcon onClick={toggleSidebar}>
        <HiOutlineQueueList />
      </ButtonIcon>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
