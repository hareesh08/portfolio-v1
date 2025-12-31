import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import BootingScreen from "@/components/BootingScreen";
import IntroScreen from "@/components/IntroScreen";

type ScreenPhase = "checking" | "intro" | "booting" | "main";

const Index = () => {
  const [phase, setPhase] = useState<ScreenPhase>("checking");

  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio_visited");
    if (hasVisited) {
      setPhase("booting");
    } else {
      setPhase("intro");
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem("portfolio_visited", "true");
    setPhase("main");
  };

  const handleBootingComplete = () => {
    setPhase("main");
  };

  if (phase === "checking") {
    return <div className="fixed inset-0 bg-[#0f0f1a]" />;
  }

  return (
    <>
      {phase === "intro" && <IntroScreen onComplete={handleIntroComplete} />}
      {phase === "booting" && <BootingScreen onComplete={handleBootingComplete} />}
      {phase === "main" && (
        <div className="min-h-screen bg-[#0f0f1a]">
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
};

export default Index;
