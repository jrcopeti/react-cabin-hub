import { Controller, useForm } from "react-hook-form";
import { useSettings } from "../settings/useSettings";
import { useCabins } from "../cabins/useCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import {
  differenceInDays,
  isBefore,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";

import { useGuests } from "../guests/useGuests";

function CreateCabinForm({ onCloseModal }) {
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useCabins();

  const { guests, isLoading: isLoadingGuests } = useGuests();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");
  const numNightsInput =
    startDateInput && endDateInput
      ? differenceInDays(parseISO(endDateInput), parseISO(startDateInput))
      : 0;

  if (isLoadingSettings || isLoadingCabins || isLoadingGuests)
    return <Spinner />;

  const cabinOptions = [
    { value: "", label: "Select a Cabin" },
    ...cabins
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cabin) => ({
        value: cabin.id,
        label: cabin.name,
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
  function onSubmit(data) {
    const finalData = {
      ...data,
      numNights: numNightsInput,
      numGuests: +data.numGuests,
      cabinId: +data.cabinId,
      guestId: +data.guestId,
    };
    console.log(finalData);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
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
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: {
              isValidDate: (value) =>
                isValid(parseISO(value)) || "Invalid date",

              isAfterStartDate: (value) => {
                const startDate = getValues("startDate");
                return (
                  !isBefore(parseISO(value), parseISO(startDate)) ||
                  "End date cannot be before start date"
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

      <FormRow label="Cabin" error={errors?.cabinId?.message}>
        <Controller
          name="cabinId"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              {...field}
              ref={field.ref}
              options={cabinOptions}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </FormRow>

      <FormRow label="Guest Name" error={errors?.guestId?.message}>
        <Controller
          name="guestId"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              {...field}
              ref={field.ref}
              options={guestOptions}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Button>Create Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
