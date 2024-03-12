import { Controller, useForm } from "react-hook-form";

import { useCreateBookings } from "./useCreateBookings";
import CreateGuestForm from "../guests/CreateGuestForm";
import { useSettings } from "../settings/useSettings";
import { useAllCabins } from "../cabins/useAllCabins";
import { useAllGuests } from "../guests/useAllGuests";
import { useAvailability } from "./useAvailability";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
import Modal from "../../ui/Modal";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency, subtractDates } from "../../utils/helpers";

import { isBefore, isValid, parseISO, startOfToday } from "date-fns";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { screenSizes } from "../../utils/constants";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.3rem;
  white-space: nowrap;

  & p {
    font-size: 1.5rem;
    color: var(--color-grey-500);
    line-height: 1.6;
    letter-spacing: 0.4px;
    font-weight: 400;

    @media (max-width: ${screenSizes.tablet}) {
      font-size: 1rem;
      line-height: 1.4;
    }
  }
`;

function CreateBookingForm() {
  const { createBooking, isLoading: isCreating } = useCreateBookings();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useAllCabins();

  const { guests, isLoading: isLoadingGuests } = useAllGuests();

  const moveBack = useMoveBack();

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
      numGuests: 1,
      cabinPrice: 0,
      extraPrice: 0,
      totalPrice: 0,
      hasBreakfast: false,
      isPaid: false,
    },
  });

  const { availability, checkAvailability, resetAvailability } =
    useAvailability(watch);

  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");

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
        label: `${cabin.name} - max. ${cabin.maxCapacity} guests`,
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

  const cabinPriceWatch = watch("cabinId");
  const numGuestInput = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");

  const cabinInput = cabins.find(
    (cabinInput) => cabinInput.id === Number(cabinPriceWatch)
  );

  const cabinPriceInput = cabinInput
    ? cabinInput.regularPrice * numNightsInput
    : 0;

  const extraPriceInput = hasBreakfast
    ? numNightsInput * settings.breakfastPrice * Number(numGuestInput)
    : 0;

  const discountInput = cabinInput ? cabinInput.discount : 0;

  const totalPriceInput = cabinPriceInput + extraPriceInput - discountInput;

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
        resetAvailability();
        reset();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <StyledDiv>
        <Heading as="h1">Create New Booking</Heading>
        <p>
          First check if the cabin is available for the selected dates.
          <br />
          If the cabin is available, fill in the form to create a new booking.
          <br />
          For new guests, click the button below.
        </p>
        <div>
          <Modal>
            <Modal.Open opens="guest-form">
              <Button type="button">New Guest</Button>
            </Modal.Open>
            <Modal.Window name="guest-form">
              <CreateGuestForm />
            </Modal.Window>
          </Modal>
        </div>
      </StyledDiv>

      <Form type="regular" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Cabin" error={errors?.cabinId?.message}>
          <Controller
            name="cabinId"
            control={control}
            rules={{ required: "This field is required" }}
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

        <FormRow label="Start Date" error={errors?.startDate?.message}>
          <Input
            disabled={isCreating}
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "This field is required",
              validate: {
                isValidDate: (value) =>
                  isValid(parseISO(value)) || "Invalid date",

                isFutureDate: (value) =>
                  !isBefore(parseISO(value), startOfToday()) ||
                  "Start date cannot be before today",
              },
            })}
          />
        </FormRow>

        <FormRow label="End Date" error={errors?.endDate?.message}>
          <Input
            disabled={isCreating}
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "This field is required",
              validate: {
                isValidDate: (value) =>
                  isValid(parseISO(value)) || "Invalid date",

                isAfterStartDate: (value) => {
                  !isBefore(
                    parseISO(value),
                    parseISO(getValues("startDate"))
                  ) || "End date cannot be before start date";
                },

                isSameDate: (value) => {
                  parseISO(value).getTime() !==
                    parseISO(getValues("startDate")).getTime() ||
                    "End date cannot be the same as start date";
                },
              },
            })}
          />
        </FormRow>

        {availability.isAvailable === false && (
          <FormRow>
            <Button type="reset" variation="secondary" onClick={moveBack}>
              Back
            </Button>
            <Button type="button" onClick={checkAvailability}>
              Check Availability
            </Button>
          </FormRow>
        )}

        {availability.isAvailable === true && (
          <>
            <FormRow label="Number of Nights">
              <Input disabled value={numNightsInput} />
            </FormRow>

            <FormRow
              label="Number of Guests"
              error={errors?.numGuests?.message}
            >
              <Controller
                name="numGuests"
                control={control}
                rules={{
                  required: "This field is required",
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
                  <Input
                    type="number"
                    id="numGuests"
                    min={1}
                    ref={ref}
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

            <FormRow label="Guest Name" error={errors?.guestId?.message}>
              <Controller
                name="guestId"
                control={control}
                rules={{ required: "This field is required" }}
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
              <Button
                variation="secondary"
                type="reset"
                onClick={() => resetAvailability()}
              >
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
