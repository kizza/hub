import { useLayoutEffect, useRef } from "react";

export const useWindowResize = (callback: () => void, debounce = 800) => {
  const delay = useRef<NodeJS.Timeout>();

  useLayoutEffect(() => {
    const debounced = () => {
      if (delay.current) clearTimeout(delay.current);
      delay.current = setTimeout(callback, debounce);
    };

    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [callback, debounce]);
};
