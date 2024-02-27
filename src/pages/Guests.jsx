import AddGuest from "../features/guests/AddGuest";
import GuestTable from "../features/guests/GuestTable";
import GuestTableOperations from "../features/guests/GuestTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Guest() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
        <GuestTableOperations />
        <AddGuest />
      </Row>

      <Row>
        <GuestTable />
      </Row>
    </>
  );
}

export default Guest;
