import styled from "styled-components";
import { format, isToday } from "date-fns";

import EditGuestForm from "./EditGuestForm";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { Flag } from "../../ui/Flag";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function GuestRow({ guest }) {
  const {
    id: guestId,
    fullName,
    email,
    nationality,
    nationalID,
    countryFlag,
  } = guest;

  const navigate = useNavigate();

  return (
    <Table.Row>
      <Cabin>{guestId}</Cabin>

      <Stacked>
        <span>{fullName}</span>
      </Stacked>

      <Stacked>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>{nationalID}</span>
      </Stacked>

      <Stacked>
        <span>{nationality}</span>
      </Stacked>

      <Stacked>
        {countryFlag && (
          <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
        )}
      </Stacked>

      <Stacked>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />
            <Menus.List id={guestId}>
              <Modal.Open opens="edit-booking">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-booking">
              <EditGuestForm guestToEdit={guest} />
            </Modal.Window>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete resourceName="booking" />
          </Modal.Window>
        </Modal>
      </Stacked>
    </Table.Row>
  );
}

export default GuestRow;
