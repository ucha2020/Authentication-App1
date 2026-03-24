"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  function toggleTheme() {
    if (currentTheme) setTheme(currentTheme === "light" ? "dark" : "light");
  }

  if (!mounted) return null; // Only render after hydration

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-10 right-2 z-50 rounded-[1.875em] border border-(--base-color) px-3 py-1"
    >
      {currentTheme === "light" ? "🌙 Dark" : "🌞 Light"}
    </button>
  );
}

/*"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  function toggleTheme() {
    if (currentTheme) {
      setTheme(currentTheme === "light" ? "dark" : "light");
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 z-50 rounded-md border px-3 py-1 dark:border-gray-700"
    >
      {currentTheme === "light" ? "🌙 Dark" : "🌞 Light"}
    </button>
  );
}*/
