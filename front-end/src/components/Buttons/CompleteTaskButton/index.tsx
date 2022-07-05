import { HiCheck } from "react-icons/hi";

import type { CompleteTaskButtonProps } from "./propTypes";

import { useCompleteTask } from "../../../stores/task/useCases/CompleteTask";

export function CompleteTaskButton({
  taskId,
  completed = false,
}: CompleteTaskButtonProps) {
  const { mutate } = useCompleteTask();

  const handleCompleteTask = () => {
    mutate(taskId);
  };

  return (
    <button hidden={completed} onClick={handleCompleteTask}>
      <HiCheck data-testid="complete-task-icon" />
    </button>
  );
}
