import { useState, useEffect } from "react";

/**
 * useDebounce – prevents excessive API calls on every keystroke.
 * Returns the debounced value after `delay` ms of inactivity.
 */
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t); // cleanup = memory-leak prevention
  }, [value, delay]);
  return debounced;
};

export default useDebounce;
