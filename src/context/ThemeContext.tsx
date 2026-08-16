import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type PortfolioThemeId = "candy" | "aurora" | "ember" | "terminal" | "paper" | "ocean";

export interface PortfolioTheme {
  id: PortfolioThemeId;
  label: string;
  tagline: string;
  swatch: [string, string, string, string];
}

export const PORTFOLIO_THEMES: PortfolioTheme[] = [
  {
    id: "candy",
    label: "Candy",
    tagline: "Soft pastel pop",
    swatch: ["#FF9D9D", "#FFC5AA", "#EEF8CD", "#BBF1D2"],
  },
  {
    id: "aurora",
    label: "Aurora",
    tagline: "After-dark glass",
    swatch: ["#22d3ee", "#a78bfa", "#e879f9", "#38bdf8"],
  },
  {
    id: "ember",
    label: "Ember",
    tagline: "Retrowave dusk",
    swatch: ["#fb7185", "#f59e0b", "#e879f9", "#fb923c"],
  },
  {
    id: "terminal",
    label: "Terminal",
    tagline: "Phosphor green",
    swatch: ["#4ade80", "#a3e635", "#2dd4bf", "#86efac"],
  },
  {
    id: "paper",
    label: "Paper",
    tagline: "Editorial ivory",
    swatch: ["#d97706", "#ca8a04", "#9a3412", "#0f766e"],
  },
  {
    id: "ocean",
    label: "Ocean",
    tagline: "Deep-sea blues",
    swatch: ["#38bdf8", "#0ea5e9", "#2dd4bf", "#818cf8"],
  },
];

const THEME_STORAGE_KEY = "portfolio-theme";
const VALID_IDS = new Set(PORTFOLIO_THEMES.map((theme) => theme.id));

const readStoredTheme = (): PortfolioThemeId => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && VALID_IDS.has(stored as PortfolioThemeId)) {
      return stored as PortfolioThemeId;
    }
  } catch {
    // localStorage unavailable (private mode etc.) — fall back to default
  }
  return "candy";
};

interface PortfolioThemeContextValue {
  theme: PortfolioThemeId;
  setTheme: (id: PortfolioThemeId) => void;
}

const PortfolioThemeContext = createContext<PortfolioThemeContextValue>({
  theme: "candy",
  setTheme: () => {},
});

export const PortfolioThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<PortfolioThemeId>(readStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((id: PortfolioThemeId) => {
    setThemeState(id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // persistence is best-effort
    }
  }, []);

  return (
    <PortfolioThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </PortfolioThemeContext.Provider>
  );
};

export const usePortfolioTheme = () => useContext(PortfolioThemeContext);
