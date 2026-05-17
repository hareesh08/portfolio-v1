import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

interface CardRevealScreenProps {
  onComplete: () => void;
  onSkipToLanding?: () => void;
}

const CARD_DURATION_MS = 2400;

const cards = [
  {
    label: "Hero",
    tone: "cyan",
    eyebrow: "Android Developer",
    title: "Hareesh Ragavendra",
    summary: "I build sharp Android experiences and practical backend systems with a strong focus on usability, speed, and secure implementation.",
    points: ["Based in Chennai, Tamil Nadu, India", "6+ portfolio projects delivered", "4+ years building across mobile and backend"],
  },
  {
    label: "Skills",
    tone: "lime",
    eyebrow: "Technical Stack",
    title: "Mobile-first, backend-aware, security-conscious",
    summary: "My work spans Android app architecture, backend APIs, databases, and secure application design with production-ready tooling.",
    points: ["Kotlin, Java, Python, C#, SQL", "Jetpack Compose, MVVM, Retrofit, Room", "FastAPI, Django REST, JWT, WebSockets"],
  },
  {
    label: "Projects",
    tone: "red",
    eyebrow: "Featured Work",
    title: "Real products with measurable outcomes",
    summary: "The project set covers service operations, secure licensing, enterprise Android delivery, and automation systems designed to solve real workflow problems.",
    points: ["Service Management App with JWT auth and WebSocket chat", "Offline License System with AES-256, HWID binding, and HMAC", "Report automation reduced processing time from 8 hours to 30 minutes"],
  },
  {
    label: "Experience",
    tone: "violet",
    eyebrow: "Work And Proof",
    title: "Hands-on delivery backed by internships and freelance work",
    summary: "I have delivered across internships and freelance engagements, while building a strong engineering foundation through formal technical education.",
    points: ["Android & Backend Developer Intern at Ky Technologies", "Freelance Python delivery for 8+ clients", "B.Tech Information Technology, SRM Easwari Engineering College"],
  },
  {
    label: "Contact",
    tone: "amber",
    eyebrow: "Next Step",
    title: "Available for thoughtful engineering work",
    summary: "I am open to building mobile apps, backend systems, and focused technical solutions with clean execution and direct communication.",
    points: ["Email and phone available on the landing page", "GitHub: hareesh08", "LinkedIn profile ready for direct contact"],
  },
];

const CardRevealScreen = ({ onComplete, onSkipToLanding }: CardRevealScreenProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleComplete, setCycleComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const activeCard = useMemo(() => cards[activeIndex], [activeIndex]);

  useEffect(() => {
    if (cycleComplete) return;

    const progressInterval = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 100 / (CARD_DURATION_MS / 80);
        return next >= 100 ? 100 : next;
      });
    }, 80);

    const timer = window.setTimeout(() => {
      setProgress(0);

      if (activeIndex === cards.length - 1) {
        setCycleComplete(true);
        return;
      }

      setActiveIndex((currentIndex) => currentIndex + 1);
    }, CARD_DURATION_MS);

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(timer);
    };
  }, [activeIndex, cycleComplete]);

  useEffect(() => {
    if (!cycleComplete) return;

    setCountdown(5);

    const countdownTimer = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(countdownTimer);
          onComplete();
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearInterval(countdownTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cycleComplete, onComplete]);

  const handleReplay = () => {
    setActiveIndex(0);
    setCycleComplete(false);
    setProgress(0);
    setCountdown(5);
  };

  return (
    <div className={`fixed inset-0 z-[58] overflow-hidden bg-[#070b15] ${cycleComplete ? "uno-sequence-complete" : ""}`}>
      <div className="absolute inset-0 uno-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_24%),linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
      <div className="uno-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {!cycleComplete && (
          <button
            type="button"
            onClick={onSkipToLanding ?? onComplete}
            className="absolute right-4 top-4 z-20 inline-flex rounded-full border border-white/12 bg-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:text-white md:right-8 md:top-8"
          >
            Skip To Landing
          </button>
        )}

        <div className="uno-sequence-shell w-full max-w-6xl">
          <div className="uno-sequence-progress" aria-hidden="true">
            <span className="uno-sequence-progress-track" />
            <span className="uno-sequence-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className={`uno-spotlight-card uno-card-${activeCard.tone}`}>
            <div className="uno-spotlight-card-inner">
              <div className="uno-spotlight-topline">
                <span className="uno-spotlight-index">0{activeIndex + 1}</span>
                <span className="uno-spotlight-label">{activeCard.label}</span>
              </div>

              <div className="uno-spotlight-copy">
                <p className="uno-spotlight-eyebrow">{activeCard.eyebrow}</p>
                <h2 className="uno-spotlight-title">{activeCard.title}</h2>
                <p className="uno-spotlight-summary">{activeCard.summary}</p>
              </div>

              <div className="uno-spotlight-points">
                {activeCard.points.map((item) => (
                  <div key={item} className="uno-spotlight-point">{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="uno-sequence-footer">
            <div className="uno-sequence-count">
              <span>{activeIndex + 1}</span>
              <span>/</span>
              <span>{cards.length}</span>
            </div>

            {!cycleComplete ? (
              <p className="uno-sequence-status">Presenting the profile in sequence.</p>
            ) : (
              <p className="uno-sequence-status">Preparing landing page access.</p>
            )}
          </div>
        </div>
      </div>

      {cycleComplete && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55 px-4 backdrop-blur-md">
          <div className="uno-completion-modal w-full max-w-lg rounded-[2rem] border border-white/12 bg-[#0c1220]/95 p-6 text-center shadow-[0_32px_90px_rgba(0,0,0,0.5)] md:p-8">
            <p className="uno-completion-kicker">Ready</p>
            <h3 className="uno-completion-title">Continue to the landing page?</h3>
            <p className="uno-completion-text">Redirecting automatically in {countdown}s if there is no response.</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={onComplete} className="uno-stage-action">
                <Sparkles className="h-4 w-4" />
                Continue
              </button>

              <button type="button" onClick={handleReplay} className="uno-secondary-action">
                <RotateCcw className="h-4 w-4" />
                Replay
              </button>

              <button type="button" onClick={onSkipToLanding ?? onComplete} className="uno-secondary-action">
                <ArrowRight className="h-4 w-4" />
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardRevealScreen;
