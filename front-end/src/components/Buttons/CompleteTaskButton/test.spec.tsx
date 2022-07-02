import { render, screen } from "@testing-library/react";

import { CompleteTaskButton } from ".";

describe("Test Component: CompleteTaskButton", () => {
  it("01. should be a button", () => {
    render(<CompleteTaskButton />);

    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });

  it("02. should have a icon", () => {
    render(<CompleteTaskButton />);

    const icon = screen.getByTestId("complete-task-icon");
    expect(icon).toBeDefined();
  });
});
