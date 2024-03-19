import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import PopoverContent from "../../ui/PopoverContent";
import { ArrowContainer, Popover } from "react-tiny-popover";
import ButtonText from "../../ui/ButtonText";
import { usePopover } from "../../hooks/usePopover";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";

function CabinTableOperations() {
  const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } =
    usePopover();

  const { width } = useWindowSize();
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
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
            { value: "", label: "Select" },
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "regularPrice-asc", label: "Price (low first)" },
            { value: "regularPrice-desc", label: "Price (high first)" },
            { value: "maxCapacity-asc", label: "Capacity (low first)" },
            { value: "maxCapacity-desc", label: "Capacity (high first)" },
          ]}
        />
      </div>
    </TableOperations>
  );
}

export default CabinTableOperations;
