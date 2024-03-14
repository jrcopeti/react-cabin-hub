import styled from "styled-components";

import EditGuestForm from "./EditGuestForm";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { Flag } from "../../ui/Flag";

import { useDeleteGuest } from "./useDeleteGuest";
import { screenSizes, windowSizes } from "../../utils/constants";
import { useWindowSize } from "../../hooks/useWindowSize";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (max-width: ${screenSizes.tablet}) {
    font-size: 1.6rem;
  }
`;

const Stacked = styled.div`
  & span:first-child {
    font-weight: 500;

    @media (max-width: ${screenSizes.tablet}) {
      font-size: 1.8rem;
    }
  }
  & span:last-child {
    color: var(--color-grey-500);

    @media (max-width: ${screenSizes.tablet}) {
      font-size: 1.4rem;
    }
  }
`;

const Number = styled.div`
  font-family: "Sono";
  font-weight: 500;

  @media (max-width: ${screenSizes.tablet}) {
    font-size: 1.4rem;
  }
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
  const { width } = useWindowSize();

  return (
    <>
      {width >= windowSizes.tablet ? (
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

          <Stacked>
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
      ) : (
        <Table.Row>
          <Stacked>
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
          </Stacked>
          <Cabin>{guestId}</Cabin>

          <Stacked>
            <span> {fullName}</span>
            <span></span>
          </Stacked>

          <Stacked>
            <span>{email}</span>
          </Stacked>

          <Number>
            <span>{nationalID}</span>
          </Number>

          <Stacked>
            <span>{nationality}</span>
          </Stacked>

          <Stacked>
            {countryFlag && (
              <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
            )}
          </Stacked>
        </Table.Row>
      )}
    </>
  );
}

export default GuestRow;
