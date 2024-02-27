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
import Checkbox from "../../ui/Checkbox";

import { useAllGuests } from "../guests/useAllGuests";
import { useState } from "react";
import { useCreateBookings } from "./useCreateBookings";

function CreateCabinForm({ onCloseModal }) {
  const [wantsBreakfast, setWantsBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const { createBooking, isLoading: isCreating } = useCreateBookings();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useCabins();

  const { guests, isLoading: isLoadingGuests } = useAllGuests();

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
    startDateInput && endDateInput && endDateInput > startDateInput
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
    // CabinPrice
    const reservedCabin = cabins
      .filter((cabin) => cabin.id === +data.cabinId)
      .at(0);
    const cabinPrice =
      (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput;

    // ExtraPrice
    const extraPrice = wantsBreakfast
      ? numNightsInput * settings.breakfastPrice * +data.numGuests
      : 0;

    // Total Price
    const totalPrice = cabinPrice + extraPrice;

    const finalData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights: numNightsInput,
      numGuests: +data.numGuests,
      cabinId: +data.cabinId,
      guestId: +data.guestId,
      observations: data.observations,
      hasBreakfast: wantsBreakfast,
      isPaid,
      cabinPrice,
      extraPrice,
      totalPrice,
      status: "unconfirmed",
    };
    console.log(finalData);

    createBooking(finalData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
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
              disabled={isCreating}
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

      <FormRow>
        <Checkbox
          disabled={isCreating}
          id="breakfast"
          onChange={() => setWantsBreakfast((e) => !e)}
        >
          Includes breakfast?
        </Checkbox>

        <Checkbox
          disabled={isCreating}
          id="paid"
          onChange={() => setIsPaid((e) => !e)}
        >
          Was paid?
        </Checkbox>
      </FormRow>

      <FormRow>
        <Button
          disabled={isCreating}
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating} type="submit" variation="primary">
          Submit
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
