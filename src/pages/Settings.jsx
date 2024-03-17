import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <span>
            <HiOutlineAdjustmentsHorizontal />
          </span>
          Update Hotel Settings
        </Heading>
      </Row>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
