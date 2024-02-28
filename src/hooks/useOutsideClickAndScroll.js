import { useRef } from "react";
import { useEffect } from "react";

export function useOutsideClickAndScroll(
  handlerClick,
  listenCapturing = false
) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handlerClick();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("scroll", handlerClick, true);

      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("scroll", handlerClick, true);
      };
    },
    [handlerClick, listenCapturing]
  );

  return ref;
}
