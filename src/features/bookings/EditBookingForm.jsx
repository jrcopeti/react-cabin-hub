import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";

import { useSettings } from "../settings/useSettings";
import { useAllCabins } from "../cabins/useAllCabins";
import { useAllGuests } from "../guests/useAllGuests";
import { useUpdateBooking } from "./useUpdateBooking";
import { useGetBookingsByCabin } from "./useGetBookingsByCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
import ButtonGroup from "../../ui/ButtonGroup";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import FormRowVertical from "../../ui/FormRowVertical";

import { formatCurrency, subtractDates } from "../../utils/helpers";

import {
  eachDayOfInterval,
  format,
  isBefore,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns";
import toast from "react-hot-toast";

import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useWindowSize } from "../../hooks/useWindowSize";

import { windowSizes } from "../../utils/constants";
import { DayPicker } from "react-day-picker";
import { useDatePicker } from "../../hooks/useDatePicker";

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

  & p {
    margin: 0.8rem 0rem;
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
`;

function EditBookingForm({ onCloseModal, bookingToEdit = {} }) {
  const { id, ...editValues } = bookingToEdit;
  const { created_at } = editValues;

  const { isUpdating, updateBooking } = useUpdateBooking();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { cabins, isLoading: isLoadingCabins } = useAllCabins();

  const { guests, isLoading: isLoadingGuests } = useAllGuests();

  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: editValues });

  const cabinIdInput = watch("cabinId");
  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");

  const { range, setRange, footer, handleDayClick } = useDatePicker();

  const { bookings: bookedDates, isLoading: isLoadingBookedDates } =
    useGetBookingsByCabin(Number(cabinIdInput));

  const numNightsInput =
    startDateInput && endDateInput && endDateInput > startDateInput
      ? subtractDates(endDateInput, startDateInput)
      : 0;

  if (
    isLoadingSettings ||
    isLoadingCabins ||
    isLoadingGuests ||
    isLoadingBookedDates
  )
    return <Spinner />;

  const cabinOptions = [
    { value: "", label: "Select a Cabin" },
    ...cabins
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cabin) => ({
        value: cabin.id,
        label: `${cabin.name} - max. ${cabin.maxCapacity} guests`,
      })),
  ];

  const guestOptions = [
    { value: "", label: "Select a Guest" },
    ...guests
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
      .map((guest) => ({
        value: guest.id,
        label: guest.fullName,
      })),
  ];

  const numGuestInput = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");

  const cabinInput = cabins.find(
    (cabinInput) => cabinInput.id === Number(cabinIdInput)
  );
  const cabinPriceInput = cabinInput
    ? cabinInput.regularPrice * numNightsInput
    : 0;

  const numGuestOptions = [
    { value: "", label: "Select a number" },
    ...Array.from({ length: cabinInput?.maxCapacity }, (_, i) => ({
      value: i + 1,
      label: `${i + 1} guest${i > 0 ? "s" : ""}`,
    })),
  ];

  const extraPriceInput = hasBreakfast
    ? numNightsInput * settings.breakfastPrice * Number(numGuestInput)
    : 0;

  const discountInput = cabinInput ? cabinInput.discount : 0;

  const totalPriceInput = cabinPriceInput + extraPriceInput - discountInput;

  const allBookedDates = bookedDates?.flatMap(({ startDate, endDate }) => {
    console.log("StartDate:", startDate, "EndDate:", endDate);
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    return eachDayOfInterval({ start, end });
  });

  const bookedStyle = { border: "2px solid currentColor" };

  function onSubmit(data) {
    // selected Cabin
    const cabinIdNum = Number(data.cabinId);
    const reservedCabin = cabins.find((cabin) => cabin.id === cabinIdNum);

    // CabinPrice
    const cabinPrice = reservedCabin
      ? (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput
      : 0;

    // ExtraPrice
    const extraPrice = hasBreakfast
      ? numNightsInput * settings.breakfastPrice * Number(data.numGuests)
      : 0;

    // Total Price
    const totalPrice = cabinPrice + extraPrice;

    const finalData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights: numNightsInput,
      numGuests: Number(data.numGuests),
      cabinId: Number(data.cabinId),
      guestId: Number(data.guestId),
      observations: data.observations,
      hasBreakfast,
      isPaid,
      cabinPrice,
      extraPrice,
      totalPrice,
      status: "unconfirmed",
    };

    console.log("bookingId:", id, "Data:", finalData);

    updateBooking(
      { id, editBookingData: finalData },
      {
        onSuccess: () => {
          onCloseModal?.();
          toast.success(`Booking # ${id} was successfully updated`);
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
          <span>
            <HiOutlinePencilSquare />
          </span>
          {`Edit Booking # ${id}`}
        </Heading>
        <p>Booked on {format(new Date(created_at), "EEE, dd/MM/yyyy, p")}</p>
      </Row>
      <br />

      {width >= windowSizes.tablet ? (
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRow label="Cabin" error={errors?.cabinId?.message}>
            <Controller
              name="cabinId"
              control={control}
              rules={{ required: "Cabin is required" }}
              render={({ field: { ref, value, onChange } }) => (
                <Select
                  ref={ref}
                  options={cabinOptions}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={isUpdating}
                />
              )}
            />
          </FormRow>

          <FormRowVertical
            label="Check in - Check out dates"
            error={errors?.startDate?.message}
          >
            <Controller
              name="startDate"
              id="startDate"
              rules={{
                required: "Check in date is required",
                validate: {
                  isValidDate: (value) =>
                    isValid(parseISO(value)) || "Invalid date",
                  isFutureDate: (value) =>
                    isBefore(new Date(value), startOfToday())
                      ? "Check in cannot be before today"
                      : true,
                },
              }}
              control={control}
              render={({ field }) => (
                <input type="hidden" {...field} value={field.value || ""} />
              )}
            />
            <Controller
              name="endDate"
              id="endDate"
              rules={{
                required: "Check out date is required",
                validate: {
                  isValidDate: (value) =>
                    isValid(parseISO(value)) || "Invalid date",

                  isAfterStartDate: (value) => {
                    return (
                      !isBefore(
                        parseISO(value),
                        parseISO(getValues("startDate"))
                      ) || "Check out cannot be before check in"
                    );
                  },

                  isSameDate: (value) => {
                    return (
                      parseISO(value).getTime() !==
                        parseISO(getValues("startDate")).getTime() ||
                      "Check out cannot be the same date as check in"
                    );
                  },
                  isMinBookingLength: (value) => {
                    return subtractDates(value, getValues("startDate")) >=
                      settings?.minBookingLength
                      ? true
                      : `Minimum number of nights per booking is ${settings?.minBookingLength}`;
                  },

                  ismaxBookingLength: (value) => {
                    return subtractDates(value, getValues("startDate")) <=
                      settings?.maxBookingLength
                      ? true
                      : `Maximum number of nights per booking is ${settings?.maxBookingLength}`;
                  },
                },
              }}
              control={control}
              render={({ field }) => {
                <input type="hidden" {...field} value={field.value || ""} />;
              }}
            />
            <DayPicker
              mode="range"
              modifiers={{ booked: allBookedDates }}
              modifiersStyles={{ booked: bookedStyle }}
              onDayClick={handleDayClick}
              selected={range}
              onSelect={(range) => {
                setRange(range);
                setValue(
                  "startDate",
                  range?.from ? format(range?.from, "yyyy-MM-dd") : ""
                );
                setValue(
                  "endDate",
                  range?.to ? format(range?.to, "yyyy-MM-dd") : ""
                );
              }}
              footer={footer}
            />
          </FormRowVertical>

          <FormRowVertical error={errors?.endDate?.message}>
            <input hidden name="endDate" id="endDate" />
          </FormRowVertical>

          <FormRow label="Number of Nights">
            <Input disabled value={numNightsInput} />
          </FormRow>

          <FormRow label="Guest Name" error={errors?.guestId?.message}>
            <Controller
              name="guestId"
              control={control}
              rules={{ required: "The booking must have a guest" }}
              render={({ field: { ref, value, onChange } }) => (
                <Select
                  ref={ref}
                  options={guestOptions}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={isUpdating}
                />
              )}
            />
          </FormRow>

          <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
            <Controller
              name="numGuests"
              control={control}
              rules={{
                required: "Number of guests is required",
                min: {
                  value: 1,
                  message: "Minimum number of guests must be 1",
                },
                max: {
                  value: cabinInput?.maxCapacity,
                  message: `Maximum number of guests must be ${cabinInput?.maxCapacity}`,
                },
              }}
              render={({ field: { ref, value, onChange } }) => (
                <Select
                  ref={ref}
                  options={numGuestOptions}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={isUpdating}
                />
              )}
            />
          </FormRow>

          <FormRow label="Price">
            <Input disabled value={formatCurrency(cabinPriceInput)} />
          </FormRow>

          <FormRow label="Discount">
            <Input disabled value={formatCurrency(discountInput)} />
          </FormRow>

          <FormRow label="Observations">
            <Textarea
              disabled={isUpdating}
              id="observations"
              defaultValue=""
              {...register("observations")}
            />
          </FormRow>

          <FormRow label="Extra Price">
            <Input disabled value={formatCurrency(extraPriceInput)} />
          </FormRow>

          <FormRow label="Total Price">
            <Input disabled value={formatCurrency(totalPriceInput)} />
          </FormRow>

          <FormRow>
            <Controller
              control={control}
              name="hasBreakfast"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="hasBreakfast"
                  disabled={isUpdating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Includes breakfast?
                </Checkbox>
              )}
            />

            <Controller
              control={control}
              name="isPaid"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="isPaid"
                  disabled={isUpdating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Was paid?
                </Checkbox>
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
            <Button disabled={isUpdating} type="submit" variation="primary">
              Update Booking
            </Button>
          </FormRow>
        </Form>
      ) : (
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRowVertical label="Cabin" error={errors?.cabinId?.message}>
            <Controller
              name="cabinId"
              control={control}
              rules={{ required: "Cabin is required" }}
              render={({ field: { ref, value, onChange } }) => (
                <Select
                  ref={ref}
                  options={cabinOptions}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={isUpdating}
                />
              )}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Check in - Check out dates"
            error={errors?.startDate?.message}
          >
            <Controller
              name="startDate"
              id="startDate"
              rules={{
                required: "Check in date is required",
                validate: {
                  isValidDate: (value) =>
                    isValid(parseISO(value)) || "Invalid date",
                  isFutureDate: (value) =>
                    isBefore(new Date(value), startOfToday())
                      ? "Check in cannot be before today"
                      : true,
                },
              }}
              control={control}
              render={({ field }) => (
                <input type="hidden" {...field} value={field.value || ""} />
              )}
            />
            <Controller
              name="endDate"
              id="endDate"
              rules={{
                required: "Check out date is required",
                validate: {
                  isValidDate: (value) =>
                    isValid(parseISO(value)) || "Invalid date",

                  isAfterStartDate: (value) => {
                    return (
                      !isBefore(
                        parseISO(value),
                        parseISO(getValues("startDate"))
                      ) || "Check out cannot be before check in"
                    );
                  },

                  isSameDate: (value) => {
                    return (
                      parseISO(value).getTime() !==
                        parseISO(getValues("startDate")).getTime() ||
                      "Check out cannot be the same date as check in"
                    );
                  },
                  isMinBookingLength: (value) => {
                    return subtractDates(value, getValues("startDate")) >=
                      settings?.minBookingLength
                      ? true
                      : `Minimum number of nights per booking is ${settings?.minBookingLength}`;
                  },

                  ismaxBookingLength: (value) => {
                    return subtractDates(value, getValues("startDate")) <=
                      settings?.maxBookingLength
                      ? true
                      : `Maximum number of nights per booking is ${settings?.maxBookingLength}`;
                  },
                },
              }}
              control={control}
              render={({ field }) => {
                {
                  console.log("Field value: ", field.value);
                }
                <input type="hidden" {...field} value={field.value || ""} />;
              }}
            />
            <DayPicker
              mode="range"
              modifiers={{ booked: allBookedDates }}
              modifiersStyles={{ booked: bookedStyle }}
              onDayClick={handleDayClick}
              selected={range}
              onSelect={(range) => {
                setRange(range);
                setValue(
                  "startDate",
                  range?.from ? format(range?.from, "yyyy-MM-dd") : ""
                );
                setValue(
                  "endDate",
                  range?.to ? format(range?.to, "yyyy-MM-dd") : ""
                );
              }}
              footer={footer}
            />
          </FormRowVertical>

          <FormRowVertical error={errors?.endDate?.message}>
            <input hidden name="endDate" id="endDate" />
          </FormRowVertical>

          <FormRowVertical label="Number of Nights">
            <Input disabled value={numNightsInput} />
          </FormRowVertical>

          <FormRowVertical label="Guest Name" error={errors?.guestId?.message}>
            <Controller
              name="guestId"
              control={control}
              rules={{ required: "The booking must have a guest" }}
              render={({ field: { ref, value, onChange } }) => (
                <Select
                  ref={ref}
                  options={guestOptions}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={isUpdating}
                />
              )}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Number of Guests"
            error={errors?.numGuests?.message}
          >
            <Controller
              name="numGuests"
              control={control}
              rules={{
                required: "Number of guests is required",
                min: {
                  value: 1,
                  message: "Minimum number of guests must be 1",
                },
                max: {
                  value: cabinInput?.maxCapacity,
                  message: `Maximum number of guests must be ${cabinInput?.maxCapacity}`,
                },
              }}
              render={({ field: { ref, value, onChange } }) => (
                <Select
                  ref={ref}
                  options={numGuestOptions}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={isUpdating}
                />
              )}
            />
          </FormRowVertical>

          <FormRowVertical label="Price">
            <Input disabled value={formatCurrency(cabinPriceInput)} />
          </FormRowVertical>

          <FormRowVertical label="Discount">
            <Input disabled value={formatCurrency(discountInput)} />
          </FormRowVertical>

          <FormRowVertical label="Observations">
            <Textarea
              disabled={isUpdating}
              id="observations"
              defaultValue=""
              {...register("observations")}
            />
          </FormRowVertical>

          <FormRowVertical label="Extra Price">
            <Input disabled value={formatCurrency(extraPriceInput)} />
          </FormRowVertical>

          <FormRowVertical label="Total Price">
            <Input disabled value={formatCurrency(totalPriceInput)} />
          </FormRowVertical>

          <FormRowVertical>
            <Controller
              control={control}
              name="hasBreakfast"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="hasBreakfast"
                  disabled={isUpdating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Includes breakfast?
                </Checkbox>
              )}
            />

            <Controller
              control={control}
              name="isPaid"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="isPaid"
                  disabled={isUpdating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Was paid?
                </Checkbox>
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
              <Button disabled={isUpdating} type="submit" variation="primary">
                Update Booking
              </Button>
            </ButtonGroup>
          </FormRowVertical>
        </Form>
      )}
    </StyledDiv>
  );
}

export default EditBookingForm;
