import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Heading from "./Heading";
import Logo from "./Logo";

const MobileWarningStyled = styled.div`
  display: none;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  text-align: center;
  background-color: var(--color-grey-50);

  align-items: center;
  padding: 0.5rem;


  @media (max-width: 1024px) {
    display: flex;
  }
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 3rem;
  gap: 1rem;
`;

function MobileWarning() {
  return (
    <>
      <GlobalStyles />
      <MobileWarningStyled>
        <StyledMain>
          <Logo />
          <Heading as="h2">Mobile Device Detected</Heading>
          <p>
            This application is optimized for desktop usage and may not function
            as intended on mobile devices.
            <br />
            Please access it on a desktop for the best experience.
          </p>
        </StyledMain>
      </MobileWarningStyled>
    </>
  );
}

export default MobileWarning;
