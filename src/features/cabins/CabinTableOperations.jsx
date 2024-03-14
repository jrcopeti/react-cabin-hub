import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <div>
        <span>
          <HiOutlineMagnifyingGlass />
        </span>
      <SortBy
        options={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "regularPrice-asc", label: "Price (low first)" },
          { value: "regularPrice-desc", label: "Price (high first)" },
          { value: "maxCapacity-asc", label: "Capacity (low first)" },
          { value: "maxCapacity-desc", label: "Capacity (high first)" },
        ]}
        />
        </div>
    </TableOperations>
  );
}

export default CabinTableOperations;
