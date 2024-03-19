import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function LogoLogin() {
  const { isDarkMode } = useDarkMode();
  // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png"
  const src1 = isDarkMode
    ? "/logo_trial_dark.png"
    : "/logo_trial_light_login.png";
  return (
    <StyledLogo>
      <Img src={src1} alt="Logo" />
    </StyledLogo>
  );
}

export default LogoLogin;
