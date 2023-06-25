import { renderWithProviders } from "@/app/store/storeMock";
import '@testing-library/jest-dom';
import { Cart } from "./Cart";

describe('#Cart', () => {
  it('should render total', () => {
    const container = renderWithProviders(<Cart></Cart>, {
      preloadedState: {
        cart: {
          '123': 2,
          '456': 3
        }
      }
    });
    expect(container.getByText('5')).toBeInTheDocument();
  });
});