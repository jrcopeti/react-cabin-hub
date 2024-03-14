import { HiOutlineCog6Tooth } from "react-icons/hi2";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row>
      <Heading as="h1">
        <span>
          <HiOutlineCog6Tooth />
        </span>
        Update Hotel Settings
      </Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
