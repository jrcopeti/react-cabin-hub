import Button from "../../ui/Button";
import CreateGuestForm from "./CreateGuestForm";
import Modal from "../../ui/Modal";
import styled from "styled-components";



function AddGuest() {
  return (
    <>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button>+ New Guest</Button>
        </Modal.Open>
        <Modal.Window name="guest-form">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddGuest;
