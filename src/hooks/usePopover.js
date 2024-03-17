import { useRef, useState } from "react";

export function usePopover() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const boxContainerPopoverRef = useRef()

  const openPopover = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef };
}
