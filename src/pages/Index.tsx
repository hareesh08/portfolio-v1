import { useCallback, useState } from "react";
import IntroScreen from "@/components/IntroScreen";
import CardRevealScreen from "@/components/CardRevealScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import PortfolioLanding from "@/components/PortfolioLanding";
import { CARD_SHOWN_COOKIE, hasVisitCookie, INTRO_VISITED_COOKIE, markVisitCookie } from "@/lib/visit-flow";

type Stage = "intro" | "welcome" | "game" | "portfolio";

const Index = () => {
  const shouldShowIntro = !hasVisitCookie(INTRO_VISITED_COOKIE);
  const shouldShowCardReveal = !hasVisitCookie(CARD_SHOWN_COOKIE);

  const initialStage: Stage = shouldShowIntro
    ? "intro"
    : shouldShowCardReveal
      ? "welcome"
      : "portfolio";

  const [stage, setStage] = useState<Stage>(initialStage);

  const skipToLanding = useCallback(() => {
    markVisitCookie(INTRO_VISITED_COOKIE);
    markVisitCookie(CARD_SHOWN_COOKIE);
    setStage("portfolio");
  }, []);

  const handleIntroComplete = useCallback(() => {
    setStage("welcome");
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    setStage("game");
  }, []);

  const handleCardRevealComplete = useCallback(() => {
    markVisitCookie(CARD_SHOWN_COOKIE);
    setStage("portfolio");
  }, []);

  return (
    <>
      {stage === "intro" && <IntroScreen onComplete={handleIntroComplete} onSkipToLanding={skipToLanding} />}
      {stage === "welcome" && <WelcomeScreen onComplete={handleWelcomeComplete} onSkipToLanding={skipToLanding} />}
      {stage === "game" && <CardRevealScreen onComplete={handleCardRevealComplete} onSkipToLanding={skipToLanding} />}
      {stage === "portfolio" && <PortfolioLanding />}
    </>
  );
};

export default Index;
