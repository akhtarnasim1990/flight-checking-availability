import { useState, useCallback } from "react";

const useThrottle = (callback, delay) => {
  const [lastCall, setLastCall] = useState(0);

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();

      if (now - lastCall >= delay) {
        callback(...args);
        setLastCall(now);
      }
    },
    [callback, delay, lastCall]
  );

  return throttledCallback;
};

export default useThrottle;
