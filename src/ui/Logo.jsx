import styled, { css } from "styled-components";
import { useDarkMode } from "../context/useDarkMode";
import { useOpenSidebar } from "../context/useOpenSideBar";

const display = {
  openSidebar: css`
    visibility: visible;
    opacity: 1;
  `,
  closedSidebar: css`
    visibility: hidden;
    opacity: 0;
  `,
};

const StyledLogo = styled.div`
  transition: visibility ease-in-out 0.2s, opacity ease-in-out 0.3s;
  ${(props) => display[props.display]};
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const { isSidebarOpen } = useOpenSidebar();
  // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png"
  const src1 = isDarkMode ? "/logo_trial_dark.png" : "/logo_trial_light.png";
  return (
    <StyledLogo display={isSidebarOpen ? "openSidebar" : "closedSidebar"}>
      <Img src={src1} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
