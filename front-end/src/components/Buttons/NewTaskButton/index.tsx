import { HiOutlinePlus } from "react-icons/hi";

import type { NewTaskProps } from "./propTypes";

export function NewTaskButton({
  title,
  description,
  mainTaskId,
}: NewTaskProps) {
  return (
    <button>
      <HiOutlinePlus data-testid="add-task-icon" />
    </button>
  );
}
