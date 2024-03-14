import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import styled from "styled-components";
import { screenSizes } from "../utils/constants";

const StyledNewUsers = styled.main`
  min-height: 80dvh;
  display: grid;
  grid-template-columns: 1fr 48;
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

function Signup() {
  return (
    <StyledNewUsers>
      <Heading as="h1">Create an account to get started</Heading>
      <SignupForm />
    </StyledNewUsers>
  );
}

export default Signup;
