import { HiOutlinePlus } from "react-icons/hi";

import type { NewTaskProps } from "./propTypes";

import { useCreateNewTask } from "../../../stores/task/useCases/CreateNewTask";

export function NewTaskButton({
  title,
  description = null,
  mainTaskId = null,
}: NewTaskProps) {
  const { mutate } = useCreateNewTask({
    title,
    description,
    mainTaskId,
  });

  const handleCreateNewTask = () => {
    mutate();
  };

  return (
    <button onClick={handleCreateNewTask}>
      <HiOutlinePlus data-testid="add-task-icon" />
    </button>
  );
}
