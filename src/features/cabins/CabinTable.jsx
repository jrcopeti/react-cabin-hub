import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { isLoading, cabins, error, count } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) throw new Error("Couldn't load cabins");
  if (!cabins.length) return <Empty resourceName="cabins" />;

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins =
    field === "name"
      ? filteredCabins.sort(
          (a, b) => a[field].localeCompare(b[field]) * modifier
        )
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" mobilecolumns="1fr">
        <Table.Header>
          <div>Picture</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} isLoading={isLoading} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
