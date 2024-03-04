import { useEffect, useState } from "react";

import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

import Heading from "./Heading";
import Logo from "./Logo";
import Button from "./Button";

const MobileWarningStyled = styled.div`
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem 3rem;
  transition: all 0.5s;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.5s;


  @media (max-width: 1024px) {
    display: block;


  }
`;

const CloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 1.5rem;
  padding: 1.5rem;
`;

function MobileWarning() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function handleClose() {
    setIsOpen(false);
  }

  if (!isOpen) {
    return;
  }

  return (
    <Overlay>
      <MobileWarningStyled>
        <CloseButton onClick={handleClose}>
          <HiXMark />
        </CloseButton>
        <Logo />
        <StyledMain>
          <Heading as="h2">Mobile Device Detected</Heading>
          <p>
            We are still working on the mobile version.
            <br />
            Please access it on a desktop for the best experience.
          </p>
          <Button onClick={handleClose}>Close</Button>
        </StyledMain>
      </MobileWarningStyled>
    </Overlay>
  );
}
export default MobileWarning;
