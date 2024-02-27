import TableOperations from "../../ui/TableOperations";

import SortBy from "../../ui/SortBy";

function GuestTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
          { value: "id-asc", label: "Sort by ID (asc)" },
          { value: "id-desc", label: "Sort by ID (desc)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
