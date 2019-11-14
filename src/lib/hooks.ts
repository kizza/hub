import { useLayoutEffect, useRef, useState } from "react";

export const useWindowResize = (callback: () => void, debounce = 800) => {
  const delay = useRef<NodeJS.Timeout>();

  const [windowSize, setWindowSize] = useState({
    width: -1,
    height: -1
  });

  const { width, height } = windowSize;

  useLayoutEffect(() => {
    const debounced = () => {
      const windowSizeHasChanged =
        width !== window.innerWidth || height !== window.innerHeight;

      if (windowSizeHasChanged) {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        if (delay.current) clearTimeout(delay.current);

        delay.current = setTimeout(callback, debounce);
      }
    };

    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [width, height, callback, debounce]);
};
