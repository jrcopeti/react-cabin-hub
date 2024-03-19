import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { usePopover } from "../../hooks/usePopover";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";
import PopoverContent from "../../ui/PopoverContent";
import ButtonText from "../../ui/ButtonText";

function BookingTableOperations() {
  const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } =
    usePopover();
  const { width } = useWindowSize();

  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <div>
        <Popover
          isOpen={isPopoverOpen}
          positions={width >= windowSizes.tablet ? ["bottom"] : ["right"]}
          padding={10}
          reposition={false}
          onClickOutside={closePopover}
          parentElement={boxContainerPopoverRef.current}
          content={({ position, childRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              childRect={childRect}
              popoverRect={popoverRect}
              arrowColor={"var(--color-grey-400)"}
              arrowSize={8}
            >
              <PopoverContent>
                &#10095; Filter or sort by categories
              </PopoverContent>
            </ArrowContainer>
          )}
        >
          <ButtonText
            type="form"
            onMouseEnter={openPopover}
            onMouseLeave={closePopover}
            whileHover={{ scale: 1.5 }}
            whileTap={width >= windowSizes.tablet ? { scale: 1 } : { scale: 2 }}
            transition={
              width >= windowSizes.tablet
                ? { duration: 0.3, type: "spring", stiffness: 300 }
                : { duration: 0.3, type: "spring", stiffness: 500 }
            }
          >
            <HiOutlineMagnifyingGlass />
          </ButtonText>
        </Popover>

        <SortBy
          options={[
            { value: "", label: "Select" },
            { value: "startDate-asc", label: "Start Date (earliest)" },
            { value: "startDate-desc", label: "Start Date (latest)" },
            { value: "created_at-asc", label: "Booked on (earliest)" },
            { value: "created_at-desc", label: "Booked on (latest)" },
            { value: "cabinId-asc", label: "Cabin (A-Z)" },
            { value: "cabinId-desc", label: "Cabin (Z-A)" },
            {
              value: "totalPrice-desc",
              label: "Amount (high first)",
            },
            { value: "totalPrice-asc", label: "Amount (low first)" },
            { value: "id-asc", label: "ID # (low first)" },
            { value: "id-desc", label: "ID # (high first)" },
          ]}
        />
      </div>
    </TableOperations>
  );
}

export default BookingTableOperations;
