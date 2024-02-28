import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useCountries } from "../../hooks/useCountries";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

import { useUpdateGuest } from "./useUpdateGuest";

function CreateGuestForm({ onCloseModal, guestToEdit = {} }) {
  const { id, ...editValues } = guestToEdit;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: editValues });

  const queryClient = useQueryClient();

  const { updateGuest, isUpdating } = useUpdateGuest();

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

    updateGuest(
      { id, editGuestData: finalData },
      {
        onSuccess: () => {
          onCloseModal?.();
          queryClient.refetchQueries(["guests"]);
          toast.success(`The guest ${finalData.fullName} was updated`);
        },
      }
    );
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
          disabled={isUpdating}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          disabled={isUpdating}
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
          disabled={isUpdating}
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
              disabled={isUpdating}
            />
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
        <Button disabled={isUpdating} type="submit">
          Update Guest
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
