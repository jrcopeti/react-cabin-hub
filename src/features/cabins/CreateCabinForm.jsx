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
import {
  HiOutlineChevronDoubleUp,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import Row from "../../ui/Row";
import FormRowVertical from "../../ui/FormRowVertical";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";
import ButtonGroup from "../../ui/ButtonGroup";
import styled from "styled-components";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 85dvh;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

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

  const { width } = useWindowSize();

  const cabinValidation = {
    name: { required: "This field is required" },

    maxCapacity: {
      required: "This field is required",
      min: {
        value: 1,
        message: "Minimum capacity is 1",
      },
    },

    regularPrice: {
      required: "This field is required",
      min: {
        value: 1,
        message: "Minimum price should be at least 1",
      },
    },

    discount: {
      required: "This field is required",
      validate: (value) =>
        +value <= +getValues().regularPrice ||
        "Discount should be less than regular price",
    },

    description: {
      required: "This field is required",
    },

    image: {
      required: isEditSession ? false : "This field is required",
    },
  };

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            toast.success(`Cabin ${data.name} was updated successfully`);
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
            toast.success(`Cabin ${data.name} was created successfully`);
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <StyledDiv>
      <Row type="form">
        <Heading as="h2">
          {isEditSession ? (
            <span>
              <HiOutlinePencilSquare />
              {`Edit Cabin ${editValues.name}`}
            </span>
          ) : (
            <span>
              <HiOutlineChevronDoubleUp />
              Create New Cabin
            </span>
          )}
        </Heading>
      </Row>

      <br />
      {width >= windowSizes.tablet ? (
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRow label="Cabin Name" error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              disabled={isWorking}
              {...register("name", cabinValidation.name)}
            />
          </FormRow>

          <FormRow
            label="Maximum Capacity"
            error={errors?.maxCapacity?.message}
          >
            <Input
              type="number"
              id="maxCapacity"
              disabled={isWorking}
              {...register("maxCapacity", cabinValidation.maxCapacity)}
            />
          </FormRow>

          <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
            <Input
              type="number"
              id="regularPrice"
              disabled={isWorking}
              {...register("regularPrice", cabinValidation.regularPrice)}
            />
          </FormRow>

          <FormRow label="Discount" error={errors?.discount?.message}>
            <Input
              type="number"
              id="discount"
              disabled={isWorking}
              {...register("discount", cabinValidation.discount)}
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
              {...register("description", cabinValidation.description)}
            />
          </FormRow>

          <FormRow label="Cabin photo" error={errors?.image?.message}>
            <FileInput
              id="image"
              accept="image/*"
              disabled={isWorking}
              {...register("image", cabinValidation.image)}
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
            <Button disabled={isWorking}>
              {isEditSession ? "Update cabin" : "Create Cabin"}
            </Button>
          </FormRow>
        </Form>
      ) : (
        // MOBILE

        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRowVertical label="Cabin Name" error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              disabled={isWorking}
              {...register("name", cabinValidation.name)}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Maximum Capacity"
            error={errors?.maxCapacity?.message}
          >
            <Input
              type="number"
              id="maxCapacity"
              disabled={isWorking}
              {...register("maxCapacity", cabinValidation.maxCapacity)}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Regular Price"
            error={errors?.regularPrice?.message}
          >
            <Input
              type="number"
              id="regularPrice"
              disabled={isWorking}
              {...register("regularPrice", cabinValidation.regularPrice)}
            />
          </FormRowVertical>

          <FormRowVertical label="Discount" error={errors?.discount?.message}>
            <Input
              type="number"
              id="discount"
              disabled={isWorking}
              {...register("discount", cabinValidation.discount)}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Description for website"
            error={errors?.description?.message}
          >
            <Textarea
              type="number"
              id="description"
              disabled={isWorking}
              defaultValue=""
              {...register("description", cabinValidation.description)}
            />
          </FormRowVertical>

          <FormRowVertical label="Cabin photo" error={errors?.image?.message}>
            <FileInput
              id="image"
              accept="image/*"
              disabled={isWorking}
              {...register("image", cabinValidation.image)}
            />
          </FormRowVertical>

          <FormRowVertical>
            <ButtonGroup>
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
            </ButtonGroup>
          </FormRowVertical>
        </Form>
      )}
    </StyledDiv>
  );
}

export default CreateCabinForm;
