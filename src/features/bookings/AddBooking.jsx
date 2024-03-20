import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";

function AddBooking() {
  return (
    <div>
      <NavLink to="/bookings/new">
        <Button>
          + New Booking
        </Button>
      </NavLink>
    </div>
  );
}

export default AddBooking;
