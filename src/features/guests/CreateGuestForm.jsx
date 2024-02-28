import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateGuest } from "./useCreateGuest";

import { useCountries } from "../../hooks/useCountries";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

function CreateGuestForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { createGuest, isCreating } = useCreateGuest();

  const { countries, isLoading: isLoadingCountries } = useCountries();

  if (isLoadingCountries) {
    return <Spinner />;
  }

  const countriesOptionsNationality = [
    { value: "", label: "Select a Country" },
    ...countries
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((country, index) => ({
      value: country.label,
      label: country.label,
      flagUrl: country.flagUrl,
      key: `${country.value}-${index}`,
    })),
  ];

  function onSubmit(data) {
    const countryFlag = countries.find(
      (country) => country.label === data.nationality
    )?.flagUrl;

    const finalData = {
      ...data,
      countryFlag,
    };

    console.log(finalData);

    createGuest(finalData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
        queryClient.refetchQueries(["guests"]);
        toast.success(`A new guest ${finalData.fullName} was created`);
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
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="national ID" error={errors?.nationalID?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="nationalID"
          {...register("nationalID", {
            required: "National ID is required",
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Controller
          name="nationality"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field: { ref, value, onChange } }) => (
            <Select
              ref={ref}
              options={countriesOptionsNationality}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={isCreating}
            />
          )}
        />
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
        <Button disabled={isCreating} type="submit">
          Add New Guest
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
