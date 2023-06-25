import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Expander } from "./Expander";

describe("Expander component", () => {
  it("should render collapsed content by default", () => {
    const { getByText } = render(
      <Expander title="Title" content="Content" />
    );
    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Content")).toHaveClass('collapsed');
  });

  it("should expand content when button is clicked", () => {
    const { getByRole, getByText } = render(
      <Expander title="Title" content="Content" />
    );
    fireEvent.click(getByRole("button"));
    expect(getByText("Content")).toHaveClass('expanded');
  });
});
