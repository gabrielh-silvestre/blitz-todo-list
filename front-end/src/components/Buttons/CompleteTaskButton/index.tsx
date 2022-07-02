import { HiCheck } from "react-icons/hi";

export function CompleteTaskButton() {
  return (
    <button>
      <HiCheck data-testid="complete-task-icon" />
    </button>
  );
}
