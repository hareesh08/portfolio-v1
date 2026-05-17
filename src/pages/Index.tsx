import { useCallback, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import IntroScreen from "@/components/IntroScreen";
import CardRevealScreen from "@/components/CardRevealScreen";
import { CARD_SHOWN_COOKIE, hasVisitCookie, INTRO_VISITED_COOKIE, markVisitCookie } from "@/lib/visit-flow";

const Index = () => {
  const shouldShowIntro = useMemo(() => !hasVisitCookie(INTRO_VISITED_COOKIE), []);
  const shouldShowCardReveal = useMemo(() => !hasVisitCookie(CARD_SHOWN_COOKIE), []);
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const [showCardReveal, setShowCardReveal] = useState(!shouldShowIntro && shouldShowCardReveal);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);

    if (!hasVisitCookie(CARD_SHOWN_COOKIE)) {
      setShowCardReveal(true);
      return;
    }

    setShowCardReveal(false);
  }, []);

  const handleCardRevealComplete = useCallback(() => {
    markVisitCookie(CARD_SHOWN_COOKIE);
    setShowCardReveal(false);
  }, []);

  return (
    <>
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      {showCardReveal && <CardRevealScreen onComplete={handleCardRevealComplete} />}
      <div className="min-h-screen bg-gradient-hero relative overflow-x-hidden">
        <BackgroundAnimation />
        <Navbar />
        <main className="relative z-10 flash-deck">
          <div className="flash-card-stage flash-card-stage-hero">
            <div className="flash-card-shell flash-card-shell-hero">
              <Hero />
            </div>
          </div>

          <div className="flash-card-stage flash-card-stage-skills">
            <div className="flash-card-shell flash-card-shell-skills">
              <Skills />
            </div>
          </div>

          <div className="flash-card-stage flash-card-stage-projects">
            <div className="flash-card-shell flash-card-shell-projects">
              <Projects />
            </div>
          </div>

          <div className="flash-card-stage flash-card-stage-experience">
            <div className="flash-card-shell flash-card-shell-experience">
              <Experience />
            </div>
          </div>

          <div className="flash-card-stage flash-card-stage-contact">
            <div className="flash-card-shell flash-card-shell-contact">
              <Contact />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
