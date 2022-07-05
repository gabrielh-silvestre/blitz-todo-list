import { HiOutlinePencilAlt, HiOutlineXCircle } from "react-icons/hi";

import type { ToggleTaskEditButtonProps } from "./propTypes";

import { taskStore } from "../../../stores/task";

export function ToggleTaskEditButton({
  isEditing = false,
  className,
}: ToggleTaskEditButtonProps) {
  const { setEditMode } = taskStore((state) => state);

  return (
    <button
      className={className}
      onClick={() => {
        setEditMode(!isEditing);
      }}
    >
      {isEditing ? <HiOutlineXCircle /> : <HiOutlinePencilAlt />}
    </button>
  );
}
