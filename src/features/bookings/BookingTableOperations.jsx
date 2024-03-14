import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

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
      <div>
        <span>
          <HiOutlineMagnifyingGlass />
        </span>

        <SortBy
          options={[
            { value: "startDate-asc", label: "Start Date (earliest)" },
            { value: "startDate-desc", label: "Start Date (latest)" },
            { value: "created_at-asc", label: "Booked on (earliest)" },
            { value: "created_at-desc", label: "Booked on (latest)" },
            { value: "cabinId-asc", label: "Cabin (A-Z)" },
            { value: "cabinId-desc", label: "Cabin (Z-A)" },
            {
              value: "totalPrice-desc",
              label: "Amount (high first)",
            },
            { value: "totalPrice-asc", label: "Amount (low first)" },
            { value: "id-asc", label: "ID # (low first)" },
            { value: "id-desc", label: "ID # (high first)" },
          ]}
        />
      </div>
    </TableOperations>
  );
}

export default BookingTableOperations;
