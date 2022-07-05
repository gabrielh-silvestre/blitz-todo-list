import { HiOutlinePlus } from "react-icons/hi";

import type { NewTaskProps } from "./propTypes";

import { taskStore } from "../../../stores/task";

export function NewTaskButton({
  isUpdate = false,
  disabled = false,
}: NewTaskProps) {
  const { setEditMode, setSelectedTask } = taskStore((state) => state);

  if (isUpdate) {
    return (
      <button disabled={disabled} type="submit">
        <HiOutlinePlus data-testid="add-task-icon" />
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        setEditMode(true);
        setSelectedTask(null);
      }}
    >
      <HiOutlinePlus data-testid="add-task-icon" />
    </button>
  );
}
