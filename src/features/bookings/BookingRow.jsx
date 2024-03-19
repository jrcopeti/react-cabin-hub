import styled from "styled-components";
import { format, isToday } from "date-fns";
import { useDeleteBooking } from "./useDeleteBooking";
import EditBookingForm from "./EditBookingForm";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency, toLocalISODate } from "../../utils/helpers";
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
import { useWindowSize } from "../../hooks/useWindowSize";
import { screenSizes, windowSizes } from "../../utils/constants";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (max-width: ${screenSizes.tablet}) {
    font-size: 1.8rem;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
    @media (max-width: ${screenSizes.tablet}) {
      font-size: 1.6rem;
    }
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
    @media (max-width: ${screenSizes.tablet}) {
      font-size: 1.4rem;
    }
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  @media (max-width: ${screenSizes.tablet}) {
    font-size: 1.5rem;
  }
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    observations,
    hasBreakfast,
    isPaid,
    cabinPrice,
    extraPrice,
    totalPrice,
    status,
    guests: { fullName: guestName, email, id: guestId },
    cabins: { name: cabinName, id: cabinId },
  } = booking;

  const bookingEditData = {
    id: bookingId,
    created_at,
    startDate: toLocalISODate(startDate),
    endDate: toLocalISODate(endDate),
    numNights,
    numGuests,
    cabinId,
    guestId,
    observations,
    hasBreakfast,
    isPaid,
    cabinPrice,
    extraPrice,
    totalPrice,
    status: "unconfirmed",
  };

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { width } = useWindowSize();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      {width >= windowSizes.tablet ? (
        <Table.Row>
          <Cabin>{bookingId} </Cabin>

          <Stacked>
            <span>{cabinName}</span>
            <span></span>
          </Stacked>

          <Stacked>
            <span>{guestName}</span>
            <span>{email}</span>
          </Stacked>

          <Stacked>
            <span>
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}{" "}
              &rarr; {numNights} night stay
            </span>
            <span>
              {format(new Date(startDate), "EEE, dd MMM yyyy")} &mdash;{" "}
              {format(new Date(endDate), "EEE, dd MMM yyyy")}
            </span>
          </Stacked>

          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

          <Amount>{formatCurrency(totalPrice)}</Amount>

          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={bookingId} />
              <Menus.List id={bookingId}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/bookings/${bookingId}`)}
                >
                  See details
                </Menus.Button>

                {status === "unconfirmed" && (
                  <>
                    <Menus.Button
                      icon={<HiArrowDownOnSquare />}
                      onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                      Check in
                    </Menus.Button>

                    <Modal.Open opens="edit-booking">
                      <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                    </Modal.Open>
                  </>
                )}

                {status === "checked-in" && (
                  <Menus.Button
                    icon={<HiArrowUpOnSquare />}
                    onClick={() => checkout(bookingId)}
                    disabled={isCheckingOut}
                  >
                    Check out
                  </Menus.Button>
                )}

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit-booking">
                <EditBookingForm bookingToEdit={bookingEditData} />
              </Modal.Window>
            </Menus.Menu>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() => deleteBooking(bookingId)}
              />
            </Modal.Window>
          </Modal>
        </Table.Row>
      ) : (
        <Table.Row>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={bookingId} />
              <Menus.List id={bookingId}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/bookings/${bookingId}`)}
                >
                  See details
                </Menus.Button>

                {status === "unconfirmed" && (
                  <>
                    <Menus.Button
                      icon={<HiArrowDownOnSquare />}
                      onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                      Check in
                    </Menus.Button>

                    <Modal.Open opens="edit-booking">
                      <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                    </Modal.Open>
                  </>
                )}

                {status === "checked-in" && (
                  <Menus.Button
                    icon={<HiArrowUpOnSquare />}
                    onClick={() => checkout(bookingId)}
                    disabled={isCheckingOut}
                  >
                    Check out
                  </Menus.Button>
                )}

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit-booking">
                <EditBookingForm bookingToEdit={bookingEditData} />
              </Modal.Window>
            </Menus.Menu>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() => deleteBooking(bookingId)}
              />
            </Modal.Window>
          </Modal>
          <Cabin>{bookingId}</Cabin>

          <Stacked>
            <span>{cabinName}</span>
            <span></span>
          </Stacked>

          <Stacked>
            <span>{guestName}</span>
            <span>{email}</span>
          </Stacked>

          <Stacked>
            <span>
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}{" "}
              &rarr; {numNights} night stay
            </span>
            <span>
              {format(new Date(startDate), "EEE, dd MMM yyyy")} &mdash;{" "}
              {format(new Date(endDate), "EEE, dd MMM yyyy")}
            </span>
          </Stacked>

          <Amount>{formatCurrency(totalPrice)}</Amount>

          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </Table.Row>
      )}
    </>
  );
}

export default BookingRow;
