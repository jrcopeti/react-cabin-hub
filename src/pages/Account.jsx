import { HiOutlineIdentification } from "react-icons/hi2";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <span>
            <HiOutlineIdentification />
          </span>
          Update your account
        </Heading>
      </Row>

      <Row type="form">
        <Heading as="h2">Update user data</Heading>
      </Row>
      <UpdateUserDataForm />

      <Row type="form">
        <Heading as="h2">Update password</Heading>
      </Row>
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
