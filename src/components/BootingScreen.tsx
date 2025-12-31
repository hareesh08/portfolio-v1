import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Server, Database, Cloud, Cpu, Wifi, CheckCircle2, Zap } from "lucide-react";

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
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      setSteps(prev => prev.map((step, idx) => 
        idx === currentStep ? { ...step, status: "loading" } : step
      ));

      const timer = setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => 
          idx === currentStep ? { ...step, status: "complete" } : step
        ));
        setCurrentStep(prev => prev + 1);
      }, 200); // Slightly increased delay to prevent rapid state changes

      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      setShowWelcome(true);
      const timer = setTimeout(onComplete, 800); // Increased delay for smoother transition
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length, onComplete]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Glowing orbs - optimized with reduced complexity */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-primary/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-accent/10 blur-[80px]"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{ willChange: "transform" }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          {!showWelcome ? (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Main card */}
              <div className="rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-2xl shadow-[0_0_60px_-10px] shadow-primary/20 overflow-hidden">
                {/* Header with glow */}
                <div className="relative px-5 py-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{ 
                        boxShadow: [
                          "0 0 10px hsl(var(--primary))", 
                          "0 0 20px hsl(var(--primary))", 
                          "0 0 10px hsl(var(--primary))"
                        ] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ willChange: "box-shadow" }}
                    />
                    <span className="font-mono text-sm text-primary font-medium">portfolio.init</span>
                  </div>
                </div>

                {/* Steps */}
                <div className="p-5 space-y-3">
                  {steps.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: step.status !== "pending" ? 1 : 0.4,
                        x: 0 
                      }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${
                        step.status === "loading" 
                          ? "bg-primary/10 border border-primary/30" 
                          : step.status === "complete"
                          ? "bg-green-500/5"
                          : ""
                      }`}
                    >
                      <span className={`transition-colors ${step.status === "complete" ? "text-green-400" : step.status === "loading" ? "text-primary" : "text-muted-foreground"}`}>
                        {step.icon}
                      </span>
                      <span className={`font-medium text-sm flex-1 ${step.status === "complete" ? "text-green-400" : step.status === "loading" ? "text-primary" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                      <span className="w-5 flex justify-center">
                        {step.status === "loading" && (
                          <motion.div
                            className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{ willChange: "transform" }}
                          />
                        )}
                        {step.status === "complete" && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          </motion.div>
                        )}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress section */}
                <div className="px-5 pb-5">
                  <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-accent rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.15 }}
                    />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-white/50 to-accent rounded-full opacity-50 blur-sm"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-mono">
                    <span className="text-muted-foreground">Initializing...</span>
                    <span className="text-primary font-bold">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>

              {/* Decorative rings */}
              <motion.div
                className="absolute -top-10 -right-10 w-24 h-24 border-2 border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 mb-4 shadow-[0_0_40px_-5px] shadow-primary/40"
              >
                <Zap className="w-10 h-10 text-primary" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Ready!
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BootingScreen;
