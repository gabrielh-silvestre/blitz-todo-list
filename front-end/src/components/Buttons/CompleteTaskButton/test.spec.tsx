import { render, screen } from "@testing-library/react";

import { CompleteTaskButton } from ".";

describe("Test Component: CompleteTaskButton", () => {
  it("01. should be a button", () => {
    render(<CompleteTaskButton taskId="1" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("02. should have a icon", () => {
    render(<CompleteTaskButton taskId="1" />);

    const icon = screen.getByTestId("complete-task-icon");
    expect(icon).toBeInTheDocument();
  });

  it("03. when completed should not have a icon", () => {
    render(<CompleteTaskButton taskId="1" completed />);

    const icon = screen.queryByTestId("complete-task-icon");
    expect(icon).not.toBeVisible();
  });
});
