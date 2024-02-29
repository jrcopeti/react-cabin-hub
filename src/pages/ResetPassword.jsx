import styled from "styled-components";
import Heading from "../ui/Heading";

import ResetPasswordForm from "../features/authentication/ResetPasswordForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  & p {
    color: var(--color-grey-500);
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
