import { useState } from "react";
import toast from "react-hot-toast";

import { useResetPassword } from "./useResetPassword";
import { useMoveBack } from "../../hooks/useMoveBack";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import Button from "../../ui/Button";

function ResetPasswordForm() {
  const { resetPassword, isLoading } = useResetPassword();

  const moveBack = useMoveBack();

  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    resetPassword(email);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Reset password"}
        </Button>
        <Button type="button" variation="secondary" onClick={moveBack}>
          Cancel
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPasswordForm;
