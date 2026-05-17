import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import IntroScreen from "@/components/IntroScreen";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
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
