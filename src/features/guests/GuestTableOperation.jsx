import TableOperations from "../../ui/TableOperations";

import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import { getToday } from "../../utils/helpers";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function GuestTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="bookings.startDate"
        options={[
          { value: "all", label: "All" },
          { value: `${getToday()}`, label: "Has a booking starting today" },
          {
            value: `${getToday()}`,
            method: "gt",
            label: "Has upcoming bookings",
          },
        ]}
      />
      <div>
        <span>
          <HiOutlineMagnifyingGlass />
        </span>
        <SortBy
          options={[
            { value: "fullName-asc", label: "Name (A-Z)" },
            { value: "fullName-desc", label: "Name (Z-A)" },
            { value: "id-asc", label: "ID # (asc)" },
            { value: "id-desc", label: "ID # (desc)" },
          ]}
        />
      </div>
    </TableOperations>
  );
}

export default GuestTableOperations;
