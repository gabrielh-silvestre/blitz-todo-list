import { render, screen } from "@testing-library/react";

import type { NewTaskProps } from "./propTypes";

import { NewTaskButton } from ".";

const NEW_TASK_MOCK: NewTaskProps = {
  title: "Task 1",
  description: "Task 1 description",
  mainTaskId: "1",
};

describe("Test Component: NewTaskButton", () => {
  it("01. should be a button", () => {
    render(<NewTaskButton {...NEW_TASK_MOCK} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("02. should have a icon", () => {
    render(<NewTaskButton {...NEW_TASK_MOCK} />);

    const icon = screen.getByTestId("add-task-icon");
    expect(icon).toBeInTheDocument();
  });
});
