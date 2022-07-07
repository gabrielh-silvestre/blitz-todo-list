import { HiOutlineTrash } from "react-icons/hi";

import type { TaskIdentifier } from "./propTypes";

import { useTasks } from "../../../hooks/useTasks";

export function DeleteTaskButton({ id }: TaskIdentifier) {
  const { selectedTask, setSelectedTask, deleteTask } = useTasks();

  const handleDelete = () => {
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
    deleteTask(id);
  };

  return (
    <button onClick={handleDelete}>
      <HiOutlineTrash data-testid="delete-task-icon" />
    </button>
  );
}
