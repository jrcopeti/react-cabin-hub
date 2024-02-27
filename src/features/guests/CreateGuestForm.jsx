import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useCountries } from "../../hooks/useCountries";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import { Flag } from "../../ui/Flag";

function CreateGuestForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const { countries, isLoading: isLoadingCountries } = useCountries();

  if (isLoadingCountries) {
    return <Spinner />;
  }

  const countriesOptionsNationality = [
    { value: "", label: "Select a Country" },
    ...countries.map((country) => ({
      value: country.label,
      label: `${country.label} (${country.value.toUpperCase()})`,
      flagUrl: country.flagUrl,
    })),
  ];

  function onSubmit(data) {
    const countryFlag = countries.find(
      (country) => country.label === data.nationality
    )?.flagUrl;

    const finaldata = {
      ...data,
      countryFlag,
    };

    console.log(finaldata);
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
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
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
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>Add New Guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
