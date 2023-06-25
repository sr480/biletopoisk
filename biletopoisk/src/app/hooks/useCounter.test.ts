import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("#useCounter", () => {
  it("should get initial value", () => {
    const initialValue = 5;
    const { result } = renderHook(() => useCounter(initialValue));
    expect(result.current.count).toEqual(initialValue);
  });

  it("should increment", () => {
    const maxValue = 5;
    const { result } = renderHook(() => useCounter(0, maxValue));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toEqual(1);
  });

  it("should increment until max", () => {
    const maxValue = 5;
    const { result } = renderHook(() => useCounter(0, maxValue));

    act(() => {
      for (let i = 0; i < maxValue + 1; i++) {
        result.current.increment();
      }
    });

    expect(result.current.count).toEqual(maxValue);
  });

  it("should decrement", () => {
    const { result } = renderHook(() => useCounter(2));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toEqual(1);
  });

  it("should decrement until min", () => {
    const minValue = -3;
    const { result } = renderHook(() => useCounter(0, 5, minValue));

    act(() => {
      for (let i = 0; i > minValue - 1; i--) {
        result.current.decrement();
      }
    });

    expect(result.current.count).toEqual(minValue);
  });

  it("should reset to initial", () => {
    const initialValue = 5;
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toEqual(initialValue);
  });

  it("should set", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.setCount(5);
    });

    expect(result.current.count).toEqual(5);
  });

  it("should have default 0", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toEqual(0);
  });
});
