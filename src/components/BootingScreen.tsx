import { useState, useEffect, useCallback } from "react";
import { Terminal, Server, Database, Cloud, Cpu, Wifi, CheckCircle2, Loader2 } from "lucide-react";

interface BootStep {
  id: number;
  icon: React.ReactNode;
  label: string;
  status: "pending" | "loading" | "complete";
}

const initialSteps: BootStep[] = [
  { id: 1, icon: <Terminal className="w-4 h-4" />, label: "Loading IDE modules...", status: "pending" },
  { id: 2, icon: <Server className="w-4 h-4" />, label: "Connecting to workspace...", status: "pending" },
  { id: 3, icon: <Database className="w-4 h-4" />, label: "Indexing project files...", status: "pending" },
  { id: 4, icon: <Cloud className="w-4 h-4" />, label: "Syncing configurations...", status: "pending" },
  { id: 5, icon: <Cpu className="w-4 h-4" />, label: "Building project...", status: "pending" },
  { id: 6, icon: <Wifi className="w-4 h-4" />, label: "Starting dev server...", status: "pending" },
];

interface BootingScreenProps {
  onComplete: () => void;
}

const BootingScreen = ({ onComplete }: BootingScreenProps) => {
  const [steps, setSteps] = useState<BootStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome" | "exiting">("loading");

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "loading") return;
    
    if (currentStep < steps.length) {
      setSteps(prev => prev.map((step, idx) => 
        idx === currentStep ? { ...step, status: "loading" } : step
      ));

      const timer = setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => 
          idx === currentStep ? { ...step, status: "complete" } : step
        ));
        setCurrentStep(prev => prev + 1);
      }, 120);

      return () => clearTimeout(timer);
    } else {
      setPhase("welcome");
    }
  }, [currentStep, steps.length, phase]);

  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => setPhase("exiting"), 500);
      return () => clearTimeout(timer);
    }
    
    if (phase === "exiting") {
      const timer = setTimeout(handleComplete, 300);
      return () => clearTimeout(timer);
    }
  }, [phase, handleComplete]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1e1e2e] transition-all duration-300 ${
        phase === "exiting" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="relative z-10 w-full max-w-lg px-6">
        {phase === "loading" ? (
          <div className="animate-fade-in">
            {/* IDE-style window */}
            <div className="rounded-lg border border-[#3c3f41] bg-[#2b2b2b] shadow-2xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[#3c3f41] border-b border-[#323232]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="ml-4 text-sm text-[#a9b7c6] font-mono">JetBrains IDE - Starting...</span>
              </div>

              {/* Content */}
              <div className="p-4 font-mono text-sm">
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 py-2 px-3 rounded transition-all duration-200 ${
                      step.status === "loading" 
                        ? "bg-[#214283]/30" 
                        : step.status === "complete"
                        ? "bg-[#6a8759]/10"
                        : "opacity-40"
                    }`}
                  >
                    <span className={`transition-colors ${
                      step.status === "complete" ? "text-[#6a8759]" : 
                      step.status === "loading" ? "text-[#6897bb]" : "text-[#606060]"
                    }`}>
                      {step.icon}
                    </span>
                    <span className={`flex-1 ${
                      step.status === "complete" ? "text-[#6a8759]" : 
                      step.status === "loading" ? "text-[#a9b7c6]" : "text-[#606060]"
                    }`}>
                      {step.label}
                    </span>
                    <span className="w-5 flex justify-center">
                      {step.status === "loading" && (
                        <Loader2 className="w-4 h-4 text-[#6897bb] animate-spin" />
                      )}
                      {step.status === "complete" && (
                        <CheckCircle2 className="w-4 h-4 text-[#6a8759]" />
                      )}
                    </span>
                  </div>
                ))}

                {/* Progress bar */}
                <div className="mt-4 pt-4 border-t border-[#323232]">
                  <div className="h-1 bg-[#3c3f41] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-[#606060]">Initializing workspace...</span>
                    <span className="text-[#6897bb]">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4">
              <Terminal className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#a9b7c6]">
              Ready to code!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootingScreen;
