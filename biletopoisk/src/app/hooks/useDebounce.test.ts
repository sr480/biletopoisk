import { renderHook, waitFor } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("#useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 1000));
    expect(result.current).toBe("initial");
  });

  it("should delay updating value", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "foo", delay: 500 } }
    );

    expect(result.current).toBe("foo");
    rerender({ value: "bar", delay: 500 });
    expect(result.current).toBe("foo");
    await waitFor(() => expect(result.current).toBe("bar"), { timeout: 501 });
  });

  it("should default delay 500", async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "foo" },
    });

    expect(result.current).toBe("foo");
    rerender({ value: "bar" });
    expect(result.current).toBe("foo");
    await waitFor(() => expect(result.current).toBe("bar"), { timeout: 501 });
  });
});
