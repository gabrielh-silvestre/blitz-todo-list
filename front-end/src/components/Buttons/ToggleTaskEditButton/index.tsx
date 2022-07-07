import { HiOutlinePencilAlt, HiOutlineXCircle } from "react-icons/hi";

import type { ToggleTaskEditButtonProps } from "./propTypes";

import { useTasks } from "../../../hooks/useTasks";

export function ToggleTaskEditButton({
  isEditing = false,
  className,
}: ToggleTaskEditButtonProps) {
  const { setEditMode } = useTasks();

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
