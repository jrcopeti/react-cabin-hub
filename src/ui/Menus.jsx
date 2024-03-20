import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClickAndScroll } from "../hooks/useOutsideClickAndScroll";
import styled from "styled-components";
import { motion } from "framer-motion";
import { windowSizes } from "../utils/constants";
import { useWindowSize } from "../hooks/useWindowSize";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled(motion.button)`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);
  const { width } = useWindowSize();

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    let calculatedX = window.innerWidth - rect.width - rect.x;
    let calculatedY = rect.y + rect.height + 8;

    // To fix the position of the modal when it's close to the bottom of the screen
    const modalHeight = 160;
    if (calculatedY + modalHeight > window.innerHeight) {
      calculatedY = rect.y - modalHeight - 8;
    }

    setPosition({
      x: calculatedX,
      y: calculatedY,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  
  return (
    <StyledToggle
      whileHover={{ scale: 1.4, rotate: -90 }}
      whileTap={
        width >= windowSizes.tablet
          ? { scale: 0.8 }
          : { scale: 1.6, rotate: -90 }
      }
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  const ref = useOutsideClickAndScroll(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
