import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>

      <Row>
        <CabinTable />
        {showForm ? (
          <Button onClick={() => setShowForm((show) => !show)}>
            Close form
          </Button>
        ) : (
          <Button onClick={() => setShowForm((show) => !show)}>
            Add new Cabin
          </Button>
        )}
        {showForm && <CreateCabinForm onSetShowForm={setShowForm} />}
      </Row>
    </>
  );
}

export default Cabins;
