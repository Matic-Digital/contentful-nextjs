"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@/lib/store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return children;
}

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  return { theme, setTheme } as const;
}
