import { cartReducer, cartActions, CartState } from ".";

describe("cart reducer", () => {
  describe("increment", () => {
    it("should increment", () => {
      const prevState: CartState = { "123": 2, "456": 1 };
      const nextState = cartReducer(prevState, cartActions.increment("123"));
      expect(nextState).toEqual({ ...prevState, "123": 3 });
    });

    it("should not exceeding maxFilms", () => {
      const prevState: CartState = { "123": 1, "456": 29 };
      const nextState = cartReducer(prevState, cartActions.increment("123"));
      expect(nextState).toEqual(prevState);
    });

    it("should increment even if not exists", () => {
      const prevState: CartState = { "456": 1 };
      const nextState = cartReducer(prevState, cartActions.increment("123"));
      expect(nextState).toEqual({ ...prevState, "123": 1 });
    });
  });
  describe("decrement", () => {
    it("should decrement", () => {
      const prevState: CartState = { "123": 2, "456": 1 };
      const nextState = cartReducer(prevState, cartActions.decrement("123"));
      expect(nextState).toEqual({ "123": 1, "456": 1 });
    });

    it("should decrement and delete if zero count", () => {
      const prevState: CartState = { "123": 1, "456": 1 };
      const nextState = cartReducer(prevState, cartActions.decrement("123"));
      expect(nextState).toEqual({ "456": 1 });
    });

    it("should not decrement if zero", () => {
      const payload = "123";
      const prevState: CartState = { "456": 1 };
      const nextState = cartReducer(prevState, cartActions.decrement(payload));
      expect(nextState).toEqual(prevState);
    });
  });
  it("should reset", () => {
    const prevState: CartState = { "123": 1, "456": 1 };
    const nextState = cartReducer(prevState, cartActions.reset("123"));
    expect(nextState).toEqual({ "456": 1 });
  });
});
