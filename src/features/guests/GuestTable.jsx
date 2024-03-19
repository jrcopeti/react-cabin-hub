import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useGuests } from "./useGuests";
import GuestRow from "./GuestRow";

function GuestTable() {
  const { guests, isLoading, count, error } = useGuests();

  if (isLoading) return <Spinner />;

  if (error) throw new Error("Couldn't load guests");

  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table
        columns="0.6fr 1.2fr 1.4fr 1.1fr 1.2fr 0.1fr 0.5fr"
        mobilecolumns="1fr"
      >
        <Table.Header>
          <div>Id</div>
          <div>Guest</div>
          <div>email</div>
          <div>Document</div>
          <div>Nationality</div>
          <div>Flag</div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow key={guest.id} guest={guest} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
