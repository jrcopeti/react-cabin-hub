import { useForm } from "react-hook-form";
import { useSettings } from "../settings/useSettings";

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

function CreateCabinForm({ onCloseModal }) {
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");
  const numNightsInput =
    startDateInput && endDateInput
      ? differenceInDays(parseISO(endDateInput), parseISO(startDateInput))
      : 0;

  if (isLoadingSettings) return <Spinner />;

  function onSubmit(data) {
    const finalData = {
      ...data,
      numNights: numNightsInput,
      numGuests: +data.numGuests,
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

      <FormRow>
        <Button>Create Booking</Button>
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
    </Form>
  );
  //   <Form
  //     onSubmit={handleSubmit(onSubmit, onError)}
  //     type={onCloseModal ? "modal" : "regular"}
  //   >
  //     <FormRow label="Cabin Name" error={errors?.name?.message}>
  //       <Input
  //         type="text"
  //         id="name"
  //         disabled={isWorking}
  //         {...register("name", { required: "This field is required" })}
  //       />
  //     </FormRow>

  //     <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
  //       <Input
  //         type="number"
  //         id="maxCapacity"
  //         disabled={isWorking}
  //         {...register("maxCapacity", {
  //           required: "This field is required",
  //           min: {
  //             value: 1,
  //             message: "Minimum capacity is 1",
  //           },
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
  //       <Input
  //         type="number"
  //         id="regularPrice"
  //         disabled={isWorking}
  //         {...register("regularPrice", {
  //           required: "This field is required",
  //           min: {
  //             value: 1,
  //             message: "Minimum price should be at least 1",
  //           },
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow label="Discount" error={errors?.discount?.message}>
  //       <Input
  //         type="number"
  //         id="discount"
  //         defaultValue={0}
  //         disabled={isWorking}
  //         {...register("discount", {
  //           required: "This field is required",
  //           validate: (value) =>
  //             +value <= +getValues().regularPrice ||
  //             "Discount should be less than regularrreee price",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow
  //       label="Description for website"
  //       error={errors?.description?.message}
  //     >
  //       <Textarea
  //         type="number"
  //         id="description"
  //         disabled={isWorking}
  //         defaultValue=""
  //         {...register("description", { required: "This field is required" })}
  //       />
  //     </FormRow>

  //     <FormRow label="Cabin photo">
  //       <FileInput
  //         id="image"
  //         accept="image/*"
  //         disabled={isWorking}
  //         {...register("image", {
  //           required: isEditSession ? false : "This field is required",
  //         })}
  //       />
  //     </FormRow>

  //     <FormRow>
  //       {/* type is an HTML attribute! */}
  //       <Button
  //         variation="secondary"
  //         type="reset"
  //         onClick={() => onCloseModal?.()}
  //       >
  //         Cancel
  //       </Button>
  //       <Button disabled={isWorking}>
  //         {isEditSession ? "Edit cabin" : "Create New Cabin"}
  //       </Button>
  //     </FormRow>
  //   </Form>
  // );
}

export default CreateCabinForm;
