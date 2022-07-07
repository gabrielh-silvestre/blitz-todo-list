import { HiOutlinePlus } from "react-icons/hi";

import type { NewTaskProps } from "./propTypes";

import { useTasks } from "../../../hooks/useTasks";

export function NewTaskButton({
  isUpdate = false,
  disabled = false,
}: NewTaskProps) {
  const { setEditMode, setSelectedTask } = useTasks();

  if (isUpdate) {
    return (
      <button disabled={disabled} type="submit">
        <HiOutlinePlus data-testid="add-task-icon" />
      </button>
    );
  }

  const handleAddNewTask = () => {
    setEditMode(true);
    setSelectedTask(null);
  };

  return (
    <button onClick={handleAddNewTask}>
      <HiOutlinePlus data-testid="add-task-icon" />
    </button>
  );
}
