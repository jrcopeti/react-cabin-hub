import { useEffect, useRef } from "react";
import { useUser } from "../features/authentication/useUser";

export function useAutoFocus() {
  const elementRef = useRef(null);

  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && elementRef.current) {
      elementRef.current.focus();
    }
  }, [isAuthenticated]);

  return elementRef;
}
