"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="fixed top-4 right-4 z-50 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur"
    >
      {theme === "dark" ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}
