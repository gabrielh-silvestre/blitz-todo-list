import { useState } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

export function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <button
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? (
        <MdDarkMode data-testid="dark-mode-icon" />
      ) : (
        <MdOutlineDarkMode data-testid="light-mode-icon" />
      )}
    </button>
  );
}
