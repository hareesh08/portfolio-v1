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
      // Returning visitor - skip intro, go to boot screen
      setPhase("booting");
    } else {
      // First time visitor - show intro
      setPhase("intro");
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem("portfolio_visited", "true");
    setPhase("booting");
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
      {/* Intro Screen - only on first visit */}
      {phase === "intro" && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      {/* Booting Screen */}
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
