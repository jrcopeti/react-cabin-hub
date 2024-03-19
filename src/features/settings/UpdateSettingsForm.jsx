import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";


function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, settingField) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [settingField]: value });
  }

  return (
    <Form type="regular">
      <FormRowVertical label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          min={1}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          min={1}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          min={1}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          min={1}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical>
      </FormRowVertical>
    </Form>
  );
}

export default UpdateSettingsForm;
