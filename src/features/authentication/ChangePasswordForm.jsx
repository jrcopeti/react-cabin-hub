import { useForm } from "react-hook-form";
import { useChangePassword } from "./useChangePassword";
import { useNavigate } from "react-router-dom";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import Button from "../../ui/Button";
import FormRowVertical from "../../ui/FormRowVertical";

function ChangePasswordForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();

  const { errors } = formState;

  const { changePassword, isLoading } = useChangePassword();

  const navigate = useNavigate();

  function onSubmit({ password }) {
    changePassword(
      { updatedPassword: password },
      {
        onSettled: () => {
          reset();
          navigate("/login");
        },
      }
    );
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label="New Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Repeat New password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "The passwords do not match",
          })}
          disabled={isLoading}
        />
      </FormRowVertical>
      <br />
      <FormRowVertical>
        <Button>{isLoading ? <SpinnerMini /> : "Change password"}</Button>
        <Button
          type="button"
          variation="secondary"
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ChangePasswordForm;
