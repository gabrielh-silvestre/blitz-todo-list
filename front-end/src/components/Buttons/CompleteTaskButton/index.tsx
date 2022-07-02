import { HiCheck } from "react-icons/hi";

type CompleteTaskButtonProps = {
  completed?: boolean;
};

export function CompleteTaskButton({
  completed = false,
}: CompleteTaskButtonProps) {
  return (
    <button hidden={completed}>
      <HiCheck data-testid="complete-task-icon" />
    </button>
  );
}
