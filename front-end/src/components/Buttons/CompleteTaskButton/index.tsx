import { HiCheck } from "react-icons/hi";

import type { CompleteTaskButtonProps } from "./propTypes";

import { useTasks } from "../../../hooks/useTasks";

export function CompleteTaskButton({
  taskId,
  completed = false,
}: CompleteTaskButtonProps) {
  const { completeTask } = useTasks();

  return (
    <button hidden={completed} onClick={() => completeTask(taskId)}>
      <HiCheck data-testid="complete-task-icon" />
    </button>
  );
}
