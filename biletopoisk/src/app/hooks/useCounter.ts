import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface UseCounterOutput {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}
// Этот Хук больше не используется, так как есть редакс, но жалко было удалять
export function useCounter(
  initial = 0,
  max = Number.MAX_SAFE_INTEGER,
  min = 0
): UseCounterOutput {
  const [count, setCount] = useState(initial);

  const increment = useCallback(
    () => setCount((x) => Math.min(x + 1, max)),
    [max]
  );
  const decrement = useCallback(
    () => setCount((x) => Math.max(x - 1, min)),
    [min]
  );
  const reset = useCallback(() => setCount(initial), [initial]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
}
