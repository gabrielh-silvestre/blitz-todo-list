import { HiCheck } from "react-icons/hi";

import type { CompleteTaskButtonProps } from "./propTypes";

export function CompleteTaskButton({
  completed = false,
}: CompleteTaskButtonProps) {
  return (
    <button hidden={completed}>
      <HiCheck data-testid="complete-task-icon" />
    </button>
  );
}
