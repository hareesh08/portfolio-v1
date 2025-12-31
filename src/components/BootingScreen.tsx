import { useState, useEffect, useCallback } from "react";
import { Terminal, Server, Database, Cloud, Cpu, Wifi, CheckCircle2, Zap, Loader2 } from "lucide-react";

interface BootStep {
  id: number;
  icon: React.ReactNode;
  label: string;
  status: "pending" | "loading" | "complete";
}

const initialSteps: BootStep[] = [
  { id: 1, icon: <Terminal className="w-4 h-4" />, label: "System Init", status: "pending" },
  { id: 2, icon: <Server className="w-4 h-4" />, label: "Server Connect", status: "pending" },
  { id: 3, icon: <Database className="w-4 h-4" />, label: "Data Fetch", status: "pending" },
  { id: 4, icon: <Cloud className="w-4 h-4" />, label: "Cloud Sync", status: "pending" },
  { id: 5, icon: <Cpu className="w-4 h-4" />, label: "Render UI", status: "pending" },
  { id: 6, icon: <Wifi className="w-4 h-4" />, label: "Go Live", status: "pending" },
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

  // Step progression
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
      // All steps complete, show welcome
      setPhase("welcome");
    }
  }, [currentStep, steps.length, phase]);

  // Welcome to exit transition
  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setPhase("exiting");
      }, 600);
      return () => clearTimeout(timer);
    }
    
    if (phase === "exiting") {
      const timer = setTimeout(() => {
        handleComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [phase, handleComplete]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ease-out ${
        phase === "exiting" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ transitionProperty: "opacity, transform" }}
    >
      {/* Grid background with subtle glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-6">
        {phase === "loading" ? (
          <div className="relative animate-fade-in">
            {/* Main card */}
            <div className="rounded-2xl border border-primary/20 bg-card/95 shadow-xl shadow-primary/5 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-sm text-primary font-medium">portfolio.init</span>
                </div>
              </div>

              {/* Steps */}
              <div className="p-5 space-y-2">
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${
                      step.status === "loading" 
                        ? "bg-primary/10 translate-x-1" 
                        : step.status === "complete"
                        ? "bg-green-500/5"
                        : "opacity-40"
                    }`}
                    style={{ transitionDelay: `${idx * 20}ms` }}
                  >
                    <span className={`transition-colors duration-200 ${
                      step.status === "complete" ? "text-green-400" : 
                      step.status === "loading" ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {step.icon}
                    </span>
                    <span className={`font-medium text-sm flex-1 transition-colors duration-200 ${
                      step.status === "complete" ? "text-green-400" : 
                      step.status === "loading" ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                    <span className="w-5 flex justify-center">
                      {step.status === "loading" && (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      )}
                      {step.status === "complete" && (
                        <CheckCircle2 className="w-4 h-4 text-green-400 animate-scale-in" />
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="px-5 pb-5">
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono">
                  <span className="text-muted-foreground">Initializing...</span>
                  <span className="text-primary font-bold">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -top-8 -right-8 w-20 h-20 border border-primary/10 rounded-full" />
          </div>
        ) : (
          <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4 shadow-lg shadow-primary/10">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Ready!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootingScreen;
