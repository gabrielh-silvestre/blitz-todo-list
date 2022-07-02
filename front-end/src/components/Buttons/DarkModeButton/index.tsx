import { MdOutlineDarkMode } from "react-icons/md";

export function DarkModeButton() {
  return (
    <button>
      <MdOutlineDarkMode data-testid="light-mode-icon" />
    </button>
  );
}
