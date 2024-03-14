import styled from "styled-components";
import Heading from "../ui/Heading";

import ResetPasswordForm from "../features/authentication/ResetPasswordForm";
import { screenSizes } from "../utils/constants";

const LoginLayout = styled.main`
  min-height: 80dvh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  & p {
    color: var(--color-grey-500);
  }

  @media (max-width: ${screenSizes.tablet}) {
    grid-template-columns: 1fr;
    padding: 1rem 1.8rem 3.2rem;
    gap: 1.6rem;
  }
`;

function ResetPassword() {
  return (
    <LoginLayout>
      <Heading as="h1">Reset Password</Heading>
      <p>
        Enter your email address and we will send you a link to reset your
        password.
      </p>
      <ResetPasswordForm />
    </LoginLayout>
  );
}

export default ResetPassword;
