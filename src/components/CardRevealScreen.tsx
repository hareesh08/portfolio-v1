import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface CardRevealScreenProps {
  onComplete: () => void;
}

const cards = [
  { label: "Hero", tone: "cyan", detail: "Identity" },
  { label: "Skills", tone: "lime", detail: "Stack" },
  { label: "Projects", tone: "red", detail: "Work" },
  { label: "Experience", tone: "violet", detail: "Proof" },
  { label: "Contact", tone: "amber", detail: "Reach" },
];

type RevealPhase = "dealing" | "spotlight" | "ready";

const CardRevealScreen = ({ onComplete }: CardRevealScreenProps) => {
  const [phase, setPhase] = useState<RevealPhase>("dealing");
  const [activeIndex, setActiveIndex] = useState(2);

  const activeCard = useMemo(() => cards[activeIndex], [activeIndex]);

  useEffect(() => {
    const spotlightTimer = window.setTimeout(() => setPhase("spotlight"), 1400);
    const readyTimer = window.setTimeout(() => setPhase("ready"), 2400);

    return () => {
      window.clearTimeout(spotlightTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "ready") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete, phase]);

  const handleCardSelect = (index: number) => {
    if (phase === "dealing") return;

    if (phase === "ready" && index === activeIndex) {
      onComplete();
      return;
    }

    setActiveIndex(index);
  };

  const handleEnter = () => {
    if (phase !== "ready") return;
    onComplete();
  };

  return (
    <div className={`fixed inset-0 z-[58] overflow-hidden bg-[#070b15] uno-reveal-${phase}`}>
      <div className="absolute inset-0 uno-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_24%),linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />
      <div className="uno-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center">
        <div className="uno-chip mb-4">First Play</div>
        <h2 className="max-w-3xl text-4xl font-black uppercase tracking-[0.08em] text-white md:text-6xl">
          Deal the portfolio like a winning hand.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
          Let the cards land, pick your focus, then enter the full experience when you are ready.
        </p>

        <div className="uno-status mt-6 text-white/75">
          <span className={`uno-status-pill ${phase !== "dealing" ? "is-live" : ""}`}>Cards dealt</span>
          <span className={`uno-status-pill ${phase === "ready" ? "is-live" : ""}`}>Tap to enter</span>
        </div>

        <div className={`uno-hand mt-12 md:mt-16 ${phase === "spotlight" || phase === "ready" ? "is-spotlight" : ""}`}>
          {cards.map((card, index) => {
            const centerIndex = (cards.length - 1) / 2;
            const offset = index - centerIndex;
            const lift = Math.abs(offset) * 0.25;
            const isActive = index === activeIndex;

            return (
              <button
                key={card.label}
                type="button"
                onClick={() => handleCardSelect(index)}
                className={`uno-card uno-card-${card.tone} ${isActive ? "is-active" : ""} ${phase === "ready" ? "is-ready" : ""}`}
                style={{
                  ["--card-index" as string]: index,
                  ["--card-count" as string]: cards.length,
                  ["--fan-offset" as string]: offset,
                  ["--fan-lift" as string]: `${lift}rem`,
                  ["--deal-delay" as string]: `${index * 130}ms`,
                  ["--deal-drop" as string]: `${8 - Math.abs(offset) * 1.15}rem`,
                  ["--deal-spin" as string]: `${offset * 5}deg`,
                }}
                aria-label={`Focus ${card.label} card`}
                aria-pressed={isActive}
              >
                <span className="uno-card-glow" aria-hidden="true" />
                <div className="uno-card-flip">
                  <div className={`uno-card-face uno-card-face-back uno-card-back-${card.tone}`}>
                    <span className="uno-card-back-mark">0</span>
                    <span className="uno-card-back-ring" />
                  </div>

                  <div className="uno-card-face uno-card-face-front uno-card-inner">
                    <span className="uno-card-corner">{index + 1}</span>
                    <div>
                      <p className="uno-card-detail">{card.detail}</p>
                      <h3 className="uno-card-title">{card.label}</h3>
                    </div>
                    <span className="uno-card-badge">{isActive ? "Focus" : "Pick"}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className={`uno-stage-panel mt-10 ${phase === "ready" ? "is-ready" : ""}`}>
          <div className="uno-stage-copy">
            <span className="uno-stage-kicker">Now showing</span>
            <h3 className="uno-stage-heading">{activeCard.label}</h3>
            <p className="uno-stage-text">
              {activeCard.detail} card primed. Tap the highlighted card or use the button below to open the full stack.
            </p>
          </div>

          <button
            type="button"
            onClick={handleEnter}
            disabled={phase !== "ready"}
            className="uno-stage-action"
          >
            <Sparkles className="h-4 w-4" />
            Launch Full Experience
          </button>
        </div>

        <button
          type="button"
          onClick={handleEnter}
          disabled={phase !== "ready"}
          className="uno-enter-button mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.28em] text-[#0b1020] md:mt-10"
        >
          {phase === "ready" ? "Open Portfolio" : "Shuffling Deck"}
          <ArrowRight className="h-4 w-4" />
        </button>

        {phase === "ready" && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
              Press Enter or tap to continue
            </p>
            <p className="text-[11px] leading-relaxed text-white/40 md:text-xs">
              Want to replay this first-launch splash later? Clear this site&apos;s cookies in your browser settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardRevealScreen;
