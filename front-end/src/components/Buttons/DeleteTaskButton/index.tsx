import { HiOutlineTrash } from "react-icons/hi";

import type { TaskIdentifier } from "./propTypes";

import { useDeleteTask } from "../../../stores/task/useCases/DeleteTask";

export function DeleteTaskButton({ id }: TaskIdentifier) {
  const { mutate } = useDeleteTask(id);

  const handleDelete = async () => {
    mutate();
  };

  return (
    <button onClick={handleDelete}>
      <HiOutlineTrash data-testid="delete-task-icon" />
    </button>
  );
}
