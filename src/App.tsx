import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
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

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const timeout = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return () => clearTimeout(timeout);
      }
    }

    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToSection>
            <a
              href="#main-content"
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
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TerminalGameLauncher>
          </ScrollToSection>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
