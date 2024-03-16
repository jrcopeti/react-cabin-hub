import { useState } from "react";

export function usePopover() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const openPopover = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return { isPopoverOpen, openPopover, closePopover };
}
