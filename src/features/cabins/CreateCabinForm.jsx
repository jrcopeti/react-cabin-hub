import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import Heading from "../../ui/Heading";
import { HiOutlinePencilSquare, HiOutlineSquaresPlus } from "react-icons/hi2";
import Row from "../../ui/Row";

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? editValues
      : { discount: 0, description: "", maxCapacity: 1 },
  });

  const { isCreating, createCabin } = useCreateCabin();

  const { isUpdating, updateCabin } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
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
      {isEditSession ? (
        <Row type="form">
          <Heading as="h2">
            <span>
              <HiOutlinePencilSquare />
            </span>
            Edit Cabin
          </Heading>
        </Row>
      ) : (
        <Row type="form">

        <Heading as="h2">
          <span>
            <HiOutlineSquaresPlus />
          </span>
          Create New Cabin
        </Heading>
        </Row>
      )}
      <br />
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Cabin Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            disabled={isWorking}
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Minimum capacity is 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            disabled={isWorking}
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Minimum price should be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            disabled={isWorking}
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                +value <= +getValues().regularPrice ||
                "Discount should be less than regular price",
            })}
          />
        </FormRow>

        <FormRow
          label="Description for website"
          error={errors?.description?.message}
        >
          <Textarea
            type="number"
            id="description"
            disabled={isWorking}
            defaultValue=""
            {...register("description", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Cabin photo" error={errors?.image?.message}>
          <FileInput
            id="image"
            accept="image/*"
            disabled={isWorking}
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Update cabin" : "Create Cabin"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
