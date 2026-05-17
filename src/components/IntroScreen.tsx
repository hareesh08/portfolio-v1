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
    <div className={`fixed inset-0 z-[60] overflow-hidden bg-black transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}>
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

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.68))]" />

      {showStartOverlay && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/88 px-6 text-center">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: isMobile ? 16 : 32 }).map((_, index) => (
              <div
                key={index}
                className="intro-particle absolute rounded-full bg-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random()}px`,
                  height: `${1 + Math.random()}px`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl md:h-[520px] md:w-[520px]" />

          <div className="relative z-10 max-w-3xl intro-fade-in">
            <h1 className="mb-4 text-4xl font-extralight tracking-[0.08em] text-white md:text-6xl">
              A cinematic opening before the portfolio starts.
            </h1>
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-white/50 md:text-base">
              This is a standalone intro screen. After it ends, the experience moves to a separate welcome stage and then the flash-card game.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:flex-row intro-scale-in">
            <button
              type="button"
              onClick={handleStart}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-medium tracking-wide text-black transition-all duration-300 hover:bg-white/90 md:px-10 md:py-5 md:text-lg"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">Play Intro</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onSkipToLanding ?? finishIntro}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-sm font-medium uppercase tracking-[0.22em] text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white"
            >
              Skip To Landing
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
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }

        .intro-particle {
          animation: introParticle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
