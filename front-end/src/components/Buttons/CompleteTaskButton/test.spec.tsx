import { render, screen } from "@testing-library/react";

import { CompleteTaskButton } from ".";

describe("Test Component: CompleteTaskButton", () => {
  it("01. should be a button", () => {
    render(<CompleteTaskButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("02. should have a icon", () => {
    render(<CompleteTaskButton />);

    const icon = screen.getByTestId("complete-task-icon");
    expect(icon).toBeInTheDocument();
  });

  it("03. when completed should not have a icon", () => {
    render(<CompleteTaskButton completed />);

    const icon = screen.queryByTestId("complete-task-icon");
    expect(icon).not.toBeVisible();
  });
});
