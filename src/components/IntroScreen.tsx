import { useCallback, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { INTRO_VISITED_COOKIE, markVisitCookie } from "@/lib/visit-flow";

interface IntroScreenProps {
  onComplete: () => void;
  onSkipToLanding?: () => void;
}

const markIntroVisited = () => markVisitCookie(INTRO_VISITED_COOKIE);

const IntroScreen = ({ onComplete, onSkipToLanding }: IntroScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const [isExiting, setIsExiting] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);

  const finishIntro = useCallback(() => {
    markIntroVisited();
    setShowStartOverlay(false);
    setIsExiting(true);
    window.setTimeout(onComplete, 400);
  }, [onComplete]);

  const handleStart = useCallback(async () => {
    const video = videoRef.current;

    if (!video) {
      finishIntro();
      return;
    }

    video.muted = false;

    try {
      await video.play();
      markIntroVisited();
      setShowStartOverlay(false);
    } catch {
      finishIntro();
    }
  }, [finishIntro]);

  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(255, 157, 157, 0.55), transparent 38%), radial-gradient(circle at 80% 20%, rgba(255, 197, 170, 0.55), transparent 40%), radial-gradient(circle at 70% 80%, rgba(187, 241, 210, 0.55), transparent 42%), radial-gradient(circle at 20% 80%, rgba(238, 248, 205, 0.55), transparent 40%), linear-gradient(135deg, #fff7f0 0%, #fff0f3 50%, #f1fae8 100%)",
      }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        playsInline
        muted={false}
        autoPlay
        onEnded={finishIntro}
      >
        <source src="/Intro-Desktop.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.35))" }} />

      {showStartOverlay && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center md:backdrop-blur-sm" style={{ background: "rgba(255, 255, 255, 0.55)" }}>
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: isMobile ? 6 : 32 }).map((_, index) => (
              <div
                key={index}
                className="intro-particle absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  backgroundColor: ["#FF9D9D", "#FFC5AA", "#EEF8CD", "#BBF1D2"][index % 4],
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {!isMobile && (
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-2xl" />
          )}

          <div className="relative z-10 max-w-3xl intro-fade-in">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] md:text-sm" style={{ color: "rgba(20, 20, 20, 0.55)" }}>
              Portfolio Introduction
            </p>
            <h1 className="mb-5 text-4xl font-light tracking-[0.04em] md:text-6xl" style={{ color: "rgb(20, 20, 20)" }}>
              Welcome. Let's begin.
            </h1>
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed md:text-base" style={{ color: "rgba(20, 20, 20, 0.65)" }}>
              A short introduction will play before the experience begins.
            </p>
          </div>

          <div className="relative z-10 mt-12 flex flex-col items-center gap-3 sm:flex-row intro-scale-in">
            <button
              type="button"
              onClick={handleStart}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 md:px-10 md:py-5"
              style={{
                background: "linear-gradient(135deg, #FF9D9D, #FFC5AA)",
                color: "#1a0808",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 12px 32px rgba(255, 157, 157, 0.5)",
              }}
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">Begin</span>
              <ArrowRight className="h-4 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onSkipToLanding ?? finishIntro}
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/55 backdrop-blur px-6 py-4 text-sm font-medium uppercase tracking-[0.22em] transition-colors duration-300 hover:bg-white/85"
              style={{ color: "rgba(20, 20, 20, 0.8)" }}
            >
              Skip
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes introFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .intro-fade-in {
          animation: introFadeIn 0.8s ease-out forwards;
        }

        @keyframes introScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .intro-scale-in {
          animation: introScaleIn 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        @keyframes introParticle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        .intro-particle {
          animation: introParticle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
