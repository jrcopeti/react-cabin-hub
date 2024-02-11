import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {stays, confirmedStays, isLoading: isLoading2} = useRecentStays()

  if (isLoading || isLoading2) return <Spinner />;
  console.log(stays);
  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <div>Statitcs</div>
      <div>todays actvity</div>
      <div>chat stay durations</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
