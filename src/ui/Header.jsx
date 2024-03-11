import styled from "styled-components";
import { forwardRef } from "react";

import UserAvatar from "../features/authentication/UserAvatar";
import { useOpenSidebar } from "../context/useOpenSideBar";

import HeaderMenu from "./HeaderMenu";
import ButtonIcon from "./ButtonIcon";

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
`;

const Header = forwardRef(function Header() {
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
});

export default Header;
