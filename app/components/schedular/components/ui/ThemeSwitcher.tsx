"use client";

import IconButton from "@material-ui/core/IconButton";
import { Moon, Sun, UserIcon } from "@/app/components/icons";
import { useTheme } from "next-themes";

const ThemeSwitcherIcon = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className="flex items-center px-4 py-2 border border-primary-300 rounded-lg bg-primary-0 shadow-sm hover:bg-primary-100 "
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme == "dark" ? (
        <Moon className="size-6" />
      ) : (
        <Sun className="size-6" />
      )}
    </button>
  );
};

export default ThemeSwitcherIcon;
