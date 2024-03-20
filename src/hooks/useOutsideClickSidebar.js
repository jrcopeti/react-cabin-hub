import { useRef } from "react";
import { useEffect } from "react";

export function useOutsideClickSidebar(handler, ...refs) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (
          refs.every((ref) => ref.current && !ref.current.contains(e.target))
        ) {
          handler();
        }
      }
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    },
    [handler, refs]
  );

  return ref;
}
