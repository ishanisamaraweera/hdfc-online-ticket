import { useEffect } from "react";

export function useDebouncedResizeObserver(callback, delay = 100) {
  useEffect(() => {
    let resizeObserver;
    let timeoutId;

    const debouncedCallback = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(debouncedCallback);
      resizeObserver.observe(document.body);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
}
