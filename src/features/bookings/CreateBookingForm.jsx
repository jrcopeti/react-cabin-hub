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
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency, subtractDates } from "../../utils/helpers";

import { isBefore, isValid, parseISO, startOfToday } from "date-fns";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { screenSizes } from "../../utils/constants";
import ButtonText from "../../ui/ButtonText";
import {
  HiNoSymbol,
  HiOutlineMapPin,
  HiOutlineSquaresPlus,
} from "react-icons/hi2";

const HeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;

  & div {
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 1.6rem 2.4rem;
    color: var(--color-grey-600);
    min-width: 36rem;
    white-space: pre-line;
  }

  @media (max-width: ${screenSizes.tablet}) {
    gap: 1rem;
  }
`;

const Message = styled.div`
  background-color: var(--color-grey-50);
  color: var(--color-grey-500);
  padding: 1.6rem 2.4rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
  font-weight: 500;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & span {
    font-size: 2.5rem;
    display: flex;
    align-items: center;
  }
`;

const RedMessage = styled.div`
  background-color: var(--color-grey-0);
  color: var(--color-red-700);
  padding: 1rem 2rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
  font-weight: 500;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  & span {
    font-size: 2.5rem;
    display: flex;
    align-items: center;
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

  const cabinIdInput = watch("cabinId");
  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");

  const { availability, resetAvailability } = useAvailability(
    cabinIdInput,
    startDateInput,
    endDateInput
  );

  const { isAvailable, message: messageAvailable } = availability;

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

  const numGuestInput = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");

  const cabinInput = cabins.find(
    (cabinInput) => cabinInput.id === Number(cabinIdInput)
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
      <HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        <Heading as="h1">
          <span>
            <HiOutlineSquaresPlus />
          </span>
          Create New Booking
        </Heading>
        <div>
          <span>
            First, check if the cabin is available for the selected dates.
            <br />
            If the cabin is available, fill in the form to create a new booking.
          </span>
        </div>
      </HeadingGroup>

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
                  return (
                    !isBefore(
                      parseISO(value),
                      parseISO(getValues("startDate"))
                    ) || "End date cannot be before start date"
                  );
                },

                isSameDate: (value) => {
                  return (
                    parseISO(value).getTime() !==
                      parseISO(getValues("startDate")).getTime() ||
                    "End date cannot be the same as start date"
                  );
                },
              },
            })}
          />
        </FormRow>

        {isAvailable === false && (
          <FormRowVertical>
            {messageAvailable === "Please select a cabin and dates" ? (
              <Message>
                {" "}
                <span>
                  <HiOutlineMapPin />
                </span>
                {messageAvailable}
              </Message>
            ) : (
              <RedMessage>
                {" "}
                <span>
                  <HiNoSymbol />
                </span>
                {messageAvailable}
              </RedMessage>
            )}
          </FormRowVertical>
        )}

        {isAvailable === true && (
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
