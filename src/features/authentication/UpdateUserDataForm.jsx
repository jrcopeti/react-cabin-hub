import { useState } from "react";

import toast from "react-hot-toast";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { useWindowSize } from "../../hooks/useWindowSize";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import ButtonGroup from "../../ui/ButtonGroup";
import FormRow from "../../ui/FormRow";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
      isLoading,
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { width } = useWindowSize();

  if (isLoading) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) {
      toast.error("Full Name is required");
      return;
    }

    if (fullName === currentFullName && !avatar) {
      toast.error("No changes were made in your account");
      console.log(fullName, currentFullName, avatar);
      return;
    }

    updateUser(
      {
        fullName,
        avatar,
      },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
          toast.success("User account was successfully updated");
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return width >= 768 ? (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <ButtonGroup>
          <Button
            type="reset"
            variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  ) : (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input value={email} disabled />
      </FormRowVertical>
      <FormRowVertical label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical>
        <ButtonGroup>
          <Button
            type="reset"
            variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </ButtonGroup>
      </FormRowVertical>
    </Form>
  );
}

export default UpdateUserDataForm;
