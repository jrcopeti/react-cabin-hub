import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { HiOutlineHomeModern } from "react-icons/hi2";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <span>
            <HiOutlineHomeModern />
          </span>
          Cabins
        </Heading>
        <AddCabin />
        <CabinTableOperations />
      </Row>

        <CabinTable />

    </>
  );
}

export default Cabins;
