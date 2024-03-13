import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Button from "../../ui/Button";

import { screenSizes } from "../../utils/constants";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";


const StyledCabinDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40rem;
  max-width: 50rem;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem 4rem;
  gap: 0.5rem;
  overflow: hidden;
  justify-content: center;

  @media (max-width: ${screenSizes.tablet}) {
    padding: 1.6rem 2rem;
    min-width: 80dvw;
    max-height: 85dvh;
  }
`;

const Section = styled.section`
  overflow: auto;
  max-height: 30rem;
  margin-bottom: 2rem;

  @media (max-width: ${screenSizes.tablet}) {
    max-height: 30dvh;
  }
`;

const Stacked = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
  border-bottom: 1px solid var(--color-grey-100);

  & span:first-child {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--color-grey-500);

    @media (max-width: ${screenSizes.tablet}) {
      font-size: 1.4rem;
    }
  }

  & span:last-child {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";

    @media (max-width: ${screenSizes.tablet}) {
      font-size: 1.8rem;
    }
  }
`;

const Discount = styled.p`
  font-size: 2rem;
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  border-radius: var(--border-radius-md);
`;

const Description = styled.div`
  padding: 1.6rem 1.2rem;
  font-size: 1.6rem;
  color: var(--color-grey-600);
  line-height: 1.6;

  @media (max-width: ${screenSizes.tablet}) {
    font-size: 1.4rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
`;

function CabinDetails({ cabin, onCloseModal, isLoading }) {
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

    if (isLoading) {
      return <Spinner />;
    }

  return (
    <>
      <StyledCabinDetails>
        <div>
          <Img src={image} alt={name} />
        </div>

        <Section>
          <Stacked>
            <span>Cabin</span>
            <span>{name}</span>
          </Stacked>

          <Stacked>
            <span>Maximum Capacity</span>
            <span>{maxCapacity} guests</span>
          </Stacked>

          <Stacked>
            <span>Price</span>
            <span>{formatCurrency(regularPrice)}</span>
          </Stacked>

          <Stacked>
            <span>Discount</span>
            {discount ? (
              <Discount>{formatCurrency(discount)}</Discount>
            ) : (
              <span>&mdash;</span>
            )}
          </Stacked>

          <Description>{description}</Description>
        </Section>
        <StyledNavLink to={"/bookings/new"}>
          <Button>Book</Button>
        </StyledNavLink>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Close
        </Button>
      </StyledCabinDetails>
    </>
  );
}

export default CabinDetails;