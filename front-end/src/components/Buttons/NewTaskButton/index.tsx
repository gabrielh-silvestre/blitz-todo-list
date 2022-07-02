import { HiOutlinePlus } from "react-icons/hi";

export function NewTaskButton() {
  return (
    <button>
      <HiOutlinePlus data-testid="add-task-icon" />
    </button>
  );
}
