import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import Modal from "../../ui/Modal";
import { NavLink } from "react-router-dom";

function AddBooking() {
  return (
    <div>
      <NavLink to="/bookings/new">
        <Button>
          + New Booking
        </Button>
      </NavLink>
      {/* <Modal>
        <Modal.Open opens="booking-form">
          <Button>Add new Booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal> */}
    </div>
  );
}

export default AddBooking;
