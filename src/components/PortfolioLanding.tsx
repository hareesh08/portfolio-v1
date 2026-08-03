import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const PortfolioLanding = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundAnimation />
      <Navbar />
      <DarkModeToggle />

      <main id="main-content" tabIndex={-1} className="portfolio-stage relative z-10 px-3 pb-14 pt-28 outline-none md:px-6 md:pb-20 md:pt-32">
        <div className="portfolio-shell space-y-6 md:space-y-8">
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default PortfolioLanding;
