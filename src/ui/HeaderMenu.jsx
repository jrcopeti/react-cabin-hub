import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";
import { useWindowSize } from "../hooks/useWindowSize";
import { windowSizes } from "../utils/constants";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon
          whileHover={{ scale: 1.6 }}
          whileTap={width >= windowSizes.tablet ? { scale: 1 } : { scale: 1.6 }}
          transition={
            width >= windowSizes.tablet
              ? { duration: 0.3, type: "spring", stiffness: 250 }
              : { duration: 0.3, type: "spring", stiffness: 300 }
          }
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
