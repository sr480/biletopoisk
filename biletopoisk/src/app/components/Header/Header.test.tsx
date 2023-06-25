import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Header } from './Header'

jest.mock("../Cart/Cart", () => {
  return {
    Cart: () => {
      return <div>Cart</div>;
    },
  };
});
describe('#Header', () => {
  it("should render site title", () => {
    const { container } = render(
      <Header></Header>
    );

    const header = container.querySelector('h1');
    expect(header).toBeInTheDocument();
    expect(header?.innerHTML).toBe('Билетопоиск');
  });

  it("should render cart", () => {
    const { container } = render(
      <Header></Header>
    );
    const cartLink = container.querySelector(`a[href='cart']`);
    expect(cartLink).toBeInTheDocument();
    expect(cartLink?.textContent).toBe('Cart');
  });
});