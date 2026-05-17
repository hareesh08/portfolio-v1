import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

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

const CardRevealScreen = ({ onComplete }: CardRevealScreenProps) => {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3400);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[58] overflow-hidden bg-[#070b15]">
      <div className="absolute inset-0 uno-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_24%),linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center">
        <div className="uno-chip mb-4">Welcome Deck</div>
        <h2 className="max-w-3xl text-4xl font-black uppercase tracking-[0.08em] text-white md:text-6xl">
          The portfolio opens like a dealt hand.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
          A quick game-style reveal before the full stack of work lands on screen.
        </p>

        <div className="uno-hand mt-12 md:mt-16" aria-hidden="true">
          {cards.map((card, index) => {
            const centerIndex = (cards.length - 1) / 2;
            const offset = index - centerIndex;
            const lift = Math.abs(offset) * 0.25;

            return (
              <article
                key={card.label}
                className={`uno-card uno-card-${card.tone}`}
                style={{
                  ["--card-index" as string]: index,
                  ["--card-count" as string]: cards.length,
                  ["--fan-offset" as string]: offset,
                  ["--fan-lift" as string]: `${lift}rem`,
                }}
              >
                <div className="uno-card-inner">
                  <span className="uno-card-corner">{index + 1}</span>
                  <div>
                    <p className="uno-card-detail">{card.detail}</p>
                    <h3 className="uno-card-title">{card.label}</h3>
                  </div>
                  <span className="uno-card-badge">Play</span>
                </div>
              </article>
            );
          })}
        </div>

        <button
          onClick={onComplete}
          className="uno-enter-button mt-12 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.28em] text-[#0b1020] md:mt-16"
        >
          Open Portfolio
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CardRevealScreen;
