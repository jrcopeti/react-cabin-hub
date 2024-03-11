import { forwardRef } from "react";
import { useDarkMode } from "../context/useDarkMode";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const DarkModeToggle = forwardRef(function DarkModeToggle(_, ref) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon ref={ref} onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
});

export default DarkModeToggle;
