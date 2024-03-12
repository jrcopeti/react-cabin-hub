import AddGuest from "../features/guests/AddGuest";
import GuestTable from "../features/guests/GuestTable";
import GuestTableOperations from "../features/guests/GuestTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
        <AddGuest />
        <GuestTableOperations />
      </Row>

      <GuestTable />
    </>
  );
}

export default Guests;
