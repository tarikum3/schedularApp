"use client";

import IconButton from "@material-ui/core/IconButton";
import { Moon, Sun, UserIcon } from "@/app/components/icons";
import { useTheme } from "next-themes";

const ThemeSwitcherIcon = () => {
  const { theme, setTheme } = useTheme();
  return (
    <IconButton
      className="w-10 h-10 border border-zinc-800"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme == "dark" ? (
        <Moon className="size-6" />
      ) : (
        <Sun className="size-6" />
      )}
    </IconButton>
  );
};

export default ThemeSwitcherIcon;
