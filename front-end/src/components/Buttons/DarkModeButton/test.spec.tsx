import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DarkModeButton } from ".";

describe("Test Component: DarkModeButton", () => {
  it("01. should be a button", () => {
    render(<DarkModeButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("02. should have with light mode icon", () => {
    render(<DarkModeButton />);

    const icon = screen.getByTestId("light-mode-icon");
    expect(icon).toBeInTheDocument();
  });

  it("03. should have with dark mode icon", () => {
    render(<DarkModeButton />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const icon = screen.getByTestId("dark-mode-icon");
    expect(icon).toBeInTheDocument();
  });

  it("04. should toggle with light mode and dark mode", () => {
    render(<DarkModeButton />);

    const button = screen.getByRole("button");

    const lightIcon = screen.getByTestId("light-mode-icon");
    expect(lightIcon).toBeVisible();

    userEvent.click(button);

    const darkIcon = screen.getByTestId("dark-mode-icon");
    expect(darkIcon).toBeVisible();
  });
});
