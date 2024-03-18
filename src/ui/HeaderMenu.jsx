import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => navigate("/account")}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
