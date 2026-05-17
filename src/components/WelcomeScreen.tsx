import { useEffect, useMemo, useRef, useState } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
  onSkipToLanding?: () => void;
}

const motivations = [
  "Sharp products deserve sharp storytelling.",
  "Good engineering should feel effortless to the user.",
  "Every section will reveal itself in sequence.",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const WelcomeScreen = ({ onComplete, onSkipToLanding }: WelcomeScreenProps) => {
  const [name, setName] = useState("");
  const [step, setStep] = useState<"ask" | "greet">("ask");
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmedName = name.trim();
  const displayName = trimmedName || "Guest";
  const greeting = useMemo(() => getGreeting(), []);

  useEffect(() => {
    if (step !== "ask") return;
    window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [step]);

  useEffect(() => {
    if (step !== "greet") return;

    const timer = window.setTimeout(() => onComplete(), 1800);
    return () => window.clearTimeout(timer);
  }, [onComplete, step]);

  const handleContinue = () => {
    if (!trimmedName) return;
    setStep("greet");
  };

  return (
    <div className="fixed inset-0 z-[59] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_22%),linear-gradient(180deg,#060912_0%,#020305_100%)]" />
      <div className="absolute inset-0 page-grid opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="welcome-shell w-full max-w-2xl rounded-[2rem] border border-white/12 bg-white/[0.05] p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10">
          {step === "ask" && (
            <div className="space-y-7 animate-scale-in">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.28em] text-white/45">{greeting}</p>
                <h2 className="text-3xl font-extralight tracking-[0.06em] text-white md:text-5xl">
                  Let me personalize the experience.
                </h2>
              </div>

              <div className="space-y-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleContinue()}
                  placeholder="What should I call you?"
                  className="mx-auto block w-full max-w-md border-b border-white/25 bg-transparent px-3 py-4 text-center text-xl font-extralight text-white outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-white/60 md:text-2xl"
                />

                <p className="text-sm uppercase tracking-[0.24em] text-white/38">Press Enter or continue below</p>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!trimmedName}
                  className={`inline-flex rounded-full px-8 py-3 text-sm uppercase tracking-[0.22em] transition-all duration-300 ${
                    trimmedName ? "bg-white text-black hover:bg-white/90" : "cursor-not-allowed bg-white/10 text-white/30"
                  }`}
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={onSkipToLanding}
                  className="inline-flex rounded-full border border-white/12 bg-white/[0.03] px-8 py-3 text-sm uppercase tracking-[0.22em] text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white"
                >
                  Skip To Landing
                </button>
              </div>
            </div>
          )}

          {step === "greet" && (
            <div className="space-y-6 animate-scale-in">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/18 bg-white/10 text-3xl font-light text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.38em] text-white/45">Welcome</p>
                <h2 className="text-4xl font-extralight tracking-[0.08em] text-white md:text-6xl">{displayName}</h2>
              </div>

              <div className="mx-auto max-w-lg space-y-3 text-base font-extralight leading-relaxed text-white/65 md:text-lg">
                {motivations.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>

              <button
                type="button"
                onClick={onSkipToLanding}
                className="mx-auto inline-flex rounded-full border border-white/12 bg-white/[0.03] px-7 py-3 text-sm uppercase tracking-[0.22em] text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white"
              >
                Skip To Landing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
