import { Controller, useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import toast from "react-hot-toast";
import FormRowVertical from "../../ui/FormRowVertical";
import ButtonGroup from "../../ui/ButtonGroup";
import Heading from "../../ui/Heading";

import { useCountries } from "../../hooks/useCountries";
import { useUpdateGuest } from "./useUpdateGuest";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";

import { HiOutlinePencilSquare } from "react-icons/hi2";

function EditGuestForm({ onCloseModal, guestToEdit = {} }) {
  // remove bookings from the object
  const { id, bookings, ...editValues } = guestToEdit;
  const { fullName } = editValues;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: editValues });

  const { updateGuest, isUpdating } = useUpdateGuest();

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

  const guestValidation = {
    fullName: { required: "This field is required" },

    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email address",
      },
    },

    nationalID: { required: "National ID is required" },

    nationality: { required: "National ID is required" },
  };

  function onSubmit(data) {
    const countryFlag = countries.find(
      (country) => country.label === data.nationality
    )?.flagUrl;

    const finalData = {
      ...data,
      countryFlag,
    };

    updateGuest(
      { id, editGuestData: finalData },
      {
        onSuccess: () => {
          toast.success(`Guest ${finalData.fullName} was updated`);
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <Row type="form">
        <Heading as="h2">
          <span>
            <HiOutlinePencilSquare />
          </span>
          {`Edit Guest # ${id} - ${fullName}`}
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
              disabled={isUpdating}
              type="text"
              id="fullName"
              {...register("fullName", guestValidation.fullName)}
            />
          </FormRow>

          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              disabled={isUpdating}
              type="text"
              id="email"
              {...register("email", guestValidation.email)}
            />
          </FormRow>

          <FormRow label="National ID" error={errors?.nationalID?.message}>
            <Input
              disabled={isUpdating}
              type="text"
              id="nationalID"
              {...register("nationalID", guestValidation.nationalID)}
            />
          </FormRow>

          <FormRow label="Nationality" error={errors?.nationality?.message}>
            <Controller
              name="nationality"
              control={control}
              rules={guestValidation.nationality}
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
      ) : (
        // MOBILE
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRowVertical label="Full Name" error={errors?.fullName?.message}>
            <Input
              disabled={isUpdating}
              type="text"
              id="fullName"
              {...register("fullName", guestValidation.fullName)}
            />
          </FormRowVertical>

          <FormRowVertical label="Email" error={errors?.email?.message}>
            <Input
              disabled={isUpdating}
              type="text"
              id="email"
              {...register("email", guestValidation.email)}
            />
          </FormRowVertical>

          <FormRowVertical
            label="national ID"
            error={errors?.nationalID?.message}
          >
            <Input
              disabled={isUpdating}
              type="text"
              id="nationalID"
              {...register("nationalID", guestValidation.nationalID)}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Nationality"
            error={errors?.nationality?.message}
          >
            <Controller
              name="nationality"
              control={control}
              rules={guestValidation.nationality}
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
          </FormRowVertical>

          <FormRowVertical>
            <ButtonGroup>
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
            </ButtonGroup>
          </FormRowVertical>
        </Form>
      )}
    </>
  );
}

export default EditGuestForm;
