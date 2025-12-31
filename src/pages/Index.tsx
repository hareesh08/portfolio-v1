import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BootingScreen from "@/components/BootingScreen";
import IntroScreen from "@/components/IntroScreen";

type ScreenPhase = "checking" | "intro" | "booting" | "main";

const Index = () => {
  const [phase, setPhase] = useState<ScreenPhase>("checking");

  // Check if first visit using localStorage
  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio_visited");
    if (hasVisited) {
      // Returning visitor - show boot screen
      setPhase("booting");
    } else {
      // First time visitor - show intro, then go directly to main
      setPhase("intro");
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem("portfolio_visited", "true");
    setPhase("main"); // Go directly to main after intro
  };

  const handleBootingComplete = () => {
    setPhase("main");
  };

  // Show nothing while checking localStorage
  if (phase === "checking") {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
    <>
      {/* Intro Screen - only on first visit, goes directly to main */}
      {phase === "intro" && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      {/* Booting Screen - only for returning visitors */}
      {phase === "booting" && (
        <BootingScreen onComplete={handleBootingComplete} />
      )}

      {/* Main Content */}
      {phase === "main" && (
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
