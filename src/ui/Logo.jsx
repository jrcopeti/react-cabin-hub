import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png"
  const src1 = isDarkMode ? "/logo_trial_dark.png" : "/logo_trial_light.png";
  return <Img src={src1} alt="Logo" />;
}

export default Logo;
