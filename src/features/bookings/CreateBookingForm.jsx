import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useCreateBookings } from "./useCreateBookings";
import { useSettings } from "../settings/useSettings";
import { useAllCabins } from "../cabins/useAllCabins";
import { useAllGuests } from "../guests/useAllGuests";
import { useAvailability } from "./useAvailability";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import Row from "../../ui/Row";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import PopoverContent from "../../ui/PopoverContent";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency, subtractDates } from "../../utils/helpers";

import { isBefore, isValid, parseISO, startOfToday } from "date-fns";
import styled, { css } from "styled-components";
import { windowSizes } from "../../utils/constants";
import {
  HiOutlineSquaresPlus,
  HiOutlineQuestionMarkCircle,
  HiOutlineEllipsisHorizontalCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";

import { ArrowContainer, Popover } from "react-tiny-popover";
import { usePopover } from "../../hooks/usePopover";
import { useWindowSize } from "../../hooks/useWindowSize";

const color = {
  red: css`
    background-color: var(--color-red-100);
    color: var(--color-red-700);
    text-shadow: 2px 2px 2px var(--color-red-100);
  `,
  grey: css`
    background-color: var(--color-grey-50);
    color: var(--color-grey-500);
    text-shadow: 2px 2px 2px var(--color-grey-100);
  `,

  yellow: css`
    background-color: var(--color-yellow-100);
    color: var(--color-yellow-700);
    text-shadow: 2px 2px 2px var(--color-yellow-100);
  `,
};

const Message = styled.div`
  ${(props) => color[props.color]}
  padding: 1.6rem 2.4rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
  font-weight: 500;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: ease-in-out 0.35s;

  & span {
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    text-align: center;
  }
`;

function CreateBookingForm() {
  const { createBooking, isLoading: isCreating } = useCreateBookings();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useAllCabins();

  const { guests, isLoading: isLoadingGuests } = useAllGuests();

  const moveBack = useMoveBack();

  const navigate = useNavigate();

  const { cabinId: cabinIdUrl } = useParams();

  const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } =
    usePopover();

  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cabinId: cabinIdUrl || "",
      numGuests: 1,
      cabinPrice: 0,
      extraPrice: 0,
      totalPrice: 0,
      hasBreakfast: false,
      isPaid: false,
    },
  });

  useEffect(() => {
    reset({
      cabinId: cabinIdUrl || "",
    });
  }, [cabinIdUrl, reset]);

  const cabinIdInput = watch("cabinId");
  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");

  const { availability, resetAvailability } = useAvailability(
    cabinIdInput,
    startDateInput,
    endDateInput
  );

  const { isAvailable, message: messageAvailable, color, Icon } = availability;

  const numNightsInput =
    startDateInput && endDateInput && endDateInput > startDateInput
      ? subtractDates(endDateInput, startDateInput)
      : 0;

  if (isLoadingSettings || isLoadingCabins || isLoadingGuests)
    return <Spinner />;

  const cabinOptions = [
    { value: "", label: "Select a Cabin" },
    ...cabins
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cabin) => ({
        value: cabin.id,
        label: `${cabin.name}  (${cabin.maxCapacity} guests)`,
      })),
  ];

  const guestOptions = [
    { value: "", label: "Select a Guest" },
    ...guests
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
      .map((guest) => ({
        value: guest.id,
        label: guest.fullName,
      })),
  ];

  const numGuestInput = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");

  const cabinInput = cabins.find(
    (cabinInput) => cabinInput.id === Number(cabinIdInput)
  );

  const numGuestOptions = [
    { value: "", label: "Select a number" },
    ...Array.from({ length: cabinInput?.maxCapacity }, (_, i) => ({
      value: i + 1,
      label: `${i + 1} guest${i > 0 ? "s" : ""}`,
    })),
  ];

  const cabinPriceInput = cabinInput
    ? cabinInput.regularPrice * numNightsInput
    : 0;

  const extraPriceInput = hasBreakfast
    ? numNightsInput * settings.breakfastPrice * Number(numGuestInput)
    : 0;

  const discountInput = cabinInput ? cabinInput.discount : 0;

  const totalPriceInput = cabinPriceInput + extraPriceInput - discountInput;

  function handleReset() {
    resetAvailability();
    reset();
    navigate("/bookings/new", { replace: true });
  }

  function onSubmit(data) {
    // selected Cabin
    const cabinIdNum = Number(data.cabinId);
    const reservedCabin = cabins.find((cabin) => cabin.id === cabinIdNum);

    // CabinPrice
    const cabinPrice =
      (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput;

    // ExtraPrice
    const extraPrice =
      numNightsInput * settings.breakfastPrice * Number(numGuestInput);

    // Total Price
    const totalPrice = cabinPrice + extraPrice;

    const finalData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights: numNightsInput,
      numGuests: Number(data.numGuests),
      cabinId: Number(data.cabinId),
      guestId: Number(data.guestId),
      observations: data.observations,
      hasBreakfast,
      isPaid,
      cabinPrice,
      extraPrice,
      totalPrice,
      status: "unconfirmed",
    };

    createBooking(finalData, {
      onSuccess: () => {
        handleReset();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <div>
        <ButtonText className="button-back" onClick={moveBack}>
          &larr; Back
        </ButtonText>
      </div>
      <Row type="form">
        <Heading as="h1">
          <span>
            <HiOutlineSquare3Stack3D />
          </span>
          {cabinIdInput ? `Book Cabin ${cabinInput?.name}` : "Book Cabin"}
          <span>
            <Popover
              isOpen={isPopoverOpen}
              positions={
                width >= windowSizes.tablet
                  ? ["right", "bottom"]
                  : ["bottom", "right"]
              }
              padding={10}
              reposition={false}
              onClickOutside={closePopover}
              parentElement={boxContainerPopoverRef.current}
              content={({ position, childRect, popoverRect }) => (
                <ArrowContainer
                  position={position}
                  childRect={childRect}
                  popoverRect={popoverRect}
                  arrowColor={"var(--color-grey-400)"}
                  arrowSize={8}
                >
                  <PopoverContent>
                    &#10095; First, check if the cabin is available for the
                    selected dates. If it's available, fill out the rest form to
                    complete your booking.
                  </PopoverContent>
                </ArrowContainer>
              )}
            >
              <ButtonText
                type="form"
                onClick={openPopover}
                onMouseEnter={openPopover}
                onMouseLeave={closePopover}
              >
                <HiOutlineQuestionMarkCircle />
              </ButtonText>
            </Popover>
          </span>
        </Heading>
      </Row>

      {isAvailable === false && (
        <FormRowVertical>
          <Message color={color}>
            <span>{React.createElement(Icon)}</span>
            {messageAvailable}
          </Message>
          {!!(cabinIdInput || startDateInput || endDateInput) && (
            <span  style={{ placeSelf: "center" }}>
              <Button

                type="reset"
                variation="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </span>
          )}
        </FormRowVertical>
      )}

      <Form type="regular" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Cabin" error={errors?.cabinId?.message}>
          <Controller
            name="cabinId"
            control={control}
            rules={{ required: "Cabin is required" }}
            render={({ field: { ref, value, onChange } }) => (
              <Select
                ref={ref}
                options={cabinOptions}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={isCreating}
              />
            )}
          />
        </FormRow>

        <FormRow label="Check in" error={errors?.startDate?.message}>
          <Input
            disabled={isCreating}
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "Check in date is required",
              validate: {
                isValidDate: (value) =>
                  isValid(parseISO(value)) || "Invalid date",

                isFutureDate: (value) =>
                  !isBefore(parseISO(value), startOfToday()) ||
                  "Check in cannot be before today",
              },
            })}
          />
        </FormRow>

        <FormRow label="Check out" error={errors?.endDate?.message}>
          <Input
            disabled={isCreating}
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "Check out date is required",
              validate: {
                isValidDate: (value) =>
                  isValid(parseISO(value)) || "Invalid date",

                isAfterStartDate: (value) => {
                  return (
                    !isBefore(
                      parseISO(value),
                      parseISO(getValues("startDate"))
                    ) || "Check out cannot be before check in"
                  );
                },

                isSameDate: (value) => {
                  return (
                    parseISO(value).getTime() !==
                      parseISO(getValues("startDate")).getTime() ||
                    "Check out cannot be the same date as check in"
                  );
                },
                isMinBookingLength: (value) => {
                  return subtractDates(value, getValues("startDate")) >=
                    settings?.minBookingLength
                    ? true
                    : `Minimum number of nights per booking is ${settings?.minBookingLength}`;
                },

                ismaxBookingLength: (value) => {
                  return subtractDates(value, getValues("startDate")) <=
                    settings?.maxBookingLength
                    ? true
                    : `Maximum number of nights per booking is ${settings?.maxBookingLength}`;
                },
              },
            })}
          />
        </FormRow>

        {isAvailable === true && (
          <>
            <FormRow label="Number of Nights">
              <Input disabled value={numNightsInput} />
            </FormRow>

            <FormRow label="Guest Name" error={errors?.guestId?.message}>
              <Controller
                name="guestId"
                control={control}
                rules={{ required: "The booking must have a guest" }}
                render={({ field: { ref, value, onChange } }) => (
                  <Select
                    ref={ref}
                    options={guestOptions}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isCreating}
                  />
                )}
              />
            </FormRow>

            <FormRow
              label="Number of Guests"
              error={errors?.numGuests?.message}
            >
              <Controller
                name="numGuests"
                control={control}
                rules={{
                  required: "Number of guests is required",
                  min: {
                    value: 1,
                    message: "Minimum number of guests must be 1",
                  },
                  max: {
                    value: cabinInput?.maxCapacity,
                    message: `Maximum number of guests must be ${cabinInput?.maxCapacity}`,
                  },
                }}
                render={({ field: { ref, value, onChange } }) => (
                  <Select
                    ref={ref}
                    options={numGuestOptions}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isCreating}
                  />
                )}
              />
            </FormRow>

            <FormRow label="Price">
              <Input disabled value={formatCurrency(cabinPriceInput)} />
            </FormRow>

            <FormRow label="Discount">
              <Input disabled value={formatCurrency(discountInput)} />
            </FormRow>

            <FormRow label="Observations">
              <Textarea
                disabled={isCreating}
                id="observations"
                {...register("observations")}
              />
            </FormRow>

            <FormRow label="Extra Price">
              <Input disabled value={formatCurrency(extraPriceInput)} />
            </FormRow>

            <FormRow label="Total Price">
              <Input disabled value={formatCurrency(totalPriceInput)} />
            </FormRow>

            <FormRow>
              <Controller
                control={control}
                name="hasBreakfast"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="hasBreakfast"
                    disabled={isCreating}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  >
                    Includes breakfast?
                  </Checkbox>
                )}
              />

              <Controller
                control={control}
                name="isPaid"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="isPaid"
                    disabled={isCreating}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  >
                    Was paid?
                  </Checkbox>
                )}
              />
            </FormRow>

            <FormRow>
              <Button variation="secondary" type="reset" onClick={handleReset}>
                Cancel
              </Button>
              <Button disabled={isCreating} type="submit" variation="primary">
                Create Booking
              </Button>
            </FormRow>
          </>
        )}
      </Form>
    </>
  );
}

export default CreateBookingForm;
