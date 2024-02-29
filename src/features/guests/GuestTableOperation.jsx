import TableOperations from "../../ui/TableOperations";

import SortBy from "../../ui/SortBy";

function GuestTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "fullName-asc", label: "Name (A-Z)" },
          { value: "fullName-desc", label: "Name (Z-A)" },
          { value: "id-asc", label: "ID # (asc)" },
          { value: "id-desc", label: "ID # (desc)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
