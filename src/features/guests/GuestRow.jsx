import styled from "styled-components";

import EditGuestForm from "./EditGuestForm";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { Flag } from "../../ui/Flag";

import { useDeleteGuest } from "./useDeleteGuest";
import { screenSizes } from "../../utils/constants";

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
  @media (max-width: ${screenSizes.tablet}) {
    flex-direction: row;
    gap: 0.5rem;
  }
`;

const StackedModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  @media (max-width: ${screenSizes.tablet}) {
    flex-direction: row;
    gap: 0rem;
    flex: 1;
  }
`;

const Number = styled.div`
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

  const { deleteGuest, isDeleting } = useDeleteGuest();

  return (
    <Table.Row>
      <Cabin>{guestId}</Cabin>

      <Stacked>
        <span>{fullName}</span>
      </Stacked>

      <Stacked>
        <span>{email}</span>
      </Stacked>

      <Number>
        <span>{nationalID}</span>
      </Number>

      <Stacked className="not-important-mobile">
        <span>{nationality}</span>
      </Stacked>

      <Stacked>
        {countryFlag && (
          <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
        )}
      </Stacked>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={guestId} />
          <Menus.List id={guestId}>
            <Modal.Open opens="edit-guest">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit-guest">
            <EditGuestForm guestToEdit={guest} />
          </Modal.Window>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="cabins"
            disabled={isDeleting}
            onConfirm={() => deleteGuest(guestId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default GuestRow;
