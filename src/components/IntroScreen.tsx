import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const allMotivationalQuotes = [
  "Every expert was once a beginner.",
  "Your potential is limitless.",
  "Great things take time.",
  "Dream big. Start small.",
  "The best time to start is today.",
  "Believe in yourself.",
  "Progress, not perfection.",
  "Stay curious. Stay hungry.",
];

const getRandomQuotes = () => {
  const shuffled = [...allMotivationalQuotes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

const fallbackFacts = [
  "The first computer programmer was Ada Lovelace in 1843.",
  "The first 1GB hard drive weighed 550 pounds.",
  "The first website is still online at info.cern.ch.",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

type Phase = "askName" | "welcome" | "motivation" | "loading" | "facts" | "ready" | "exit";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("askName");
  const [fact, setFact] = useState("");
  const [textVisible, setTextVisible] = useState(false);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [motivationalQuotes] = useState(getRandomQuotes);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    if (phase === "askName" && inputRef.current) inputRef.current.focus();
  }, [phase]);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (res.ok) {
          const data = await res.json();
          if (data.text && data.text.length < 150) {
            setFact(data.text);
            return;
          }
        }
        setFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      } catch {
        setFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      }
    };
    fetchFact();
  }, []);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setPhase("welcome");
      setTextVisible(true);
    }
  };

  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("motivation"); setTextVisible(true); }, 400);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (phase === "motivation") {
      const timer = setTimeout(() => {
        if (motivationIndex < motivationalQuotes.length - 1) {
          setTextVisible(false);
          setTimeout(() => { setMotivationIndex(prev => prev + 1); setTextVisible(true); }, 300);
        } else {
          setTextVisible(false);
          setTimeout(() => setPhase("loading"), 400);
        }
      }, 1800);
      return () => clearTimeout(timer);
    }
    if (phase === "loading") {
      const timer = setTimeout(() => { setPhase("facts"); setTextVisible(true); }, 600);
      return () => clearTimeout(timer);
    }
    if (phase === "facts") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("ready"); setTextVisible(true); }, 400);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 800);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, motivationIndex, motivationalQuotes.length, handleComplete]);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0f0f1a] transition-all duration-700 ${
      phase === "exit" ? "opacity-0 scale-105" : "opacity-100"
    }`}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto text-center">
        
        {/* Ask Name */}
        {phase === "askName" && (
          <div className="animate-fade-in space-y-8">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white text-2xl md:text-4xl font-light">{getGreeting()}! 👋</h2>
            <p className="text-white/50">What should I call you?</p>
            
            <input
              ref={inputRef}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
              placeholder="Your name"
              className="w-64 md:w-80 px-6 py-4 glass rounded-2xl text-white text-center text-xl outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-white/30"
            />
            
            <button
              onClick={handleNameSubmit}
              disabled={!userName.trim()}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-medium transition-all ${
                userName.trim() 
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:shadow-pink-500/25" 
                  : "glass text-white/30 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Welcome */}
        {phase === "welcome" && (
          <div className={`transition-all duration-500 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-white text-3xl md:text-5xl font-light mb-4">
              Hey, <span className="text-gradient font-medium">{userName}</span>! ✨
            </h1>
            <p className="text-white/50 text-lg">Welcome to my portfolio</p>
          </div>
        )}

        {/* Motivation */}
        {phase === "motivation" && (
          <div className={`transition-all duration-400 ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <p className="text-white/70 text-xl md:text-2xl font-light italic">
              "{motivationalQuotes[motivationIndex]}"
            </p>
          </div>
        )}

        {/* Loading */}
        {phase === "loading" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Facts */}
        {phase === "facts" && fact && (
          <div className={`transition-all duration-500 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-pink-400 text-sm uppercase tracking-wider mb-4">Did you know?</p>
            <p className="text-white/70 text-lg leading-relaxed">{fact}</p>
          </div>
        )}

        {/* Ready */}
        {phase === "ready" && (
          <div className={`transition-all duration-500 ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="text-5xl mb-6">🚀</div>
            <h1 className="text-white text-2xl md:text-4xl font-light">
              Let's explore, <span className="text-gradient">{userName}</span>!
            </h1>
          </div>
        )}
      </div>

      {/* Skip */}
      {phase !== "askName" && phase !== "exit" && (
        <button
          onClick={() => { setPhase("exit"); setTimeout(handleComplete, 600); }}
          className="absolute bottom-8 right-8 text-white/30 hover:text-white/60 text-sm transition-colors"
        >
          Skip →
        </button>
      )}
    </div>
  );
};

export default IntroScreen;
