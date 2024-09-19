import { useEffect } from "react";

export function useDebouncedResizeObserver(callback, delay = 100) {
  useEffect(() => {
    let resizeObserver;
    let timeoutId;

    const debouncedCallback = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        try {
          callback(); // Attempt to execute the callback
        } catch (error) {
          console.error("Error in ResizeObserver callback:", error); // Log any error
        }
      }, delay);
    };

    if (window.ResizeObserver) {
      try {
        resizeObserver = new ResizeObserver(debouncedCallback);
        resizeObserver.observe(document.body); // Observe the body element or specific element
      } catch (error) {
        console.error("Error initializing ResizeObserver:", error);
      }
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
}
