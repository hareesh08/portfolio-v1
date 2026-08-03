import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-white/60 bg-white/55 backdrop-blur-md text-black/60 hover:border-pink/60 hover:text-pink transition-all duration-300 shadow-lg dark:border-white/10 dark:bg-white/8 dark:text-white/60 dark:hover:border-pink/50 dark:hover:text-pink"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </button>
  );
}
