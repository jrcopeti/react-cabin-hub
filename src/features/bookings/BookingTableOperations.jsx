import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-asc", label: "Sort by date (earliest)" },
          { value: "startDate-desc", label: "Sort by date (latest)" },
          { value: "cabinId-asc", label: "Sort by cabin (A-Z)" },
          { value: "cabinId-desc", label: "Sort by cabin (Z-A)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
          { value: "id-asc", label: "Sort by ID (low first)" },
          { value: "id-desc", label: "Sort by ID (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
