import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateGuest } from "./useCreateGuest";
import { useCountries } from "../../hooks/useCountries";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import Heading from "../../ui/Heading";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import ButtonGroup from "../../ui/ButtonGroup";
import Row from "../../ui/Row";

import { HiOutlineUserPlus } from "react-icons/hi2";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";

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

  const { width } = useWindowSize();

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
        queryClient.invalidateQueries(["guests"]);
        toast.success(`A new guest was created`);
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <Row type="form">
        <Heading as="h2">
          <span>
            <HiOutlineUserPlus />
          </span>
          Add New Guest
        </Heading>
      </Row>
      <br />

      {width >= windowSizes.tablet ? (
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
              Add Guest
            </Button>
          </FormRow>
        </Form>
      ) : (
        // Mobile
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRowVertical label="Full Name" error={errors?.fullName?.message}>
            <Input
              disabled={isCreating}
              type="text"
              id="fullName"
              {...register("fullName", { required: "This field is required" })}
            />
          </FormRowVertical>

          <FormRowVertical label="Email" error={errors?.email?.message}>
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
          </FormRowVertical>

          <FormRowVertical
            label="national ID"
            error={errors?.nationalID?.message}
          >
            <Input
              disabled={isCreating}
              type="text"
              id="nationalID"
              {...register("nationalID", {
                required: "National ID is required",
              })}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Nationality"
            error={errors?.nationality?.message}
          >
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
          </FormRowVertical>

          <FormRowVertical>
            <ButtonGroup>
              <Button
                disabled={isCreating}
                variation="secondary"
                type="reset"
                onClick={() => onCloseModal?.()}
              >
                Cancel
              </Button>
              <Button disabled={isCreating} type="submit">
                Update Guest
              </Button>
            </ButtonGroup>
          </FormRowVertical>
        </Form>
      )}
    </>
  );
}

export default CreateGuestForm;
