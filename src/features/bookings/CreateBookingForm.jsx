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
import { useState } from "react";
import { useCountryFlags } from "../../hooks/useCountryFlags";

function CreateCabinForm({ onCloseModal }) {
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useCabins();



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

  if (isLoadingSettings || isLoadingCabins) return <Spinner />;

  const cabinOptions = cabins.map((cabin) => ({
    value: cabin.id,
    label: cabin.name,
  }));


  function onSubmit(data) {
    const finalData = {
      ...data,
      numNights: numNightsInput,
      numGuests: +data.numGuests,
      cabinId: +data.cabinId,
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

      <FormRow label="Select a Cabin" error={errors?.cabinId?.message}>
        <Controller
          name="cabinId"
          control={control}
          rules={{ required: true }}
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

      <FormRow>
        <Button>Create Booking</Button>
      </FormRow>
    </Form>
  );

 
}

export default CreateCabinForm;
