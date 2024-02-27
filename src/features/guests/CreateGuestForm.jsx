import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

function CreateGuestForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button>Submit</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
