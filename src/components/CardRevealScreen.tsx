import { useEffect, useMemo, useState, useRef } from "react";
import { ArrowRight, RotateCcw, Sparkles, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CardRevealScreenProps {
  onComplete: () => void;
  onSkipToLanding?: () => void;
}

const CARD_DURATION_MS = 3000;

const palette = [
  { tone: "pink", bg: "#FF9D9D", darkBg: "#ffffff", text: "#1a0808", accent: "#FFC5AA" },
  { tone: "peach", bg: "#FFC5AA", darkBg: "#ffffff", text: "#1a0d07", accent: "#FF9D9D" },
  { tone: "cream", bg: "#EEF8CD", darkBg: "#ffffff", text: "#1a1a08", accent: "#BBF1D2" },
  { tone: "mint", bg: "#BBF1D2", darkBg: "#ffffff", text: "#0a1310", accent: "#EEF8CD" },
];

const cards = [
  {
    label: "Hero",
    paletteIndex: 0,
    eyebrow: "Android Developer",
    title: "Hareesh\nRagavendra",
    summary: "I build sharp Android experiences and practical backend systems with a strong focus on usability, speed, and secure implementation.",
    points: ["Based in Chennai, India", "6+ projects delivered", "4+ years experience"],
  },
  {
    label: "Skills",
    paletteIndex: 1,
    eyebrow: "Technical Stack",
    title: "Mobile-first,\nBackend-aware",
    summary: "My work spans Android app architecture, backend APIs, databases, and secure application design with production-ready tooling.",
    points: ["Kotlin, Java, Python, C#", "Jetpack Compose, MVVM", "FastAPI, Django REST"],
  },
  {
    label: "Projects",
    paletteIndex: 2,
    eyebrow: "Featured Work",
    title: "Real Products,\nReal Impact",
    summary: "The project set covers service operations, secure licensing, enterprise Android delivery, and automation systems designed to solve real workflow problems.",
    points: ["Service Management App", "Offline License System", "Report Automation"],
  },
  {
    label: "Experience",
    paletteIndex: 3,
    eyebrow: "Work & Proof",
    title: "Hands-on\nDelivery",
    summary: "I have delivered across internships and freelance engagements, while building a strong engineering foundation through formal technical education.",
    points: ["Ky Technologies Intern", "Freelance for 8+ clients", "B.Tech IT, SRM College"],
  },
  {
    label: "Contact",
    paletteIndex: 0,
    eyebrow: "Next Step",
    title: "Let's Build\nTogether",
    summary: "I am open to building mobile apps, backend systems, and focused technical solutions with clean execution and direct communication.",
    points: ["hareeshworksofficial@gmail.com", "github.com/hareesh08", "Available for work"],
  },
];

const CardRevealScreen = ({ onComplete, onSkipToLanding }: CardRevealScreenProps) => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleComplete, setCycleComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const flipTimerRef = useRef<number | undefined>();
  const finishFlipTimerRef = useRef<number | undefined>();

  const activeCard = useMemo(() => cards[activeIndex], [activeIndex]);
  const activePalette = palette[activeCard.paletteIndex];
  const paletteColors = useMemo(() => palette.map((p) => p.bg), []);

  const blobData = useMemo(
    () =>
      Array.from({ length: isMobile ? 4 : 12 }).map((_, i) => ({
        left: `${5 + (i * 83) % 90}%`,
        top: `${5 + (i * 67) % 90}%`,
        width: `${60 + (i * 37) % 100}px`,
        height: `${60 + (i * 53) % 100}px`,
        animationDuration: `${8 + (i * 2.7) % 6}s`,
        animationDelay: `${(i * 1.3) % 5}s`,
      })),
    [isMobile],
  );

  const confettiData = useMemo(
    () =>
      Array.from({ length: isMobile ? 20 : 60 }).map((_, i) => ({
        left: `${(i * 1.7) % 100}%`,
        animationDelay: `${(i * 0.37) % 2}s`,
        animationDuration: `${2 + (i * 0.47) % 3}s`,
        width: `${4 + (i * 1.1) % 8}px`,
        height: `${4 + (i * 1.1) % 8}px`,
        color: paletteColors[i % paletteColors.length],
      })),
    [isMobile, paletteColors],
  );

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
      setIsFlipping(true);

      flipTimerRef.current = window.setTimeout(() => {
        if (activeIndex === cards.length - 1) {
          setCycleComplete(true);
          setShowConfetti(true);
          setIsFlipping(false);
          return;
        }
        setActiveIndex((currentIndex) => currentIndex + 1);
        finishFlipTimerRef.current = window.setTimeout(() => setIsFlipping(false), 50);
      }, 300);
    }, CARD_DURATION_MS);

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(timer);
      window.clearTimeout(flipTimerRef.current);
      window.clearTimeout(finishFlipTimerRef.current);
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
    setShowConfetti(false);
    setIsFlipping(false);
  };

  return (
    <div
      className="fixed inset-0 z-[58] overflow-hidden transition-colors duration-700"
      style={{
        background: cycleComplete
          ? "linear-gradient(135deg, #fff7f0 0%, #fff0f3 50%, #f1fae8 100%)"
          : activePalette.bg,
      }}
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[60]">
          {confettiData.map((c, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: c.left,
                top: `-10px`,
                backgroundColor: c.color,
                animationDelay: c.animationDelay,
                animationDuration: c.animationDuration,
                width: c.width,
                height: c.height,
              }}
            />
          ))}
        </div>
      )}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blobData.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              left: blob.left,
              top: blob.top,
              width: blob.width,
              height: blob.height,
              backgroundColor: paletteColors[i % paletteColors.length],
              animation: `floatBlob ${blob.animationDuration} ease-in-out infinite`,
              animationDelay: blob.animationDelay,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* Skip button */}
        {!cycleComplete && (
          <button
            type="button"
            onClick={onSkipToLanding ?? onComplete}
            className="absolute right-4 top-4 z-20 inline-flex rounded-full border-2 border-white/40 bg-white/60 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-white/50 hover:scale-105 md:right-8 md:top-8 md:bg-white/30 md:backdrop-blur-sm"
          >
            Skip
          </button>
        )}

        {/* Progress bar */}
        {!cycleComplete && (
          <div className="uno-sequence-shell w-full max-w-2xl mb-8">
            <div className="flex items-center gap-3">
              {cards.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-3 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: i <= activeIndex ? palette[i % palette.length].bg : "rgba(255,255,255,0.2)",
                    transform: i === activeIndex ? "scaleY(1.4)" : "scaleY(1)",
                    boxShadow: i === activeIndex ? `0 0 12px ${palette[i % palette.length].bg}` : "none",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
              <span>{activeCard.label}</span>
              <span>{activeIndex + 1} / {cards.length}</span>
            </div>
          </div>
        )}

        {/* Card */}
        {!cycleComplete && (
          <div
            className={`relative w-full max-w-3xl transition-all duration-300 ${isFlipping ? "opacity-0 scale-95 rotate-3" : "opacity-100 scale-100 rotate-0"}`}
            style={{
              transform: isFlipping ? "translateX(100px) rotate(10deg) scale(0.8) opacity(0)" : undefined,
            }}
          >
            <div
              className="relative rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
              style={{
                backgroundColor: activePalette.bg,
                boxShadow: `0 24px 80px ${activePalette.darkBg}66, 0 0 0 8px rgba(255,255,255,0.15)`,
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: activePalette.darkBg }}
                >
                  <Star className="w-7 h-7" style={{ color: activePalette.text }} fill={activePalette.text} />
                </div>
                <div>
                  <p
                    className="text-sm font-bold uppercase tracking-[0.25em]"
                    style={{ color: activePalette.text }}
                  >
                    {activeCard.eyebrow}
                  </p>
                  <p
                    className="text-xs uppercase tracking-[0.2em] mt-1"
                    style={{ color: activePalette.text + "99" }}
                  >
                    Card {activeIndex + 1} of {cards.length}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6"
                style={{ color: activePalette.text }}
              >
                {activeCard.title.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>

              {/* Summary */}
              <p
                className="text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-8"
                style={{ color: activePalette.text + "cc" }}
              >
                {activeCard.summary}
              </p>

              {/* Points */}
              <div className="space-y-3">
                {activeCard.points.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ backgroundColor: activePalette.darkBg + "44" }}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: activePalette.accent }}
                    />
                    <span
                      className="text-base md:text-lg font-semibold"
                      style={{ color: activePalette.text }}
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-[4rem] opacity-30"
                style={{ backgroundColor: activePalette.darkBg }}
              />
            </div>
          </div>
        )}

        {/* Completion screen */}
        {cycleComplete && (
          <div className="w-full max-w-lg animate-scale-in">
            <div
              className="relative rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-center"
              style={{
                backgroundColor: palette[1].bg,
                boxShadow: `0 24px 80px ${palette[1].darkBg}66, 0 0 0 8px rgba(255,255,255,0.15)`,
              }}
            >
              <div className="flex justify-center gap-2 mb-6">
                {palette.map((p, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full animate-bounce"
                    style={{
                      backgroundColor: p.bg,
                      animationDelay: `${i * 0.15}s`,
                      boxShadow: `0 0 8px ${p.bg}`,
                    }}
                  />
                ))}
              </div>

              <h3
                className="text-3xl md:text-4xl font-black mb-3"
                style={{ color: palette[1].text }}
              >
                All Done!
              </h3>
              <p
                className="text-base md:text-lg font-medium mb-8"
                style={{ color: palette[1].text + "cc" }}
              >
                You've seen the highlights. Ready for the full experience?
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={onComplete}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: palette[0].bg,
                    color: palette[0].text,
                    boxShadow: `0 8px 24px ${palette[0].darkBg}66`,
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  Continue
                </button>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4 font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: palette[0].text + "44",
                    color: palette[0].text,
                    backgroundColor: "transparent",
                  }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Replay
                </button>
              </div>

              <p
                className="mt-6 text-sm font-medium"
                style={{ color: palette[0].text + "88" }}
              >
                Auto-continuing in {countdown}s...
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }

        @keyframes floatBlob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default CardRevealScreen;
