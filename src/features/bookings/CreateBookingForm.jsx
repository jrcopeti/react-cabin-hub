import { Controller, useForm } from "react-hook-form";

import { useCreateBookings } from "./useCreateBookings";
import CreateGuestForm from "../guests/CreateGuestForm";
import { useSettings } from "../settings/useSettings";
import { useCabins } from "../cabins/useCabins";
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

function CreateBookingForm() {
  const { createBooking, isLoading: isCreating } = useCreateBookings();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useCabins();

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
  } = useForm();

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
  console.log("Total Price:", totalPriceInput);

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
    console.log(finalData);

    createBooking(finalData, {
      onSuccess: () => {
        resetAvailability();
        reset({
          startDate: "",
          endDate: "",
          numNights: 0,
          numGuests: 1,
          cabinPrice: 0,
          cabinId: "",
          guestId: "",
          observations: "",
          hasBreakfast: false,
          isPaid: false,
          extraPrice: 0,
          totalPrice: 0,
        });
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <div>
        <Heading as="h1">Create New Booking</Heading>
        <p>
          If the guest is not in the list, please add them first.
          <br />
          Bookings will only be created for guests that are already in the
          system.
          <br />
          Check the availability of the cabin before creating a booking.
        </p>
      </div>

      <div>
        <Modal>
          <Modal.Open opens="guest-form">
            <Button>New Guest</Button>
          </Modal.Open>
          <Modal.Window name="guest-form">
            <CreateGuestForm />
          </Modal.Window>
        </Modal>
      </div>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
            <Button variation="secondary" onClick={moveBack}>
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
              <Input
                disabled={isCreating}
                type="number"
                defaultValue={1}
                id="numGuests"
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
                    disabled={isCreating}
                  />
                )}
              />
            </FormRow>

            <FormRow label="Observations">
              <Textarea
                disabled={isCreating}
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
                defaultValue={false}
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
              <Button variation="secondary" onClick={moveBack}>
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
