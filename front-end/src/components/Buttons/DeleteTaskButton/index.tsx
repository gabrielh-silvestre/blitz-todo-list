import { HiOutlineTrash } from "react-icons/hi";

import type { TaskIdentifier } from "../../../@types/types";

export function DeleteTaskButton({ id }: TaskIdentifier) {
  return (
    <button>
      <HiOutlineTrash data-testid="delete-task-icon" />
    </button>
  );
}
