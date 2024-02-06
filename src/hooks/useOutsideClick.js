import { useRef } from "react";
import { useEffect } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [handler, listenCapturing]
  );

  return ref;
}
