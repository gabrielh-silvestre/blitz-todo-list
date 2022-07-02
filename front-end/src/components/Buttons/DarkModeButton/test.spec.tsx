import { render, screen } from "@testing-library/react";

import { DarkModeButton } from ".";

describe("Test Component: DarkModeButton", () => {
  it("01. should be a button", () => {
    render(<DarkModeButton />);

    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });

  it("02. should have a icon", () => {
    render(<DarkModeButton />);

    const icon = screen.getByTestId("light-mode-icon");
    expect(icon).toBeDefined();
  });
});
