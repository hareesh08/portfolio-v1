import { lazy, Suspense, useCallback, useState } from "react";
import { CARD_SHOWN_COOKIE, hasVisitCookie, INTRO_VISITED_COOKIE, markVisitCookie } from "@/lib/visit-flow";

const IntroScreen = lazy(() => import("@/components/IntroScreen"));
const CardRevealScreen = lazy(() => import("@/components/CardRevealScreen"));
const WelcomeScreen = lazy(() => import("@/components/WelcomeScreen"));
const PortfolioLanding = lazy(() => import("@/components/PortfolioLanding"));

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
    <Suspense fallback={null}>
      {stage === "intro" && <IntroScreen onComplete={handleIntroComplete} onSkipToLanding={skipToLanding} />}
      {stage === "welcome" && <WelcomeScreen onComplete={handleWelcomeComplete} onSkipToLanding={skipToLanding} />}
      {stage === "game" && <CardRevealScreen onComplete={handleCardRevealComplete} onSkipToLanding={skipToLanding} />}
      {stage === "portfolio" && <PortfolioLanding />}
    </Suspense>
  );
};

export default Index;
