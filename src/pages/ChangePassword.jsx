

import styled from "styled-components";
import Heading from "../ui/Heading";
import ChangePasswordForm from "../features/authentication/ChangePasswordForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 52rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function ChangePassword() {
  return (
    <LoginLayout>
      <Heading as="h1">Change Password</Heading>
      <ChangePasswordForm />
    </LoginLayout>
  );
}

export default ChangePassword;
