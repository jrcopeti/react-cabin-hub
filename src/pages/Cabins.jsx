import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  console.log(import.meta.env.VITE_SUPABASE_KEY);
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://bdrlwokzmlrxxkyemgrk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" alt="cabin-001" />
    </Row>
  );
}

export default Cabins;
