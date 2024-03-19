import TableOperations from "../../ui/TableOperations";

import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import { getToday } from "../../utils/helpers";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { ArrowContainer, Popover } from "react-tiny-popover";
import PopoverContent from "../../ui/PopoverContent";
import { usePopover } from "../../hooks/usePopover";
import ButtonText from "../../ui/ButtonText";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";

function GuestTableOperations() {
  const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } =
    usePopover();
  const { width } = useWindowSize();

  return (
    <TableOperations>
      <Filter
        filterField="bookings.startDate"
        options={[
          { value: "all", label: "All" },
          { value: `${getToday()}`, label: "Has a booking starting today" },
          {
            value: `${getToday()}`,
            method: "gt",
            label: "Has upcoming bookings",
          },
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
          {width >= windowSizes.tablet ? (
            <ButtonText
              type="form"
              onMouseEnter={openPopover}
              onMouseLeave={closePopover}
              whileHover={{ scale: [1, 1.1, 1.2] }}
              whileTap={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineMagnifyingGlass />
            </ButtonText>
          ) : (
            <ButtonText
              type="form"
              onClick={openPopover}
              whileHover={{ scale: [1, 1.1, 1.2] }}
              whileTap={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineMagnifyingGlass />
            </ButtonText>
          )}
        </Popover>
        <SortBy
          options={[
            { value: "fullName-asc", label: "Name (A-Z)" },
            { value: "fullName-desc", label: "Name (Z-A)" },
            { value: "id-asc", label: "ID # (asc)" },
            { value: "id-desc", label: "ID # (desc)" },
          ]}
        />
      </div>
    </TableOperations>
  );
}

export default GuestTableOperations;
