import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import LogoLogin from "../ui/LogoLogin";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Login() {
  return (
    <LoginLayout>
      <LogoLogin />
      <Heading as="h4">Login to your account</Heading>
      <LoginForm />
      <StyledDiv>
        <NavLink to={"/users"}>
          <Button variation="secondary">
            {" "}
            Don't have an account?
            <strong> Sign Up </strong>
          </Button>
        </NavLink>
        <NavLink to={"/reset-password"}>
          <Button variation="secondary">Forgot your password?</Button>
        </NavLink>
      </StyledDiv>
    </LoginLayout>
  );
}

export default Login;
