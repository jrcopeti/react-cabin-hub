import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function DashboardFilter() {
  return (
    <TableOperations>
      <Filter
        filterField="last"
        options={[
          { value: "7", label: "Last 7 days" },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 90 days" },
        ]}
      />
    </TableOperations>
  );
}

export default DashboardFilter;
