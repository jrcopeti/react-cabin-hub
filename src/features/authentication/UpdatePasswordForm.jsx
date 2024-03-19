import { useForm } from "react-hook-form";

import { useUpdateUser } from "./useUpdateUser";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useLogout } from "./useLogout";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";
import FormRowVertical from "../../ui/FormRowVertical";
import ButtonGroup from "../../ui/ButtonGroup";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  const { logout, isLoading: isDeleting } = useLogout();

  const { width } = useWindowSize();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => toast.success("Password was successfully updated"),
        onSettled: () => reset(),
      }
    );
  }

  function handleDeleteAccount() {
    logout();
    toast.success("Account was successfully deleted. Hope to see you soon!");
  }

  return width >= windowSizes.tablet ? (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="New Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </FormRow>
        <FormRow>
          <ButtonGroup>
            <Button onClick={reset} type="reset" variation="secondary">
              Cancel
            </Button>
            <Button disabled={isUpdating}>Update password</Button>
          </ButtonGroup>
        </FormRow>
      </Form>
      <FormRow>
        Do you want to delete your account?
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete Account</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="account"
              disabled={isDeleting}
              onConfirm={() => {
                handleDeleteAccount();
              }}
            />
          </Modal.Window>
        </Modal>
      </FormRow>
    </>
  ) : (
    // MOBILE
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical
          label="New Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </FormRowVertical>
        <FormRowVertical>
          <ButtonGroup>
            <Button onClick={reset} type="reset" variation="secondary">
              Cancel
            </Button>
            <Button disabled={isUpdating}>Update password</Button>
          </ButtonGroup>
        </FormRowVertical>
      </Form>
      <FormRow>
        Do you want to delete your account?
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete Account</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="account"
              disabled={isDeleting}
              onConfirm={() => {
                handleDeleteAccount();
              }}
            />
          </Modal.Window>
        </Modal>
      </FormRow>
    </>
  );
}

export default UpdatePasswordForm;
