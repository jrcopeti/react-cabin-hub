import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";

import { useSettings } from "../settings/useSettings";
import { useAllCabins } from "../cabins/useAllCabins";
import { useAllGuests } from "../guests/useAllGuests";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";

import { formatCurrency, subtractDates } from "../../utils/helpers";

import { format, isBefore, isValid, parseISO, startOfToday } from "date-fns";

import { useUpdateBooking } from "./useUpdateBooking";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  & p {
    margin: 0.8rem 0rem;
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
`;

function EditBookingForm({ onCloseModal, bookingToEdit = {} }) {
  const { id, ...editValues } = bookingToEdit;
  const { created_at } = editValues;

  const { isUpdating, updateBooking } = useUpdateBooking();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useAllCabins();

  const { guests, isLoading: isLoadingGuests } = useAllGuests();

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: editValues });

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
    const cabinPrice = reservedCabin
      ? (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput
      : 0;

    // ExtraPrice
    const extraPrice = hasBreakfast
      ? numNightsInput * settings.breakfastPrice * Number(data.numGuests)
      : 0;

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

    console.log("bookingId:", id, "Data:", finalData);

    updateBooking(
      { id, editBookingData: finalData },
      {
        onSuccess: () => {
          onCloseModal?.();
          toast.success(`Booking # ${id} was successfully updated`);
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledDiv>
      <>
        <Heading as="h2">{`Edit Booking # ${id}`}</Heading>
        <p>Booked on {format(new Date(created_at), "EEE, dd/MM/yyyy, p")}</p>
        <br />
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
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
                  disabled={isUpdating}
                />
              )}
            />
          </FormRow>

          <FormRow label="Start Date" error={errors?.startDate?.message}>
            <Input
              disabled={isUpdating}
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
              disabled={isUpdating}
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

          <FormRow label="Number of Nights">
            <Input disabled value={numNightsInput} />
          </FormRow>

          <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
            <Input
              disabled={isUpdating}
              type="number"
              id="numGuests"
              min={1}
              {...register("numGuests", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Minimum number of guests must be 1",
                },
                max: {
                  value: settings.maxGuestsPerBooking,
                  message: `Maximum number of guests must be ${settings.maxGuestsPerBooking}`,
                },
              })}
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
                  disabled={isUpdating}
                />
              )}
            />
          </FormRow>

          <FormRow label="Observations">
            <Textarea
              disabled={isUpdating}
              id="observations"
              defaultValue=""
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
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="hasBreakfast"
                  disabled={isUpdating}
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
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="isPaid"
                  disabled={isUpdating}
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
              disabled={isUpdating}
              variation="secondary"
              type="reset"
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button disabled={isUpdating} type="submit" variation="primary">
              Update Booking
            </Button>
          </FormRow>
        </Form>
      </>
    </StyledDiv>
  );
}

export default EditBookingForm;
