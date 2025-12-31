import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

// Fallback facts in case API fails
const fallbackFacts = [
  "The first computer programmer was Ada Lovelace in 1843.",
  "The first 1GB hard drive weighed 550 pounds.",
  "The first website is still online at info.cern.ch.",
];

// Motivational quotes - expanded collection
const allMotivationalQuotes = [
  "Every expert was once a beginner.",
  "Your potential is limitless.",
  "Great things take time. Keep going.",
  "Dream big. Start small. Act now.",
  "Success is built one step at a time.",
  "The best time to start is today.",
  "Believe in yourself and create magic.",
  "Your only limit is your mind.",
  "Turn your obstacles into opportunities.",
  "Progress, not perfection.",
  "Stay curious. Stay hungry.",
  "Make today count.",
];

// Get 3 random quotes
const getRandomQuotes = () => {
  const shuffled = [...allMotivationalQuotes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

interface IntroScreenProps {
  onComplete: () => void;
}

// Get current IST time
const getISTTime = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + (istOffset + now.getTimezoneOffset() * 60 * 1000));
  return istTime.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

const getGreeting = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + (istOffset + now.getTimezoneOffset() * 60 * 1000));
  const hour = istTime.getHours();
  
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

type Phase = "askName" | "welcome" | "motivation" | "loading" | "facts" | "ready" | "exit";

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("askName");
  const [fact, setFact] = useState("");
  const [currentTime, setCurrentTime] = useState(getISTTime());
  const [textVisible, setTextVisible] = useState(false);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [motivationalQuotes] = useState(getRandomQuotes);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Focus input on mount
  useEffect(() => {
    if (phase === "askName" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getISTTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch single fact
  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (response.ok) {
          const data = await response.json();
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

  // Handle name submission
  const handleNameSubmit = () => {
    if (userName.trim()) {
      setPhase("welcome");
      setTextVisible(true);
    }
  };

  // Phase transitions
  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => {
          setPhase("motivation");
          setTextVisible(true);
        }, 500);
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (phase === "motivation") {
      const timer = setTimeout(() => {
        if (motivationIndex < motivationalQuotes.length - 1) {
          setTextVisible(false);
          setTimeout(() => {
            setMotivationIndex(prev => prev + 1);
            setTextVisible(true);
          }, 400);
        } else {
          setTextVisible(false);
          setTimeout(() => {
            setPhase("loading");
          }, 500);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === "loading") {
      const timer = setTimeout(() => {
        setPhase("facts");
        setTextVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === "facts") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => {
          setPhase("ready");
          setTextVisible(true);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, motivationIndex, motivationalQuotes.length, handleComplete]);



  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black transition-all duration-1000 ease-out ${
        phase === "exit" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full" />
      </div>

      {/* Time display */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white/60 text-3xl md:text-4xl font-extralight tracking-wider font-mono">
          {currentTime}
        </p>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">IST</p>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-16 max-w-3xl mx-auto text-center min-h-[300px]">
        
        {/* Ask Name Phase */}
        {phase === "askName" && (
          <div className="animate-fade-in space-y-8">
            <div className="space-y-2">
              <Sparkles className="w-8 h-8 text-white/40 mx-auto mb-4" />
              <h2 className="text-white/90 text-2xl md:text-4xl font-extralight tracking-wide">
                {getGreeting()}!
              </h2>
              <p className="text-white/50 text-base md:text-lg font-light">
                What should I call you?
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <input
                ref={inputRef}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Enter your name..."
                className="w-64 md:w-80 bg-transparent border-b-2 border-white/20 focus:border-white/50 text-white text-center text-xl md:text-2xl font-light py-3 outline-none transition-all duration-300 placeholder:text-white/20"
                autoComplete="off"
              />
              
              <button
                onClick={handleNameSubmit}
                disabled={!userName.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                  userName.trim() 
                    ? "bg-white/10 text-white/80 hover:bg-white/20 hover:scale-105" 
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Welcome Phase */}
        {phase === "welcome" && (
          <div className={`transition-all duration-700 ease-out ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">Welcome</p>
            <h1 className="text-white text-4xl md:text-6xl font-extralight tracking-wide mb-4">
              Hello, <span className="text-white/90">{userName}</span>
            </h1>
            <p className="text-white/50 text-lg font-light">
              It's wonderful to have you here ✨
            </p>
          </div>
        )}

        {/* Motivation Phase */}
        {phase === "motivation" && (
          <div className={`transition-all duration-500 ease-out ${
            textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
          }`}>
            <p className="text-white/70 text-xl md:text-3xl font-extralight leading-relaxed tracking-wide italic">
              "{motivationalQuotes[motivationIndex]}"
            </p>
          </div>
        )}

        {/* Loading Phase */}
        {phase === "loading" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-white/30 text-sm tracking-wider">Preparing something special...</p>
          </div>
        )}

        {/* Facts Phase */}
        {phase === "facts" && fact && (
          <div className="space-y-6">
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Did you know?</p>
            
            <div className={`transition-all duration-500 ease-out max-w-2xl ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                {fact}
              </p>
            </div>
          </div>
        )}

        {/* Ready Phase */}
        {phase === "ready" && (
          <div className={`transition-all duration-700 ease-out ${
            textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}>
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-6">Ready to explore</p>
            <h1 className="text-white text-3xl md:text-5xl font-extralight tracking-wide mb-3">
              {userName}'s Journey Begins
            </h1>
            <p className="text-white/50 text-lg font-light">
              Welcome to the portfolio of <span className="text-white/80">Hareesh Ragavendra</span>
            </p>
          </div>
        )}
      </div>

      {/* Skip button */}
      {phase !== "askName" && phase !== "exit" && (
        <button
          onClick={() => {
            setPhase("exit");
            setTimeout(handleComplete, 800);
          }}
          className="absolute bottom-8 right-8 text-white/20 hover:text-white/40 text-xs tracking-[0.2em] uppercase transition-all duration-300"
        >
          Skip
        </button>
      )}
    </div>
  );
};

export default IntroScreen;
