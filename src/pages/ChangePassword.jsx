

import styled from "styled-components";
import Heading from "../ui/Heading";
import ChangePasswordForm from "../features/authentication/ChangePasswordForm";
import { screenSizes } from "../utils/constants";

const LoginLayout = styled.main`
  min-height: 80dvh;
  display: grid;
  grid-template-columns: 52rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media (max-width: ${screenSizes.tablet}) {
    grid-template-columns: 1fr;
    padding: 1rem 1.8rem 3.2rem;
    gap: 1.6rem;
  }
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
