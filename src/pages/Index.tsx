import { useState, useEffect } from "react";
import Desktop from "@/components/Desktop";
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
    return <div className="fixed inset-0 bg-[#1e1e2e]" />;
  }

  return (
    <>
      {phase === "intro" && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      {phase === "booting" && (
        <BootingScreen onComplete={handleBootingComplete} />
      )}

      {phase === "main" && <Desktop />}
    </>
  );
};

export default Index;
