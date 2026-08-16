import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { PORTFOLIO_THEMES, usePortfolioTheme } from "@/context/ThemeContext";

const ThemePicker = () => {
  const { theme, setTheme } = usePortfolioTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Choose a theme"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="fixed bottom-6 right-20 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-white/60 bg-white/55 backdrop-blur-md text-black/60 hover:border-pink/60 hover:text-pink transition-all duration-300 shadow-lg dark:border-white/10 dark:bg-white/8 dark:text-white/60 dark:hover:border-pink/50 dark:hover:text-pink"
      >
        <Palette className="w-5 h-5" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Theme picker"
          className="fixed bottom-20 right-4 md:right-6 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-3xl p-4 md:p-5 glass-strong animate-palette-in"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45 dark:text-white/45 mb-1">
            Appearance
          </p>
          <p className="text-sm font-bold text-ink mb-3">Pick a theme you like</p>

          <div role="radiogroup" aria-label="Themes" className="flex flex-col gap-1.5">
            {PORTFOLIO_THEMES.map((entry) => {
              const active = entry.id === theme;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTheme(entry.id)}
                  className={`group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-200 ${
                    active
                      ? "border-pink/70 bg-pink/10 shadow-[0_6px_18px_rgba(var(--candy-1-rgb),0.22)]"
                      : "border-transparent hover:border-white/70 dark:hover:border-white/15 hover:bg-white/45 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="flex -space-x-1.5 flex-shrink-0">
                    {entry.swatch.map((color) => (
                      <span
                        key={color}
                        className="w-5 h-5 rounded-full border-2 border-white dark:border-white/25"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                  <span className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-bold text-ink leading-tight">{entry.label}</span>
                    <span className="text-[11px] text-black/50 dark:text-white/50 truncate">
                      {entry.tagline}
                    </span>
                  </span>
                  {active && (
                    <Check className="w-4 h-4 flex-shrink-0 text-pink" aria-label="Active theme" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em] text-black/35 dark:text-white/35">
            Saved on this device · pairs with dark mode
          </p>
        </div>
      )}
    </>
  );
};

export default ThemePicker;
