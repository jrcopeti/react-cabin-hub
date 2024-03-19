import { useDarkMode } from "../hooks/useDarkMode";
import { useWindowSize } from "../hooks/useWindowSize";
import { windowSizes } from "../utils/constants";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { width } = useWindowSize();

  return (
    <ButtonIcon
      whileHover={{ scale: 1.6 }}
      whileTap={width >= windowSizes.tablet ? { scale: 1 } : { scale: 1.6 }}
      transition={
        width >= windowSizes.tablet
          ? { duration: 0.3, type: "spring", stiffness: 250 }
          : { duration: 0.3, type: "spring", stiffness: 300 }
      }
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
