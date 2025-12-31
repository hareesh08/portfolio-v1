import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

const steps = [
  "Loading assets...",
  "Connecting services...",
  "Preparing experience...",
  "Almost there...",
];

interface BootingScreenProps {
  onComplete: () => void;
}

const BootingScreen = ({ onComplete }: BootingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome" | "exiting">("loading");

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "loading") return;
    
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setPhase("welcome");
    }
  }, [currentStep, phase]);

  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => setPhase("exiting"), 500);
      return () => clearTimeout(timer);
    }
    if (phase === "exiting") {
      const timer = setTimeout(handleComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, handleComplete]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f1a] transition-all duration-500 ${
        phase === "exiting" ? "opacity-0 scale-105" : "opacity-100"
      }`}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {phase === "loading" ? (
          <div className="text-center">
            {/* Logo */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-8">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            {/* Progress */}
            <div className="glass-card rounded-2xl p-6 mb-4">
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 transition-opacity duration-300 ${
                      idx <= currentStep ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {idx < currentStep ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : idx === currentStep ? (
                      <Loader2 className="w-5 h-5 text-pink-400 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/20" />
                    )}
                    <span className="text-sm text-white/70">{step}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6">
              <span className="text-3xl">✨</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootingScreen;
