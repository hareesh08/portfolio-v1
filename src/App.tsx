import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import { PortfolioThemeProvider } from "@/context/ThemeContext";
import ThemePicker from "@/components/ThemePicker";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { TerminalGameLauncher } from "./components/TerminalGame";

const queryClient = new QueryClient();

const routeToSectionMap: Record<string, string> = {
  "/skills": "skills",
  "/projects": "projects",
  "/experience": "experience",
  "/contact": "contact",
};

const ScrollToSection = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1);
    const sectionId = hash || routeToSectionMap[location.pathname];

    let attempts = 0;
    let retry: number | undefined;
    const scroll = () => {
      const element = sectionId ? document.getElementById(sectionId) : null;
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (sectionId && attempts++ < 20) retry = window.setTimeout(scroll, 100);
      else if (!sectionId) window.scrollTo(0, 0);
    };

    const timeout = window.setTimeout(scroll, 0);
    return () => {
      window.clearTimeout(timeout);
      if (retry) window.clearTimeout(retry);
    };
  }, [location]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PortfolioThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <ScrollToSection>
              <a
                href="#main-content"
                onClick={(event) => {
                  event.preventDefault();
                  const main = document.getElementById("main-content");
                  main?.scrollIntoView();
                  main?.focus();
                }}
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-slate-950 focus:rounded-full focus:font-semibold focus:text-sm"
              >
                Skip to main content
              </a>
              <TerminalGameLauncher>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/skills" element={<Index />} />
                  <Route path="/projects" element={<Index />} />
                  <Route path="/experience" element={<Index />} />
                  <Route path="/contact" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:section/:slug" element={<BlogPost />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TerminalGameLauncher>
              <ThemePicker />
            </ScrollToSection>
          </HashRouter>
        </TooltipProvider>
      </AuthProvider>
      </PortfolioThemeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
