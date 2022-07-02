import { render, screen } from "@testing-library/react";

import { DeleteTaskButton } from ".";

describe("Test Component: DeleteTaskButton", () => {
  it("01. should be a button", () => {
    render(<DeleteTaskButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("02. should have a icon", () => {
    render(<DeleteTaskButton />);

    const icon = screen.getByTestId("delete-task-icon");
    expect(icon).toBeInTheDocument();
  });
});
