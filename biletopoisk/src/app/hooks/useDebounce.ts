import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, debounce = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), debounce);

    return () => {
      clearTimeout(timer);
    };
  }, [value, debounce]);

  return debouncedValue;
}
