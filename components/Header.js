"use client";

import { CloudUpload, Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useEffect, useState } from "react";

function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;

    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-4 md:px-8 dark:border-zinc-800 dark:bg-zinc-950">
      <SidebarTrigger />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-xl border border-stone-300 px-4 py-2 hover:bg-stone-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {dark ? (
            <Moon size={20} className="text-zinc-200" />
          ) : (
            <Sun size={20} className="text-stone-600" />
          )}
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
          <CloudUpload size={18} className="text-primary" />
          Upload image
        </button>
      </div>
    </header>
  );
}

export default Header;
