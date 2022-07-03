import { render, screen } from "@testing-library/react";

import { DeleteTaskButton } from ".";

describe("Test Component: DeleteTaskButton", () => {
  it("01. should be a button", () => {
    render(<DeleteTaskButton id="1" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("02. should have a icon", () => {
    render(<DeleteTaskButton id="1" />);

    const icon = screen.getByTestId("delete-task-icon");
    expect(icon).toBeInTheDocument();
  });
});
