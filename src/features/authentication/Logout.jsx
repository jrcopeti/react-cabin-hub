import { useLogout } from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";

function Logout() {
  const { logout, isLoading } = useLogout();
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
      disabled={isLoading}
      onClick={logout}
    >
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
