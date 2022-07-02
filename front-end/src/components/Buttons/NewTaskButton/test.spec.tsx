import { render, screen } from "@testing-library/react";

import { NewTaskButton } from ".";

describe("Test Component: NewTaskButton", () => {
  it("01. should be a button", () => {
    render(<NewTaskButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("02. should have a icon", () => {
    render(<NewTaskButton />);

    const icon = screen.getByTestId("add-task-icon");
    expect(icon).toBeInTheDocument();
  });
});
