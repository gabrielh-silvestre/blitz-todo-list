import { HiOutlineTrash } from "react-icons/hi";

export function DeleteTaskButton() {
  return (
    <button>
      <HiOutlineTrash data-testid="delete-task-icon" />
    </button>
  );
}
