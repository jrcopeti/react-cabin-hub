import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoading2,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading || isLoading2 || isLoading3) return <Spinner />;
  console.log(stays);
  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>todays actvity</div>
      <div>chat stay durations</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
