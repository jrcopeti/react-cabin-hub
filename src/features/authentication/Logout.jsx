import { useLogout } from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

import { HiArrowRightOnRectangle } from "react-icons/hi2";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.8 }} disabled={isLoading} onClick={logout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
