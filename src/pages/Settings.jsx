import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { ArrowContainer, Popover } from "react-tiny-popover";

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PopoverContent from "../ui/PopoverContent";
import ButtonText from "../ui/ButtonText";


import { useWindowSize } from "../hooks/useWindowSize";
import { usePopover } from "../hooks/usePopover";
import { windowSizes } from "../utils/constants";

function Settings() {
  const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } =
    usePopover();

  const { width } = useWindowSize();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <span>
            <HiOutlineAdjustmentsHorizontal />
          </span>
          Update Hotel Settings
          <div>
            <Popover
              isOpen={isPopoverOpen}
              positions={width >= windowSizes.tablet ? ["right"] : ["bottom"]}
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
                    &#10095; Change the values and it will be updated
                    automatically
                  </PopoverContent>
                </ArrowContainer>
              )}
            >
              <ButtonText
                type="form"
                onClick={openPopover}
                onMouseEnter={openPopover}
                onMouseLeave={closePopover}
              >
                <HiOutlineQuestionMarkCircle />
              </ButtonText>
            </Popover>
          </div>
        </Heading>
      </Row>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
