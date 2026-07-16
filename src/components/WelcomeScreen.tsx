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
    <div className="fixed inset-0 z-[59] overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 18% 16%, rgba(255, 157, 157, 0.55), transparent 38%), radial-gradient(circle at 82% 24%, rgba(255, 197, 170, 0.5), transparent 40%), radial-gradient(circle at 70% 86%, rgba(187, 241, 210, 0.5), transparent 42%), radial-gradient(circle at 18% 80%, rgba(238, 248, 205, 0.55), transparent 40%), linear-gradient(135deg, #fff7f0 0%, #fff0f3 50%, #f1fae8 100%)",
      }}
    >
      <div className="absolute inset-0 page-grid opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/30 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="welcome-shell w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/55 p-6 text-center shadow-[0_30px_80px_rgba(255,157,157,0.25)] backdrop-blur-xl md:p-10">
          {step === "ask" && (
            <div className="space-y-7 animate-scale-in">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.28em]" style={{ color: "rgba(20, 20, 20, 0.55)" }}>{greeting}</p>
                <h2 className="text-3xl font-extralight tracking-[0.06em] md:text-5xl" style={{ color: "rgb(20, 20, 20)" }}>
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
                  className="mx-auto block w-full max-w-md border-b border-white/80 bg-transparent px-3 py-4 text-center text-xl font-extralight outline-none transition-colors duration-300 placeholder:text-black/40 focus:border-pink md:text-2xl"
                  style={{ color: "rgb(20, 20, 20)" }}
                />

                <p className="text-sm uppercase tracking-[0.24em]" style={{ color: "rgba(20, 20, 20, 0.5)" }}>Press Enter or continue below</p>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!trimmedName}
                  className={`inline-flex rounded-full px-8 py-3 text-sm uppercase tracking-[0.22em] transition-all duration-300 border ${
                    trimmedName ? "hover:scale-105" : "cursor-not-allowed opacity-50"
                  }`}
                  style={
                    trimmedName
                      ? {
                          background: "linear-gradient(135deg, #FF9D9D, #FFC5AA)",
                          color: "#1a0808",
                          borderColor: "rgba(255, 255, 255, 0.9)",
                          boxShadow: "0 8px 24px rgba(255, 157, 157, 0.45)",
                        }
                      : {
                          background: "rgba(255, 255, 255, 0.4)",
                          color: "rgba(20, 20, 20, 0.5)",
                          borderColor: "rgba(255, 255, 255, 0.7)",
                        }
                  }
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={onSkipToLanding}
                  className="inline-flex rounded-full border border-white/80 bg-white/55 backdrop-blur px-8 py-3 text-sm uppercase tracking-[0.22em] transition-colors duration-300 hover:bg-white/85"
                  style={{ color: "rgba(20, 20, 20, 0.8)" }}
                >
                  Skip To Landing
                </button>
              </div>
            </div>
          )}

          {step === "greet" && (
            <div className="space-y-6 animate-scale-in">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/90 bg-white/70 text-3xl font-light" style={{ color: "rgb(20, 20, 20)", boxShadow: "0 8px 24px rgba(255, 157, 157, 0.45)" }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.38em]" style={{ color: "rgba(20, 20, 20, 0.55)" }}>Welcome</p>
                <h2 className="text-4xl font-extralight tracking-[0.08em] md:text-6xl" style={{ color: "rgb(20, 20, 20)" }}>{displayName}</h2>
              </div>

              <div className="mx-auto max-w-lg space-y-3 text-base font-extralight leading-relaxed md:text-lg" style={{ color: "rgba(20, 20, 20, 0.7)" }}>
                {motivations.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>

              <button
                type="button"
                onClick={onSkipToLanding}
                className="mx-auto inline-flex rounded-full border border-white/80 bg-white/55 backdrop-blur px-7 py-3 text-sm uppercase tracking-[0.22em] transition-colors duration-300 hover:bg-white/85"
                style={{ color: "rgba(20, 20, 20, 0.8)" }}
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
