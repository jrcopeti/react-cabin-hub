import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import styled from "styled-components";

const StyledNewUsers = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function NewUsers() {
  return (
    <StyledNewUsers>
      <Main>
        <Container>
          <Heading as="h1">
            Create an account to get started
          </Heading>
          <SignupForm />
        </Container>
      </Main>
    </StyledNewUsers>
  );
}

export default NewUsers;
